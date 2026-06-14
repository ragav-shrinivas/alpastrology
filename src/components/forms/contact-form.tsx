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

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  function onSubmit(values: ContactInput) {
    startTransition(async () => {
      const res = await submitContact(values);
      if (res.ok) {
        toast.success("Message sent! We'll be in touch soon.");
        reset();
      } else {
        toast.error(res.error ?? "Something went wrong.");
      }
    });
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
