import { requireStaff } from "@/lib/admin/auth";
import { AdminSidebar } from "@/components/admin/sidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireStaff();

  return (
    <div className="bg-background min-h-screen">
      <AdminSidebar email={profile.email ?? ""} />
      <div className="lg:pl-64">
        <div className="container-px mx-auto max-w-6xl py-8">{children}</div>
      </div>
    </div>
  );
}
