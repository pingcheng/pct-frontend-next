import { Portfolios } from "@/data/portfolios";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";

  // Static routes
  const staticRoutes = ["", "/about", "/portfolio"];

  // Dynamic portfolio routes
  const portfolioRoutes = Portfolios.map((p) => `/portfolio/${p.slug}`);

  const allRoutes = [...staticRoutes, ...portfolioRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      (route) => `
    <url>
      <loc>${baseUrl}${route}</loc>
    </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
