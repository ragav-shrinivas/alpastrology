import { createClient } from "@/lib/supabase/server";
import { ContactsInbox } from "@/components/admin/contacts-inbox";
import type { Contact } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function AdminContacts() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Contact Messages</h1>
      <p className="text-muted mt-1">Enquiries submitted through the website.</p>
      <div className="mt-8">
        <ContactsInbox contacts={(data ?? []) as Contact[]} />
      </div>
    </div>
  );
}
