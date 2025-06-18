'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Component to preload and warm up pages for faster navigation
 */
export function PagePreloader() {
  const router = useRouter();

  useEffect(() => {
    // List of critical pages to preload
    const criticalPages = [
      '/',
      '/resume-builder',
      '/build-with-ai',
      '/edit-resume',
      '/enhance-resume',
      '/resume-example'
    ];

    // Preload pages after initial load
    const preloadPages = async () => {
      // Wait a bit for the initial page to fully load
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('🔥 Pre-loading critical pages...');

      for (const page of criticalPages) {
        try {
          // Use Next.js router prefetch
          router.prefetch(page);
        } catch (error) {
          console.warn(`Failed to prefetch ${page}:`, error);
        }
      }

      console.log(`✅ Pre-loaded ${criticalPages.length} critical pages`);
    };

    // Start preloading
    preloadPages();

    // Preload additional pages on user interaction
    const handleUserInteraction = () => {
      const additionalPages = [
        '/resume/johnsmith',
        '/resume/sarahjohnson'
      ];

      additionalPages.forEach(page => {
        router.prefetch(page);
      });
    };

    // Listen for user interactions to trigger additional preloading
    document.addEventListener('mouseenter', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('mouseenter', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [router]);

  return null; // This component doesn't render anything
}