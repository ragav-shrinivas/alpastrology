"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";

/**
 * Unsigned Cloudinary upload. Configure NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and
 * NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET (an unsigned preset) to enable.
 * Falls back to a hint when not configured — admins can still paste URLs.
 */
export function CloudinaryUpload({
  onUploaded,
  resourceType = "image",
}: {
  onUploaded: (url: string, publicId?: string) => void;
  resourceType?: "image" | "video" | "raw";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  async function handleFile(file: File) {
    if (!cloud || !preset) {
      toast.error("Cloudinary is not configured yet. Paste a URL instead.");
      return;
    }
    setBusy(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", preset);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud}/${resourceType}/upload`,
        { method: "POST", body: form },
      );
      const data = await res.json();
      if (data.secure_url) {
        onUploaded(data.secure_url, data.public_id);
        toast.success("Uploaded");
      } else {
        toast.error(data.error?.message ?? "Upload failed");
      }
    } catch {
      toast.error("Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={
          resourceType === "image"
            ? "image/*"
            : resourceType === "video"
              ? "video/*"
              : undefined
        }
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="border-border text-muted hover:border-primary/60 hover:text-primary flex w-full items-center justify-center gap-2 rounded-xl border border-dashed py-3 text-sm transition-colors disabled:opacity-50"
      >
        <UploadCloud className="size-4" />
        {busy ? "Uploading…" : "Upload via Cloudinary"}
      </button>
    </div>
  );
}
