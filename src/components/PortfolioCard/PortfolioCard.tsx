"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Portfolio } from "@/models/Portfolio/Portfolio";
import styles from "./style.module.css";

type PortfolioCardProps = {
  portfolio: Portfolio;
  priority?: boolean;
};

export default function PortfolioCard({
  portfolio,
  priority = false,
}: PortfolioCardProps) {
  const [imageError, setImageError] = useState(false);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = Math.max(-5, Math.min(5, (y - centerY) / centerY * -3));
      const rotateY = Math.max(-5, Math.min(5, (x - centerX) / centerX * 3));
      
      setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  const handleClick = () => {
    router.push(`/portfolio/${portfolio.slug}`);
  };

  if (imageError) {
    return (
      <div
        className={styles.imageFallback}
        role="img"
        aria-label={`Cover image for ${portfolio.name} project (image unavailable)`}
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

  return (
    <div 
      ref={containerRef}
      className={styles.perspectiveContainer}
      onClick={handleClick}
    >
      <div
        className={styles.portfolioCard}
        style={{
          backgroundImage: `url('${portfolio.coverImage}')`,
          backgroundSize: "cover",
          transform: transform,
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
    </div>
  );
}
