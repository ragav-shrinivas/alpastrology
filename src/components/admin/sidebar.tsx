"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  LayoutTemplate,
  Users,
  GraduationCap,
  Sparkles,
  CalendarDays,
  ImageIcon,
  FileText,
  Quote,
  HelpCircle,
  Inbox,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/admin/login/actions";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Pages & Builder", href: "/admin/pages", icon: LayoutTemplate },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Consultants", href: "/admin/consultants", icon: Users },
  { label: "Courses", href: "/admin/courses", icon: GraduationCap },
  { label: "Services", href: "/admin/services", icon: Sparkles },
  { label: "Events", href: "/admin/events", icon: CalendarDays },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { label: "Contacts", href: "/admin/contacts", icon: Inbox },
];

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="border-border bg-surface sticky top-0 z-30 flex items-center justify-between border-b px-4 py-3 lg:hidden">
        <span className="font-display font-semibold">ALP Admin</span>
        <button onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <aside
        className={cn(
          "border-border bg-surface fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="border-border flex items-center gap-2 border-b px-5 py-4">
          <Sparkles className="text-primary size-5" />
          <span className="font-display font-semibold">ALP Admin</span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {nav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary/15 text-primary-300"
                    : "text-muted hover:bg-white/5 hover:text-white",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-border space-y-2 border-t p-3">
          <Link
            href="/"
            target="_blank"
            className="text-muted hover:text-white flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
          >
            <ExternalLink className="size-4" /> View site
          </Link>
          <p className="text-muted truncate px-3 text-xs">{email}</p>
          <form action={signOut}>
            <button
              type="submit"
              className="text-muted hover:text-secondary-500 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm"
            >
              <LogOut className="size-4" /> Sign out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
