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
  params: {
    slug: string;
  };
};

function getPortfolio(slug: string): Portfolio | undefined {
  return Portfolios.find((item) => item.slug === slug);
}

export function generateMetadata({ params }: PageProps): Metadata {
  const slug = params.slug;
  const portfolio = getPortfolio(slug);

  return {
    title: `Portfolio - ${portfolio?.name}`,
  };
}

export default function Page({ params }: PageProps) {
  const slug = params.slug;
  const portfolio = getPortfolio(slug);

  if (!portfolio) {
    return notFound();
  }

  return (
    <div className="py-4">
      <Link href="/portfolio" className="text-gray-500">
        &lt; Back
      </Link>

      <Heading text={portfolio.name} align="center" />

      <div className="flex mt-4 flex-wrap">
        <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
          <PortfolioCard portfolio={portfolio} />
        </div>
        <div className="w-full md:w-1/2 flex flex-col text-sm">
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

      <div className="flex mt-4">
        <ScreenshotSection images={portfolio.screenshots} />
      </div>
    </div>
  );
}
