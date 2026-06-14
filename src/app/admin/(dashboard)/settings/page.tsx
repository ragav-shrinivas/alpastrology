import { createClient } from "@/lib/supabase/server";
import { SettingsForm } from "@/components/admin/settings-form";
import type { Setting } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("settings")
    .select("*")
    .order("group")
    .order("key");

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Site Settings</h1>
      <p className="text-muted mt-1">
        Edit global content — branding, navigation, footer, contact details and
        social links. Everything here drives the live website.
      </p>
      <div className="mt-8">
        <SettingsForm settings={(data ?? []) as Setting[]} />
      </div>
    </div>
  );
}
