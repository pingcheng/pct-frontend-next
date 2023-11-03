import { Heading } from "@/components/Heading";
import { Portfolios } from "@/data/portfolios";
import PortfolioCard from "@/components/PortfolioCard/PortfolioCard";
import Link from "next/link";

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
