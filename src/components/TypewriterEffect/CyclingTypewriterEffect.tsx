"use client";

import { useState, useEffect } from "react";

export interface CyclingTypewriterEffectProps {
  texts: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  delay?: number;
  cursor?: boolean;
  cursorChar?: string;
  className?: string;
}

export function CyclingTypewriterEffect({
  texts,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  delay = 0,
  cursor = true,
  cursorChar = "|",
  className = "",
}: CyclingTypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(cursor);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) {
      const initialTimer = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(initialTimer);
    }

    if (!hasStarted) return;

    const currentText = texts[textIndex];
    
    if (isTyping && !isDeleting) {
      if (displayText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, typeSpeed);
        return () => clearTimeout(timeout);
      } else {
        const pauseTimeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
        return () => clearTimeout(pauseTimeout);
      }
    }

    if (isDeleting) {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        }, deleteSpeed);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [displayText, textIndex, isTyping, isDeleting, hasStarted, texts, typeSpeed, deleteSpeed, pauseTime, delay]);

  useEffect(() => {
    if (!cursor) return;

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, [cursor]);

  return (
    <span className={className}>
      {displayText}
      {cursor && (
        <span
          className={`inline-block ${showCursor ? "opacity-100" : "opacity-0"}`}
          style={{ transition: "opacity 0.1s" }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}