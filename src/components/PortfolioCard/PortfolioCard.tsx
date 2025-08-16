"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Portfolio } from "@/models/Portfolio/Portfolio";
import { throttle } from "@/utils/throttle";
import { calculateRotation } from "@/utils/calculateRotation";
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

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setTransform("rotateX(0deg) rotateY(0deg)");
      return;
    }

    const THROTTLE_MS = 16; // ~60fps
    const handleGlobalMouseMove = throttle((e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const transform = calculateRotation(e.clientX, e.clientY, rect);
      setTransform(transform);
    }, THROTTLE_MS);

    document.addEventListener('mousemove', handleGlobalMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

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
