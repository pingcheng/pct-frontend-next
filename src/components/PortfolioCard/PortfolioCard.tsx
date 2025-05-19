import { Portfolio } from "@/models/Portfolio/Portfolio";
import styles from "./style.module.css";

type PortfolioCardProps = {
  portfolio: Portfolio;
};

export default function PortfolioCard({ portfolio }: PortfolioCardProps) {
  return (
    <div
      className={styles.portfolioCard}
      style={{
        backgroundImage: `url('${portfolio.coverImage}')`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="absolute bottom-0 p-2 text-gray-200"
        style={{
          zIndex: 10,
        }}
      >
        <div className="text-sm font-bold">{portfolio.name}</div>
        <div className="text-xs">{portfolio.shortDescription}</div>
      </div>
    </div>
  );
}
