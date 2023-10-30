import { Heading } from "@/components/Heading";
import { Portfolios } from "@/data/portfolios";
import PortfolioCard from "@/components/PortfolioCard/PortfolioCard";

export default function Portfolio() {
  return (
    <div className="py-4">
      <Heading text="Portfolio" align="center" />

      <div className="mt-4 flex flex-row flex-wrap gap-8 justify-center">
        {Portfolios.map((portfolio) => {
          return (
            <div key={portfolio.slug}>
              <PortfolioCard portfolio={portfolio} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
