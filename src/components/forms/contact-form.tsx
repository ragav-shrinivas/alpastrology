"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { submitContact } from "@/app/(site)/contact/actions";
import { whatsappLink } from "@/lib/utils";
import { BUSINESS_WHATSAPP } from "@/lib/constants";

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  function onSubmit(values: ContactInput) {
    // Open WhatsApp immediately while still inside the click gesture so the
    // browser doesn't block the new tab as a pop-up.
    const message = [
      "Hello ALP Astrology, I'd like to get in touch.",
      "",
      `Name: ${values.name}`,
      values.email ? `Email: ${values.email}` : null,
      values.phone ? `Phone: ${values.phone}` : null,
      values.subject ? `Subject: ${values.subject}` : null,
      "",
      values.message,
    ]
      .filter((l) => l !== null)
      .join("\n");
    // Save a backup copy to the admin inbox (non-blocking — never lose a lead).
    startTransition(async () => {
      await submitContact(values).catch(() => {});
    });

    // react-hook-form validates async, so we're past the original click
    // gesture and a new tab may be pop-up blocked — fall back to same-tab.
    const url = whatsappLink(BUSINESS_WHATSAPP, message);
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) {
      window.location.assign(url);
      return;
    }
    toast.success("Opening WhatsApp to send your message…");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your name" {...register("name")} />
          {errors.name && (
            <p className="text-secondary-500 mt-1 text-xs">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@email.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-secondary-500 mt-1 text-xs">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="Phone number" {...register("phone")} />
        </div>
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            placeholder="How can we help?"
            {...register("subject")}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Tell us a little about what you're looking for…"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-secondary-500 mt-1 text-xs">
            {errors.message.message}
          </p>
        )}
      </div>
      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        <Send className="size-4" />
        {pending ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
