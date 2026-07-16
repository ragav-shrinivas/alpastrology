import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Instagram, Facebook } from "@/components/icons/social";
import { getPageSections, getSettings } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { ContactForm } from "@/components/forms/contact-form";
import { EditableImage } from "@/components/editor/editable-image";
import { whatsappLink } from "@/lib/utils";
import { DEFAULT_MAP_IMAGE, DEFAULT_MAP_URL } from "@/lib/constants";

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
  const instagram = settings.get("social.instagram", "");
  const facebook = settings.get("social.facebook", "");

  // `contact.map_embed` predates this box being an image and is labelled
  // "Embed URL", so an editor may legitimately have pasted a /maps/embed?pb=
  // URL in there. That renders as a bare tile viewer when opened as a link,
  // so only honour values that work as a destination.
  const savedMapUrl = settings.get<string>("contact.map_embed", "");
  const mapUrl =
    savedMapUrl && !savedMapUrl.includes("/maps/embed")
      ? savedMapUrl
      : DEFAULT_MAP_URL;
  const mapImage =
    settings.get<string>("contact.map_image", "") || DEFAULT_MAP_IMAGE;

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

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open our location in Google Maps"
              className="border-border hover:border-primary/60 group relative block h-[260px] overflow-hidden rounded-2xl border transition-colors"
            >
              <EditableImage
                target={{ settingKey: "contact.map_image" }}
                url={mapImage}
                alt={address ? `Map to ${address}` : "Map to the ALP office"}
                folder="Contact"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="pointer-events-none absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                <MapPin className="size-3.5" />
                Open in Google Maps
              </span>
            </a>
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
