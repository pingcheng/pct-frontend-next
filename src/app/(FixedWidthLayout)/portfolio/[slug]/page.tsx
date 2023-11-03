import { Heading } from "@/components/Heading";
import { Portfolios } from "@/data/portfolios";
import { notFound } from "next/navigation";
import PortfolioCard from "@/components/PortfolioCard/PortfolioCard";
import { DataRow } from "@/components/DataRow";
import { Portfolio } from "@/models/Portfolio/Portfolio";
import styles from "./style.module.scss";
import Link from "next/link";

type PageProps = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: PageProps) {
  const slug = params.slug;
  const portfolio = Portfolios.find((item) => item.slug === slug);

  if (!portfolio) {
    return notFound();
  }

  return (
    <div className="py-4">
      <Link href="/portfolio" className="text-gray-500">
        &lt; Back
      </Link>

      <Heading text={portfolio.name} align="center" />

      <div className="flex mt-4">
        <div className="w-1/2 flex justify-center items-center">
          <PortfolioCard portfolio={portfolio} />
        </div>
        <div className="w-1/2 flex flex-col text-sm">
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
        <ScreenshotSection portfolio={portfolio} />
      </div>
    </div>
  );
}

type ScreenshotSectionProps = {
  portfolio: Portfolio;
};
function ScreenshotSection({ portfolio }: ScreenshotSectionProps) {
  if (!portfolio) {
    return <></>;
  }

  return (
    <div className="w-full bg-gray-100 p-8 px-8 rounded-2xl mt-8 bg-opacity-50">
      <div className="mb-8">
        <Heading text="Screenshots" align="center" />
      </div>
      <div className={styles.portfolioScreenshots}>
        {portfolio.screenshots.map((image) => {
          // eslint-disable-next-line @next/next/no-img-element
          return <img key={image} src={image} alt="screenshot" />;
        })}
      </div>
    </div>
  );
}
