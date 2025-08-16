"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";

export function useMobileMenu() {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsMobileMenuVisible(!isMobileMenuVisible);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuVisible(false);
  };

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;
    
    if (isMobileMenuVisible) {
      menu.style.maxHeight = menu.scrollHeight + "px";
    } else {
      menu.style.maxHeight = "0px";
    }
  }, [isMobileMenuVisible]);

  useEffect(() => {
    const handleEscape = (event: Event) => {
      if (event instanceof KeyboardEvent && event.key === 'Escape' && isMobileMenuVisible) {
        setIsMobileMenuVisible(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuVisible]);

  return {
    isMobileMenuVisible,
    mobileMenuRef,
    handleKeyDown,
    toggleMobileMenu,
    closeMobileMenu,
  };
}