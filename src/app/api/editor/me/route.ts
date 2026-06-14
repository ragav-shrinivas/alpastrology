import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

/** Lightweight staff check for the client-side visual editor.
 *  Keeps public pages static — only the editor shell calls this. */
export async function GET() {
  const profile = await getCurrentProfile();
  const staff =
    !!profile &&
    ["admin", "editor"].includes(profile.role) &&
    profile.email === "fcams100@gmail.com";
  return NextResponse.json({ staff });
}
