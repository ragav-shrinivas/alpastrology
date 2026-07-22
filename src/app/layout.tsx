import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Cinzel } from "next/font/google";
import { Toaster } from "sonner";
import { getSettings } from "@/lib/cms/content";
import { SITE_URL, OG_IMAGE_PATH } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteTitle = settings.get<string>("site.title", "ALP Astrology");
  const title = settings.get<string>("meta.title", siteTitle) || siteTitle;
  const description = settings.get<string>("meta.description", "");
  const favicon = settings.get<string>("branding.favicon", "");
  // CMS-configured share image wins; otherwise the bundled brand OG card.
  const ogImage = settings.get<string>("branding.og_image", "") || OG_IMAGE_PATH;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${siteTitle}`,
    },
    description,
    keywords: settings.get<string[]>("meta.keywords", []),
    icons: favicon ? { icon: favicon } : undefined,
    alternates: { canonical: SITE_URL },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: siteTitle,
      url: SITE_URL,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${cinzel.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground flex min-h-full flex-col">
        {children}
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            style: {
              background: "#121212",
              border: "1px solid #262626",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
