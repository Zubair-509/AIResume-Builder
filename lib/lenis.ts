
'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Raf loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef.current;
}

export function scrollTo(target: string | number, options?: { offset?: number; duration?: number }) {
  if (typeof window !== 'undefined' && window.lenis) {
    window.lenis.scrollTo(target, {
      offset: options?.offset || 0,
      duration: options?.duration || 1.2,
    });
  }
}

// Global Lenis instance type
declare global {
  interface Window {
    lenis: Lenis;
  }
}
