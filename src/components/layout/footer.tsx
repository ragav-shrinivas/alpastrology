import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Instagram, Facebook, Youtube } from "@/components/icons/social";
import { Evo9Badge } from "./evo9-badge";
import { whatsappLink } from "@/lib/utils";

type FooterColumn = { title: string; links: { label: string; href: string }[] };

export function Footer({
  logoText,
  about,
  copyright,
  columns,
  socials,
  contact,
}: {
  logoText: string;
  about: string;
  copyright: string;
  columns: FooterColumn[];
  socials: { instagram?: string; facebook?: string; youtube?: string };
  contact: { phone?: string; email?: string; whatsapp?: string; address?: string };
}) {
  return (
    <footer className="border-border bg-surface/40 relative mt-24 border-t">
      <div className="bg-radial-glow pointer-events-none absolute inset-0 opacity-40" />
      <div className="container-px relative mx-auto max-w-7xl py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/ALP_Astrology_Logo.png"
                alt={logoText}
                width={40}
                height={40}
                className="h-9 w-auto drop-shadow-[0_0_12px_rgba(232,181,74,0.5)]"
              />
              <span className="font-cinzel text-xl font-semibold">
                {logoText}
              </span>
            </Link>
            <p className="text-muted mt-4 max-w-sm text-sm leading-relaxed">
              {about}
            </p>
            <div className="mt-6 flex gap-3">
              {socials.instagram && (
                <SocialIcon href={socials.instagram} label="Instagram">
                  <Instagram className="size-4" />
                </SocialIcon>
              )}
              {socials.facebook && (
                <SocialIcon href={socials.facebook} label="Facebook">
                  <Facebook className="size-4" />
                </SocialIcon>
              )}
              {socials.youtube && (
                <SocialIcon href={socials.youtube} label="YouTube">
                  <Youtube className="size-4" />
                </SocialIcon>
              )}
              {contact.whatsapp && (
                <SocialIcon
                  href={whatsappLink(contact.whatsapp)}
                  label="WhatsApp"
                >
                  <MessageCircle className="size-4" />
                </SocialIcon>
              )}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold tracking-wide text-white">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-muted hover:text-primary-300 text-sm transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="text-muted mt-12 grid gap-4 border-t border-white/5 pt-8 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {contact.address && (
            <p className="flex items-start gap-2">
              <MapPin className="text-primary mt-0.5 size-4 shrink-0" />
              <span>{contact.address}</span>
            </p>
          )}
          {contact.phone && (
            <p className="flex items-center gap-2">
              <Phone className="text-primary size-4 shrink-0" />
              <a href={`tel:${contact.phone}`}>{contact.phone}</a>
            </p>
          )}
          {contact.email && (
            <p className="flex items-center gap-2">
              <Mail className="text-primary size-4 shrink-0" />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-muted text-xs">{copyright}</p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              className="text-muted hover:text-white text-xs"
            >
              Privacy
            </Link>
            <Link href="/terms" className="text-muted hover:text-white text-xs">
              Terms
            </Link>
            <Evo9Badge />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="border-border bg-surface-2 text-muted hover:border-primary/60 hover:text-primary flex size-9 items-center justify-center rounded-full border transition-colors"
    >
      {children}
    </a>
  );
}
