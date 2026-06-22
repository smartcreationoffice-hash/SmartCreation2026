import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    inlineCss: true,
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    // Hobby-plan image-optimization limits cause 402s site-wide once exhausted.
    // Bypass Vercel's optimizer entirely — Supabase serves the originals directly.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // Vercel Blob — every store has its own subdomain on this host.
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      // Supabase Storage — public bucket URLs.
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  async redirects() {
    return [
      { source: "/services/company-formation", destination: "/business-setup", permanent: true },
      { source: "/services/financial", destination: "/financial", permanent: true },
      { source: "/insights", destination: "/blogs", permanent: true },
      { source: "/insights/:slug", destination: "/blogs/:slug", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/((?!admin).*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
