import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Instagram, Facebook } from "@/components/icons/social";
import { getPageSections, getSettings } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { ContactForm } from "@/components/forms/contact-form";
import { whatsappLink } from "@/lib/utils";

export const revalidate = 60;
export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const [sections, settings] = await Promise.all([
    getPageSections("contact"),
    getSettings(),
  ]);

  const phone = settings.get("contact.phone", "");
  const email = settings.get("contact.email", "");
  const whatsapp = settings.get("contact.whatsapp", "");
  const address = settings.get("contact.address", "");
  const mapEmbed = settings.get("contact.map_embed", "");
  const instagram = settings.get("social.instagram", "");
  const facebook = settings.get("social.facebook", "");

  return (
    <>
      <SectionRenderer sections={sections} />
      <section className="container-px mx-auto max-w-7xl pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Info */}
          <div className="space-y-6">
            <div className="border-border bg-surface/60 rounded-2xl border p-6">
              <h3 className="text-lg font-semibold">Reach Us</h3>
              <ul className="text-muted mt-4 space-y-4 text-sm">
                {address && (
                  <li className="flex items-start gap-3">
                    <MapPin className="text-primary mt-0.5 size-5 shrink-0" />
                    <span>{address}</span>
                  </li>
                )}
                {phone && (
                  <li className="flex items-center gap-3">
                    <Phone className="text-primary size-5 shrink-0" />
                    <a href={`tel:${phone}`}>{phone}</a>
                  </li>
                )}
                {email && (
                  <li className="flex items-center gap-3">
                    <Mail className="text-primary size-5 shrink-0" />
                    <a href={`mailto:${email}`}>{email}</a>
                  </li>
                )}
                {whatsapp && (
                  <li className="flex items-center gap-3">
                    <MessageCircle className="text-primary size-5 shrink-0" />
                    <a
                      href={whatsappLink(whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {whatsapp}
                    </a>
                  </li>
                )}
              </ul>
              <div className="mt-6 flex gap-3">
                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="border-border hover:border-primary/60 hover:text-primary flex size-10 items-center justify-center rounded-full border"
                  >
                    <Instagram className="size-4" />
                  </a>
                )}
                {facebook && (
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="border-border hover:border-primary/60 hover:text-primary flex size-10 items-center justify-center rounded-full border"
                  >
                    <Facebook className="size-4" />
                  </a>
                )}
              </div>
            </div>

            {mapEmbed && (
              <div className="border-border overflow-hidden rounded-2xl border">
                <iframe
                  src={mapEmbed}
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map"
                />
              </div>
            )}
          </div>

          {/* Form */}
          <div className="border-border bg-surface/60 rounded-2xl border p-6 md:p-8">
            <h3 className="text-xl font-semibold">Send a Message</h3>
            <p className="text-muted mt-1 mb-6 text-sm">
              Fill in the form and our team will get back to you.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
