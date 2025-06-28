
// Auto-generated page warming script
const pages = [
  "/account",
  "/auth/forgot-password",
  "/auth/login",
  "/auth/register",
  "/auth/reset-password",
  "/build-with-ai",
  "/dashboard",
  "/edit-resume",
  "/enhance-resume",
  "/",
  "/resume/[username]",
  "/resume-builder",
  "/resume-example",
  "/templates"
];

export async function warmPages() {
  if (typeof window !== 'undefined') {
    console.log('🔥 Pre-warming pages for faster navigation...');
    
    // Pre-load critical pages
    const criticalPages = pages.slice(0, 5);
    
    for (const page of criticalPages) {
      try {
        // Use Next.js router to prefetch pages
        if (window.next && window.next.router) {
          await window.next.router.prefetch(page);
        }
      } catch (error) {
        console.warn(`Failed to prefetch ${page}:`, error);
      }
    }
    
    console.log(`✅ Pre-warmed ${criticalPages.length} critical pages`);
  }
}

export { pages };
