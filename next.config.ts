import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
      // CMS-editable image URLs may point anywhere on https.
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
