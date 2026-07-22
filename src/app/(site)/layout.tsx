import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsappFab } from "@/components/layout/whatsapp-fab";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { CosmicBackground } from "@/components/three/cosmic-background";
import { FloatingZodiac } from "@/components/zodiac/floating-zodiac";
import { EditorRoot } from "@/components/editor/editor-root";
import { getSettings } from "@/lib/cms/content";

type NavItem = { label: string; href: string };
type FooterColumn = { title: string; links: NavItem[] };

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  const navItems = settings.get<NavItem[]>("navigation.items", []);
  const logoText = settings.get("branding.logo_text", "ALP Astrology");
  const logoUrl = settings.get("branding.logo", "");

  const whatsapp = settings.get("contact.whatsapp", "");

  return (
    <>
      <CosmicBackground />
      <FloatingZodiac />
      <OrganizationJsonLd
        name={settings.get("site.title", "ALP Astrology")}
        description={settings.get("meta.description", "")}
        logo={settings.get("branding.logo", "") || undefined}
        socials={[
          settings.get("social.instagram", ""),
          settings.get("social.facebook", ""),
          settings.get("social.youtube", ""),
        ]}
        phone={settings.get("contact.phone", "") || undefined}
        email={settings.get("contact.email", "") || undefined}
        address={settings.get("contact.address", "") || undefined}
      />
      <Navbar items={navItems} logoText={logoText} logoUrl={logoUrl || undefined} />
      <EditorRoot>
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
      </EditorRoot>
      <WhatsappFab number={whatsapp || undefined} />
      <Footer
        logoText={logoText}
        about={settings.get("footer.about", "")}
        copyright={settings.get("footer.copyright", "")}
        columns={settings.get<FooterColumn[]>("footer.columns", [])}
        socials={{
          instagram: settings.get("social.instagram", ""),
          facebook: settings.get("social.facebook", ""),
          youtube: settings.get("social.youtube", ""),
        }}
        contact={{
          phone: settings.get("contact.phone", ""),
          email: settings.get("contact.email", ""),
          whatsapp: settings.get("contact.whatsapp", ""),
          address: settings.get("contact.address", ""),
        }}
      />
    </>
  );
}
