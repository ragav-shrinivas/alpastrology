import Link from "next/link";
import {
  LayoutTemplate,
  GraduationCap,
  Users,
  FileText,
  CalendarDays,
  ImageIcon,
  Quote,
  HelpCircle,
  Inbox,
  Sparkles,
} from "lucide-react";
import { getDashboardStats } from "@/lib/admin/queries";

const cards = [
  { key: "pages", label: "Pages", icon: LayoutTemplate, href: "/admin/pages" },
  { key: "courses", label: "Courses", icon: GraduationCap, href: "/admin/courses" },
  { key: "consultants", label: "Consultants", icon: Users, href: "/admin/consultants" },
  { key: "services", label: "Services", icon: Sparkles, href: "/admin/services" },
  { key: "blogs", label: "Blog Posts", icon: FileText, href: "/admin/blog" },
  { key: "events", label: "Events", icon: CalendarDays, href: "/admin/events" },
  { key: "gallery", label: "Gallery", icon: ImageIcon, href: "/admin/gallery" },
  { key: "testimonials", label: "Testimonials", icon: Quote, href: "/admin/testimonials" },
  { key: "faq", label: "FAQs", icon: HelpCircle, href: "/admin/faq" },
];

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
      <p className="text-muted mt-1">Welcome back. Here&apos;s your content at a glance.</p>

      {stats.contacts_new > 0 && (
        <Link
          href="/admin/contacts"
          className="border-primary/30 bg-primary/10 mt-6 flex items-center gap-3 rounded-xl border p-4"
        >
          <Inbox className="text-primary size-5" />
          <span className="text-sm">
            You have{" "}
            <strong className="text-primary-300">{stats.contacts_new}</strong> new
            contact {stats.contacts_new === 1 ? "message" : "messages"}.
          </span>
        </Link>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.key}
            href={c.href}
            className="border-border bg-surface hover:border-primary/50 group rounded-2xl border p-5 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
                <c.icon className="size-5" />
              </div>
              <span className="text-3xl font-semibold">{stats[c.key] ?? 0}</span>
            </div>
            <p className="text-muted group-hover:text-white mt-3 text-sm transition-colors">
              {c.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
