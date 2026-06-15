"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Database, Json } from "@/types/database";

type TableName = keyof Database["public"]["Tables"];

// Dynamic table names collapse Supabase's typed client to `never`; this helper
// returns a permissive query builder for the generic CRUD operations.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyBuilder = any;

async function staffClient() {
  return createClient();
}

function revalidateAll() {
  // Public pages read with a short revalidate; refresh them after edits.
  revalidatePath("/", "layout");
}

/* ------------------------------------------------------------------ */
/* Settings                                                           */
/* ------------------------------------------------------------------ */
export async function saveSettings(updates: Record<string, Json>) {
  const supabase = await staffClient();
  const rows = Object.entries(updates).map(([key, value]) => ({ key, value }));
  // Update each setting's value (keys already exist from seed).
  for (const row of rows) {
    const { error } = await supabase
      .from("settings")
      .update({ value: row.value })
      .eq("key", row.key);
    if (error) return { ok: false, error: error.message };
  }
  revalidateAll();
  return { ok: true };
}

/* ------------------------------------------------------------------ */
/* Generic record CRUD                                                */
/* ------------------------------------------------------------------ */
export async function upsertRecord(
  table: TableName,
  values: Record<string, unknown>,
) {
  const supabase = await staffClient();
  const from: AnyBuilder = supabase.from(table);
  const { error } = await from.upsert(values, { onConflict: "id" });
  if (error) return { ok: false, error: error.message };
  revalidateAll();
  return { ok: true };
}

export async function deleteRecord(table: TableName, id: string) {
  const supabase = await staffClient();
  const from: AnyBuilder = supabase.from(table);
  const { error } = await from.delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidateAll();
  return { ok: true };
}

export async function reorderRecords(table: TableName, orderedIds: string[]) {
  const supabase = await staffClient();
  for (let i = 0; i < orderedIds.length; i++) {
    const from: AnyBuilder = supabase.from(table);
    await from.update({ position: i }).eq("id", orderedIds[i]);
  }
  revalidateAll();
  return { ok: true };
}

/* ------------------------------------------------------------------ */
/* Page builder                                                       */
/* ------------------------------------------------------------------ */
export async function addSection(pageId: string, type: string, name: string) {
  const supabase = await staffClient();
  const { count } = await supabase
    .from("sections")
    .select("*", { count: "exact", head: true })
    .eq("page_id", pageId);
  const { error } = await supabase.from("sections").insert({
    page_id: pageId,
    type,
    name,
    position: count ?? 0,
    content: {},
  });
  if (error) return { ok: false, error: error.message };
  revalidateAll();
  return { ok: true };
}

export async function updateSection(
  id: string,
  patch: { content?: Json; styles?: Json; name?: string; is_visible?: boolean },
) {
  const supabase = await staffClient();
  const { error } = await supabase.from("sections").update(patch).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidateAll();
  return { ok: true };
}

/** Set a nested path (e.g. "title", "paragraphs.0", "buttons.1.label") inside
 *  a section's JSON content. Used by the inline visual editor. */
/* eslint-disable @typescript-eslint/no-explicit-any */
function setPath(obj: any, path: string[], value: unknown) {
  let cur: any = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    const idx: any = /^\d+$/.test(key) ? Number(key) : key;
    let nextNode: any = cur[idx];
    if (nextNode === undefined || nextNode === null || typeof nextNode !== "object") {
      nextNode = /^\d+$/.test(path[i + 1]) ? [] : {};
      cur[idx] = nextNode;
    }
    cur = nextNode;
  }
  const last = path[path.length - 1];
  cur[/^\d+$/.test(last) ? Number(last) : last] = value;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function saveSectionField(id: string, path: string, value: Json) {
  const supabase = await staffClient();
  const { data: sec } = await supabase
    .from("sections")
    .select("content")
    .eq("id", id)
    .maybeSingle();
  if (!sec) return { ok: false, error: "Section not found" };
  const content = (
    sec.content && typeof sec.content === "object" && !Array.isArray(sec.content)
      ? { ...(sec.content as Record<string, unknown>) }
      : {}
  ) as Record<string, unknown>;
  setPath(content, path.split("."), value);
  const { error } = await supabase
    .from("sections")
    .update({ content: content as Json })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidateAll();
  return { ok: true };
}

/** Record an uploaded asset in the media library table. */
export async function recordMedia(input: {
  url: string;
  folder?: string;
  title?: string;
  type?: "image" | "video";
}) {
  const supabase = await staffClient();
  const { error } = await supabase.from("media").insert({
    url: input.url,
    folder: input.folder ?? "General Assets",
    title: input.title ?? null,
    type: input.type ?? "image",
  });
  if (error) return { ok: false, error: error.message };
  revalidateAll();
  return { ok: true };
}

/** Save an image URL to a global setting (e.g. branding.logo). */
export async function saveSettingValue(key: string, value: Json) {
  const supabase = await staffClient();
  const { error } = await supabase
    .from("settings")
    .update({ value })
    .eq("key", key);
  if (error) return { ok: false, error: error.message };
  revalidateAll();
  return { ok: true };
}

/** Update a single column on a collection row (courses, faq, testimonials, …). */
export async function saveCollectionField(
  table: TableName,
  id: string,
  column: string,
  value: unknown,
) {
  const supabase = await staffClient();
  const from: AnyBuilder = supabase.from(table);
  const { error } = await from.update({ [column]: value }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidateAll();
  return { ok: true };
}

export async function duplicateSection(id: string) {
  const supabase = await staffClient();
  const { data: original } = await supabase
    .from("sections")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!original) return { ok: false, error: "Section not found" };

  const { error } = await supabase.from("sections").insert({
    page_id: original.page_id,
    type: original.type,
    name: `${original.name ?? original.type} (copy)`,
    position: original.position + 1,
    content: original.content,
    styles: original.styles,
    is_visible: original.is_visible,
  });
  if (error) return { ok: false, error: error.message };
  revalidateAll();
  return { ok: true };
}

export async function deleteSection(id: string) {
  const supabase = await staffClient();
  const { error } = await supabase.from("sections").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidateAll();
  return { ok: true };
}

export async function reorderSections(orderedIds: string[]) {
  const supabase = await staffClient();
  for (let i = 0; i < orderedIds.length; i++) {
    await supabase
      .from("sections")
      .update({ position: i })
      .eq("id", orderedIds[i]);
  }
  revalidateAll();
  return { ok: true };
}

/* ------------------------------------------------------------------ */
/* Pages                                                              */
/* ------------------------------------------------------------------ */
export async function createPage(slug: string, title: string) {
  const supabase = await staffClient();
  const { error } = await supabase
    .from("pages")
    .insert({ slug, title, status: "draft" });
  if (error) return { ok: false, error: error.message };
  revalidateAll();
  return { ok: true };
}

export async function updatePage(
  id: string,
  patch: Database["public"]["Tables"]["pages"]["Update"],
) {
  const supabase = await staffClient();
  const { error } = await supabase.from("pages").update(patch).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidateAll();
  return { ok: true };
}

export async function setContactStatus(
  id: string,
  status: Database["public"]["Enums"]["contact_status"],
) {
  const supabase = await staffClient();
  const { error } = await supabase
    .from("contacts")
    .update({ status })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/contacts");
  return { ok: true };
}
