import { toast } from 'sonner';
import { ResumeFormData } from '@/lib/validations';

export interface PDFExportOptions {
  filename?: string;
  pageSize?: 'a4' | 'letter' | 'legal';
  quality?: 'high' | 'medium' | 'low';
  includeBackground?: boolean;
  margins?: [number, number, number, number]; // [top, right, bottom, left] in mm
  customCSS?: string;
  onProgress?: (progress: number, stage: string) => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Native PDF generation using browser's printing API
 * More reliable than html2pdf.js and doesn't require external dependencies
 */
export async function generatePDF(
  element: HTMLElement | null,
  options: PDFExportOptions = {}
): Promise<boolean> {
  try {
    options.onProgress?.(10, 'Finding resume content...');

    // Find the resume element if not provided
    if (!element) {
      const foundElement = await findResumeElement();
      if (!foundElement) {
        const error = new Error('Resume content not found for PDF generation');
        console.error(error);
        options.onError?.(error);
        return false;
      }
      element = foundElement as HTMLElement;
    }

    options.onProgress?.(20, 'Preparing PDF export...');

    // Wait a moment for any dynamic content to load
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Hide all UI elements that shouldn't be in the PDF
    const elementsToHide = [
      'button',
      '.dialog',
      '.dropdown-menu',
      '.toast',
      '.loading',
      '.spinner',
      '[role="dialog"]',
      '.navigation',
      '.sidebar',
      '.toolbar',
      '.controls',
      '.pdf-export',
      '.export-button',
      '.download-button',
      '.template-selector',
      '.form-container',
      '.builder-controls'
    ];

    const hiddenElements: HTMLElement[] = [];
    elementsToHide.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.style.display !== 'none') {
          hiddenElements.push(htmlEl);
          htmlEl.style.display = 'none';
        }
      });
    });

    // Get all computed styles from the current element
    const computedStyles = window.getComputedStyle(element);

    // Create a comprehensive print stylesheet
    const printStyles = `
      <style id="pdf-export-styles">
        @page {
          size: ${options.pageSize === 'letter' ? '8.5in 11in' : 'A4'};
          margin: 0.5in;
        }

        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          body { 
            margin: 0 !important; 
            padding: 0 !important; 
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          }

          [data-resume-preview] {
            background: white !important;
            color: black !important;
            font-size: 11pt !important;
            line-height: 1.4 !important;
            max-width: none !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 20px !important;
            box-shadow: none !important;
            border: none !important;
            transform: none !important;
            -webkit-transform: none !important;
          }

          /* Preserve colors */
          .text-blue-600, .text-blue-700, .text-blue-800 {
            color: #1d4ed8 !important;
          }

          .bg-blue-600, .bg-blue-700, .bg-blue-800 {
            background-color: #1d4ed8 !important;
          }

          .border-blue-200, .border-blue-300 {
            border-color: #bfdbfe !important;
          }

          /* Preserve text colors */
          .text-gray-900 { color: #111827 !important; }
          .text-gray-800 { color: #1f2937 !important; }
          .text-gray-700 { color: #374151 !important; }
          .text-gray-600 { color: #4b5563 !important; }
          .text-gray-500 { color: #6b7280 !important; }

          /* Preserve background colors */
          .bg-white { background-color: white !important; }
          .bg-gray-50 { background-color: #f9fafb !important; }

          /* Ensure icons are preserved */
          svg {
            width: 16px !important;
            height: 16px !important;
            display: inline-block !important;
            vertical-align: middle !important;
            margin-right: 8px !important;
          }

          /* Preserve layouts */
          .grid { display: grid !important; }
          .flex { display: flex !important; }
          .items-center { align-items: center !important; }
          .justify-between { justify-content: space-between !important; }
          .gap-2 { gap: 8px !important; }
          .gap-4 { gap: 16px !important; }
          .gap-8 { gap: 32px !important; }

          /* Preserve spacing */
          .mb-1 { margin-bottom: 4px !important; }
          .mb-2 { margin-bottom: 8px !important; }
          .mb-3 { margin-bottom: 12px !important; }
          .mb-4 { margin-bottom: 16px !important; }
          .mb-5 { margin-bottom: 20px !important; }
          .mb-6 { margin-bottom: 24px !important; }
          .mb-8 { margin-bottom: 32px !important; }

          .mr-2 { margin-right: 8px !important; }
          .mr-3 { margin-right: 12px !important; }

          .p-1 { padding: 4px !important; }
          .p-2 { padding: 8px !important; }
          .p-3 { padding: 12px !important; }
          .p-4 { padding: 16px !important; }

          .pb-1 { padding-bottom: 4px !important; }
          .pb-2 { padding-bottom: 8px !important; }

          /* Typography */
          .text-xl { font-size: 20px !important; }
          .text-lg { font-size: 18px !important; }
          .text-base { font-size: 16px !important; }
          .text-sm { font-size: 14px !important; }
          .text-xs { font-size: 12px !important; }

          .font-bold { font-weight: 700 !important; }
          .font-semibold { font-weight: 600 !important; }
          .font-medium { font-weight: 500 !important; }

          /* Borders */
          .border-b { border-bottom: 1px solid #e5e7eb !important; }
          .border-b-2 { border-bottom: 2px solid #e5e7eb !important; }

          /* Rounded elements */
          .rounded-full { border-radius: 50% !important; }
          .rounded-lg { border-radius: 8px !important; }

          /* Grid layouts */
          .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
          .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }

          /* Responsive adjustments for PDF */
          .w-2 { width: 8px !important; }
          .h-2 { height: 8px !important; }
          .w-4 { width: 16px !important; }
          .h-4 { height: 16px !important; }

          /* Hide UI elements that shouldn't be in PDF */
          button, 
          .button,
          .btn,
          .dialog,
          .dropdown-menu,
          .toast,
          .loading,
          .spinner,
          [role="dialog"],
          .navigation,
          .sidebar,
          .toolbar,
          .controls,
          .pdf-export,
          .export-button,
          .download-button,
          .template-selector,
          .form-container,
          .builder-controls,
          .edit-button,
          .action-buttons,
          .ui-controls {
            display: none !important;
            visibility: hidden !important;
          }

          /* Hide unnecessary elements */
          .shadow, .shadow-lg, .shadow-xl, .shadow-2xl {
            box-shadow: none !important;
          }

          /* Page breaks */
          .page-break-before { page-break-before: always !important; }
          .page-break-after { page-break-after: always !important; }
          .page-break-inside-avoid { page-break-inside: avoid !important; }

          /* Ensure content fits on page */
          .resume-section {
            page-break-inside: avoid !important;
            margin-bottom: 16px !important;
          }
        }
      </style>
    `;

    // Add styles to document head
    const styleElement = document.createElement('div');
    styleElement.innerHTML = printStyles;
    document.head.appendChild(styleElement);

    // Also inject styles directly into the resume element
    const resumeElement = element.querySelector('[data-resume-preview]') as HTMLElement;
    if (resumeElement) {
      // Apply critical inline styles to ensure they're preserved
      resumeElement.style.cssText += `
        background: white !important;
        color: black !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        font-size: 11pt !important;
        line-height: 1.4 !important;
        padding: 20px !important;
        margin: 0 !important;
        width: 100% !important;
        max-width: none !important;
        box-shadow: none !important;
        border: none !important;
      `;

      // Preserve colors for specific elements
      const blueElements = resumeElement.querySelectorAll('.text-blue-600, .text-blue-700, .text-blue-800');
      blueElements.forEach(el => {
        (el as HTMLElement).style.color = '#1d4ed8';
      });

      const blueBorders = resumeElement.querySelectorAll('.border-blue-200, .border-blue-300');
      blueBorders.forEach(el => {
        (el as HTMLElement).style.borderColor = '#bfdbfe';
      });
    }

    options.onProgress?.(30, 'Applying print styles...');

    // Wait a moment for styles to apply
    await new Promise(resolve => setTimeout(resolve, 500));

    options.onProgress?.(50, 'Opening print dialog...');

    // Open print dialog
    window.print();

    options.onProgress?.(100, 'Print dialog opened!');

    // Clean up after a delay
    setTimeout(() => {
      const existingStyles = document.getElementById('pdf-export-styles');
      if (existingStyles) {
        existingStyles.remove();
      }
      
      // Restore hidden elements
      hiddenElements.forEach(el => {
        el.style.display = '';
      });
      
      options.onComplete?.();
    }, 2000);

    return true;
  } catch (error) {
    console.error('PDF generation error:', error);
    options.onError?.(error as Error);
    
    // Restore hidden elements even on error
    if (typeof hiddenElements !== 'undefined') {
      hiddenElements.forEach(el => {
        el.style.display = '';
      });
    }
    
    return false;
  }
}

/**
 * Alternative method using Canvas and jsPDF for more control
 */
export async function generatePDFWithCanvas(
  element: HTMLElement | null,
  options: PDFExportOptions = {}
): Promise<boolean> {
  if (!element) {
    const error = new Error('Element not found for PDF generation');
    console.error(error);
    options.onError?.(error);
    return false;
  }

  try {
    options.onProgress?.(10, 'Loading PDF libraries...');

    // Dynamically import jsPDF and html2canvas
    const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
      import('jspdf'),
      import('html2canvas')
    ]);

    options.onProgress?.(25, 'Capturing element...');

    // Clone and prepare element
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.position = 'absolute';
    clonedElement.style.left = '-9999px';
    clonedElement.style.top = '0';
    clonedElement.style.width = options.pageSize === 'letter' ? '8.5in' : '210mm';
    clonedElement.style.backgroundColor = '#ffffff';
    clonedElement.style.padding = '20px';

    document.body.appendChild(clonedElement);

    // Capture as canvas
    const canvas = await html2canvas(clonedElement, {
      scale: options.quality === 'high' ? 2 : options.quality === 'medium' ? 1.5 : 1,
      useCORS: true,
      backgroundColor: '#ffffff',
      width: options.pageSize === 'letter' ? 816 : 794,
      height: options.pageSize === 'letter' ? 1056 : 1123
    });

    options.onProgress?.(75, 'Creating PDF...');

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: options.pageSize || 'a4'
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;

    pdf.addImage(
      imgData,
      'JPEG',
      margin,
      margin,
      pageWidth - (margin * 2),
      pageHeight - (margin * 2)
    );

    // Save PDF
    const filename = options.filename || `resume_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(filename);

    // Cleanup
    document.body.removeChild(clonedElement);

    options.onProgress?.(100, 'PDF generated successfully!');
    options.onComplete?.();
    return true;

  } catch (error) {
    console.error('Canvas PDF generation error:', error);
    options.onError?.(error instanceof Error ? error : new Error('Unknown error'));
    return false;
  }
}

/**
 * Helper function to find resume element for PDF export
 */
export function findResumeElement(): Element | null {
  // Wait for content to be fully loaded
  const waitForContent = () => {
    return new Promise(resolve => {
      const checkContent = () => {
        // Priority selectors for resume templates
        const selectors = [
          // First try to find the actual resume template content
          '[data-resume-preview] > div',
          '[data-resume-preview]',
          '.resume-template',
          '.template-content',
          '[class*="ats-professional-template"]',
          '[class*="ats-modern-template"]', 
          '[class*="ats-executive-template"]',
          '[class*="template-container"] > div:first-child',
          '.resume-preview-content',
          // Fallback selectors
          '.resume-container',
          '[class*="template-renderer"]'
        ];

        for (const selector of selectors) {
          const element = document.querySelector(selector);
          if (element && element.innerHTML.trim() && !element.innerHTML.includes('ResumeLoadingSkeleton')) {
            // Make sure it contains actual resume content, not UI elements
            const hasActualContent = element.textContent && 
                                    element.textContent.trim().length > 50 &&
                                    !element.textContent.includes('Download PDF') &&
                                    !element.textContent.includes('Select Template') &&
                                    !element.textContent.includes('Resume Builder') &&
                                    !element.textContent.includes('loading') &&
                                    !element.querySelector('.animate-spin') &&
                                    !element.querySelector('.skeleton') &&
                                    !element.querySelector('button') && // Avoid UI buttons
                                    !element.querySelector('.dialog') && // Avoid dialogs
                                    !element.querySelector('.dropdown'); // Avoid dropdowns

            if (hasActualContent) {
              // Extra check: make sure this looks like a resume template
              const looksLikeResume = element.textContent.includes('@') || // email
                                     element.textContent.includes('Experience') ||
                                     element.textContent.includes('Education') ||
                                     element.textContent.includes('Skills') ||
                                     element.textContent.includes('PROFESSIONAL') ||
                                     element.querySelector('h1, h2, h3'); // Has headings

              if (looksLikeResume) {
                resolve(element);
                return;
              }
            }
          }
        }

        // Check if content is still loading
        if (document.querySelector('.animate-spin') || 
            document.querySelector('.skeleton') ||
            document.querySelector('[class*="loading"]')) {
          setTimeout(checkContent, 100);
        } else {
          // Last resort: look specifically for template content
          const templates = document.querySelectorAll('[class*="template"], [data-template], .resume-content');
          for (const template of templates) {
            if (template.textContent && 
                template.textContent.trim().length > 100 && 
                (template.textContent.includes('@') || template.textContent.includes('Experience')) &&
                !template.textContent.includes('Download') &&
                !template.textContent.includes('Builder') &&
                !template.querySelector('button')) {
              resolve(template);
              return;
            }
          }
          resolve(null);
        }
      };

      checkContent();
    });
  };

  return waitForContent() as Promise<Element | null>;
}

/**
 * Helper function to export resume as PDF with standardized UI feedback
 */
export async function exportResumeToPDF(
  resumeData: any,
  templateId: string,
  options: Partial<PDFExportOptions> = {}
): Promise<boolean> {
  try {
    // Show initial loading
    const toastId = toast.loading('Finding resume content...', {
      description: 'Please wait while we locate your resume'
    });

    const resumeElement = await findResumeElement();

    if (!resumeElement) {
      toast.error('Could not find resume content', {
        id: toastId,
        description: 'Please make sure your resume is fully loaded and try again.'
      });
      return false;
    }

    toast.loading('Preparing your PDF...', {
      id: toastId,
      description: 'Setting up export options...'
    });

    // Generate filename if not provided
    if (!options.filename) {
      const name = resumeData?.fullName?.replace(/\s+/g, '_') || 'Resume';
      const date = new Date().toISOString().split('T')[0];
      options.filename = `${name}_${templateId}_${date}.pdf`;
    }

    // Sanitize filename
    options.filename = options.filename
      .replace(/[/\\?%*:|"<>]/g, '-')
      .replace(/\.{2,}/g, '.');

    // Update existing toast
    toast.loading('Preparing your PDF...', {
      id: toastId,
      description: 'Opening print dialog...'
    });

    // Generate PDF with progress updates
    const success = await generatePDF(resumeElement, {
      ...options,
      onProgress: (progress, stage) => {
        options.onProgress?.(progress, stage);

        if (progress < 100) {
          toast.loading(stage, { id: toastId });
        }
      },
      onComplete: () => {
        toast.success('PDF export initiated!', { 
          id: toastId,
          description: 'Use your browser\'s print dialog to save as PDF'
        });
        options.onComplete?.();
      },
      onError: (error) => {
        toast.error('Failed to generate PDF', { 
          id: toastId,
          description: error.message || 'Please try again or contact support'
        });
        options.onError?.(error);
      }
    });

    return success;
  } catch (error) {
    console.error('PDF export error:', error);
    toast.error('Failed to export PDF', {
      description: 'Please try again or contact support if the issue persists.'
    });
    return false;
  }
}