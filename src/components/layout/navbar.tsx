"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string };

export function Navbar({
  items,
  logoText,
  logoUrl,
}: {
  items: NavItem[];
  logoText: string;
  logoUrl?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-border/80 bg-background/80 border-b backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between md:h-20">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src={logoUrl || "/ALP_Astrology_Logo.png"}
            alt={logoText}
            width={40}
            height={40}
            className="h-8 w-auto drop-shadow-[0_0_12px_rgba(232,181,74,0.5)] md:h-9"
          />
          <span className="font-cinzel whitespace-nowrap text-sm font-semibold tracking-wide md:text-base">
            {logoText}
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex lg:ml-8">
          {items.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors",
                    active
                      ? "text-white"
                      : "text-white/70 hover:text-white",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="bg-primary/15 ring-primary/30 absolute inset-0 rounded-full ring-1"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/contact">Book a Consultation</Link>
          </Button>
          <button
            className="text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-border/80 bg-background/95 overflow-hidden border-b backdrop-blur-xl lg:hidden"
          >
            <ul className="container-px mx-auto flex max-w-7xl flex-col gap-1 py-4">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-4 py-3 text-white/80 hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="px-4 pt-2">
                <Button asChild className="w-full">
                  <Link href="/contact">Book a Consultation</Link>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
