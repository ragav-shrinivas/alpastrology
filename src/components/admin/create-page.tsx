"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPage } from "@/app/admin/actions";
import { slugify } from "@/lib/utils";

export function CreatePage() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function submit() {
    if (!title.trim()) return toast.error("Enter a title");
    startTransition(async () => {
      const res = await createPage(slug || slugify(title), title.trim());
      if (res.ok) {
        toast.success("Page created");
        setOpen(false);
        setTitle("");
        setSlug("");
        router.refresh();
      } else {
        toast.error(res.error ?? "Could not create page");
      }
    });
  }

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)}>
        <Plus className="size-4" /> New Page
      </Button>
    );
  }

  return (
    <div className="border-border bg-surface w-full max-w-md rounded-2xl border p-5">
      <h3 className="font-semibold">Create Page</h3>
      <div className="mt-4 space-y-3">
        <div>
          <Label htmlFor="np-title">Title</Label>
          <Input
            id="np-title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSlug(slugify(e.target.value));
            }}
            placeholder="Page title"
          />
        </div>
        <div>
          <Label htmlFor="np-slug">Slug</Label>
          <Input
            id="np-slug"
            value={slug}
            onChange={(e) => setSlug(slugify(e.target.value))}
            placeholder="page-slug"
          />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Button onClick={submit} disabled={pending} size="sm">
          {pending ? "Creating…" : "Create"}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
