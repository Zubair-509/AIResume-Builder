const fs = require('fs');
const path = require('path');

/**
 * Script to identify and pre-warm all pages for faster development
 */
function getAllPages(dir = 'app', pages = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively search subdirectories
      getAllPages(filePath, pages);
    } else if (file === 'page.tsx' || file === 'page.js') {
      // Convert file path to route
      const route = dir
        .replace('app', '')
        .replace(/\\/g, '/')
        .replace(/\/page\.(tsx|js)$/, '') || '/';
      
      pages.push(route);
    }
  }
  
  return pages;
}

/**
 * Generate a warming script that can be used to pre-compile pages
 */
function generateWarmingScript() {
  const pages = getAllPages();
  
  const warmingScript = `
// Auto-generated page warming script
const pages = ${JSON.stringify(pages, null, 2)};

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
        console.warn(\`Failed to prefetch \${page}:\`, error);
      }
    }
    
    console.log(\`✅ Pre-warmed \${criticalPages.length} critical pages\`);
  }
}

export { pages };
`;

  fs.writeFileSync('lib/page-warming.js', warmingScript);
  console.log(`📄 Found ${pages.length} pages:`, pages);
  console.log('✅ Generated page warming script at lib/page-warming.js');
}

if (require.main === module) {
  generateWarmingScript();
}

module.exports = { getAllPages, generateWarmingScript };