"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_EMAIL = "fcams100@gmail.com";

export async function signIn(_prev: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirect") ?? "/admin");

  if (email.toLowerCase() !== ALLOWED_EMAIL) {
    return { error: "Invalid credentials." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Invalid credentials." };
  }

  redirect(redirectTo);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
