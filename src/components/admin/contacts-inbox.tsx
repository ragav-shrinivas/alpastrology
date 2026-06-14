"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Mail, Phone, Trash2, Check, MailOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { setContactStatus, deleteRecord } from "@/app/admin/actions";
import type { Contact } from "@/types/database";

export function ContactsInbox({ contacts }: { contacts: Contact[] }) {
  const [items, setItems] = useState(contacts);
  const [, startTransition] = useTransition();

  function update(id: string, status: Contact["status"]) {
    startTransition(async () => {
      const res = await setContactStatus(id, status);
      if (res.ok) {
        setItems((p) => p.map((c) => (c.id === id ? { ...c, status } : c)));
      } else toast.error(res.error ?? "Failed");
    });
  }

  function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    startTransition(async () => {
      const res = await deleteRecord("contacts", id);
      if (res.ok) {
        setItems((p) => p.filter((c) => c.id !== id));
        toast.success("Deleted");
      } else toast.error(res.error ?? "Failed");
    });
  }

  if (!items.length) {
    return (
      <p className="text-muted border-border rounded-xl border border-dashed p-10 text-center text-sm">
        No messages yet.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((c) => (
        <div
          key={c.id}
          className="border-border bg-surface rounded-xl border p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <p className="font-medium">{c.name}</p>
              <Badge
                variant={
                  c.status === "new"
                    ? "accent"
                    : c.status === "replied"
                      ? "default"
                      : "muted"
                }
              >
                {c.status}
              </Badge>
            </div>
            <p className="text-muted text-xs">{formatDate(c.created_at)}</p>
          </div>

          <div className="text-muted mt-2 flex flex-wrap gap-4 text-sm">
            {c.email && (
              <a href={`mailto:${c.email}`} className="flex items-center gap-1">
                <Mail className="size-3.5" /> {c.email}
              </a>
            )}
            {c.phone && (
              <a href={`tel:${c.phone}`} className="flex items-center gap-1">
                <Phone className="size-3.5" /> {c.phone}
              </a>
            )}
          </div>

          {c.subject && <p className="mt-3 text-sm font-medium">{c.subject}</p>}
          <p className="text-muted mt-1 text-sm leading-relaxed">{c.message}</p>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => update(c.id, "read")}
              className="border-border text-muted hover:text-white flex items-center gap-1 rounded-lg border px-3 py-1 text-xs"
            >
              <MailOpen className="size-3.5" /> Mark read
            </button>
            <button
              onClick={() => update(c.id, "replied")}
              className="border-border text-muted hover:text-primary flex items-center gap-1 rounded-lg border px-3 py-1 text-xs"
            >
              <Check className="size-3.5" /> Mark replied
            </button>
            <button
              onClick={() => remove(c.id)}
              className="border-border text-muted hover:text-secondary-500 ml-auto flex items-center gap-1 rounded-lg border px-3 py-1 text-xs"
            >
              <Trash2 className="size-3.5" /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
