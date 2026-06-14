"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { saveSettings } from "@/app/admin/actions";
import type { Json, Setting } from "@/types/database";

const GROUP_LABELS: Record<string, string> = {
  general: "General",
  seo: "SEO & Meta",
  branding: "Branding",
  navigation: "Navigation",
  footer: "Footer",
  contact: "Contact Information",
  social: "Social Links",
};

function toEditable(value: Json, type: string): string {
  if (type === "json") return JSON.stringify(value, null, 2);
  if (typeof value === "string") return value;
  return value == null ? "" : String(value);
}

export function SettingsForm({ settings }: { settings: Setting[] }) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      settings.map((s) => [s.key, toEditable(s.value, s.type)]),
    ),
  );
  const [pending, startTransition] = useTransition();

  const groups = useMemo(() => {
    const map = new Map<string, Setting[]>();
    for (const s of settings) {
      const g = s.group || "general";
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(s);
    }
    return Array.from(map.entries());
  }, [settings]);

  function set(key: string, v: string) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  function onSave() {
    const updates: Record<string, Json> = {};
    try {
      for (const s of settings) {
        const raw = values[s.key] ?? "";
        updates[s.key] = s.type === "json" ? JSON.parse(raw || "null") : raw;
      }
    } catch {
      toast.error("One of the JSON fields is invalid. Please fix it.");
      return;
    }

    startTransition(async () => {
      const res = await saveSettings(updates);
      if (res.ok) toast.success("Settings saved.");
      else toast.error(res.error ?? "Could not save settings.");
    });
  }

  return (
    <div className="space-y-8">
      {groups.map(([group, items]) => (
        <section
          key={group}
          className="border-border bg-surface rounded-2xl border p-6"
        >
          <h2 className="mb-5 text-lg font-semibold">
            {GROUP_LABELS[group] ?? group}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {items.map((s) => {
              const fullWidth =
                s.type === "json" || s.type === "textarea";
              return (
                <div
                  key={s.key}
                  className={fullWidth ? "sm:col-span-2" : undefined}
                >
                  <Label htmlFor={s.key}>{s.label ?? s.key}</Label>
                  {s.type === "json" || s.type === "textarea" ? (
                    <Textarea
                      id={s.key}
                      rows={s.type === "json" ? 8 : 3}
                      className={s.type === "json" ? "font-mono text-xs" : ""}
                      value={values[s.key] ?? ""}
                      onChange={(e) => set(s.key, e.target.value)}
                    />
                  ) : (
                    <Input
                      id={s.key}
                      value={values[s.key] ?? ""}
                      onChange={(e) => set(s.key, e.target.value)}
                    />
                  )}
                  <p className="text-muted/60 mt-1 text-xs">{s.key}</p>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <div className="sticky bottom-4 flex justify-end">
        <Button onClick={onSave} disabled={pending} size="lg">
          <Save className="size-4" />
          {pending ? "Saving…" : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
