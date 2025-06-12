import { Heading } from "@/components/Heading";
import { Portfolios } from "@/data/portfolios";
import { notFound } from "next/navigation";
import PortfolioCard from "@/components/PortfolioCard/PortfolioCard";
import { DataRow } from "@/components/DataRow";
import { Portfolio } from "@/models/Portfolio/Portfolio";
import Link from "next/link";
import { Metadata } from "next";
import { ScreenshotSection } from "@/app/(FixedWidthLayout)/portfolio/[slug]/ScreenshotSection";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getPortfolio(slug: string): Portfolio | undefined {
  return Portfolios.find((item) => item.slug === slug);
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;
  const portfolio = getPortfolio(slug);

  return {
    title: `Portfolio - ${portfolio?.name}`,
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const slug = params.slug;
  const portfolio = getPortfolio(slug);

  if (!portfolio) {
    return notFound();
  }

  const portfolioData = {
    slug: portfolio.slug,
    name: portfolio.name,
    coverImage: portfolio.coverImage,
    url: portfolio.url,
    shortDescription: portfolio.shortDescription,
    longDescription: portfolio.longDescription,
    workplace: portfolio.workplace,
    projectRole: portfolio.projectRole,
    roleDescription: portfolio.roleDescription ? [...portfolio.roleDescription] : [],
    members: portfolio.members ? [...portfolio.members] : [],
    screenshots: portfolio.screenshots ? [...portfolio.screenshots] : [],
    hasScreenshots: portfolio.hasScreenshots,
  };

  return (
    <div className="py-4">
      <div className="animate-fade-in">
        <Link href="/portfolio" className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
          &lt; Back
        </Link>
      </div>

      <div className="animate-fade-in animate-delay-100">
        <Heading text={portfolio.name} align="center" />
      </div>

      <div className="flex mt-4 flex-wrap">
        <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0 animate-slide-in-left animate-delay-200">
          <PortfolioCard portfolio={portfolioData} />
        </div>
        <div className="w-full md:w-1/2 flex flex-col text-sm animate-slide-in-right animate-delay-300">
          <DataRow label="project">{portfolio.name}</DataRow>
          <DataRow label="url">
            {portfolio.url ? (
              <a href={portfolio.url} target="_blank" rel="noopener">
                {portfolio.url}
              </a>
            ) : (
              "-"
            )}
          </DataRow>
          <DataRow label="description">{portfolio.longDescription}</DataRow>
          <DataRow label="workplace">{portfolio.workplace}</DataRow>
          <DataRow label="project role">{portfolio.projectRole}</DataRow>
          <DataRow label="role description">
            {portfolio.roleDescription.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </DataRow>
          <DataRow label="team members">
            {portfolio.members.map((member) => (
              <div key={member}>{member}</div>
            ))}
          </DataRow>
        </div>
      </div>

      <div className="flex mt-4 animate-fade-in animate-delay-500">
        <ScreenshotSection images={portfolio.screenshots} />
      </div>
    </div>
  );
}
