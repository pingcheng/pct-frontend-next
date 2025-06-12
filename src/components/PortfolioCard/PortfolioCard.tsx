"use client";

import Image from "next/image";
import { useState } from "react";
import { Portfolio } from "@/types/Portfolio";
import styles from "./style.module.css";

type PortfolioCardProps = {
  portfolio: Portfolio;
  priority?: boolean;
};

export default function PortfolioCard({ portfolio, priority = false }: PortfolioCardProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div 
        className={styles.imageFallback} 
        role="img" 
        aria-label={`Cover image for ${portfolio.name} project (image unavailable)`}
      >
        <div className="absolute bottom-0 p-2 text-gray-200" style={{ zIndex: 10 }}>
          <div className="text-sm font-bold">{portfolio.name}</div>
          <div className="text-xs">{portfolio.shortDescription}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.portfolioCard}
      style={{
        backgroundImage: `url('${portfolio.coverImage}')`,
        backgroundSize: "cover",
      }}
      role="article"
      aria-label={`${portfolio.name} project`}
      onError={() => setImageError(true)}
    >
      <div
        className="absolute bottom-0 p-2 text-gray-200"
        style={{ zIndex: 10 }}
      >
        <div className="text-sm font-bold">{portfolio.name}</div>
        <div className="text-xs">{portfolio.shortDescription}</div>
      </div>
    </div>
  );
}
