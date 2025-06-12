import { Heading } from "@/components/Heading";
import { Portfolios } from "@/data/portfolios";
import PortfolioCard from "@/components/PortfolioCard/PortfolioCard";
import Link from "next/link";

export const metadata = {
  title: "Portfolio | Ping Cheng - Software Development Projects",
  description: "Explore Ping Cheng's portfolio showcasing modern web applications, full-stack projects, and software solutions using Node.js, TypeScript, React, and cloud technologies.",
  keywords: [
    "Ping Cheng Portfolio",
    "Software Development Projects",
    "Web Applications",
    "Full Stack Developer",
    "Node.js Projects",
    "TypeScript Applications",
    "React Projects",
    "Cloud Solutions",
    "Enterprise Software",
    "Melbourne Developer"
  ],
  openGraph: {
    title: "Portfolio | Ping Cheng - Software Development Projects",
    description: "Discover innovative software solutions and web applications developed by Ping Cheng. Showcasing expertise in modern technologies and full-stack development.",
    url: "https://www.pingchengtech.com/portfolio",
    type: "website",
    images: [
      {
        url: "/apple-icon.png",
        width: 180,
        height: 180,
        alt: "Ping Cheng Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Ping Cheng - Software Development Projects",
    description: "Discover innovative software solutions and web applications developed by Ping Cheng. Showcasing expertise in modern technologies and full-stack development.",
    images: ["/apple-icon.png"],
  },
};

export default function Portfolio() {
  return (
    <div className="py-4">
      <Heading text="Portfolio" align="center" />

      <div className="mt-4 flex flex-row flex-wrap gap-8 justify-center">
        {Portfolios.map((portfolio) => {
          return (
            <div key={portfolio.slug}>
              <Link href={`/portfolio/${portfolio.slug}`}>
                <PortfolioCard portfolio={portfolio} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
