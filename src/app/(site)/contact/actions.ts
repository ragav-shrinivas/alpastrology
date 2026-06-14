"use server";

import { createClient } from "@/lib/supabase/server";
import { contactSchema, type ContactInput } from "@/lib/validations";

export async function submitContact(input: ContactInput) {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
  }

  const supabase = await createClient();
  const { name, email, phone, subject, message } = parsed.data;

  const { error } = await supabase.from("contacts").insert({
    name,
    email: email || null,
    phone: phone || null,
    subject: subject || null,
    message,
  });

  if (error) {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
  return { ok: true };
}
