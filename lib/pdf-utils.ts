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
  if (!element) {
    const error = new Error('Element not found for PDF generation');
    console.error(error);
    options.onError?.(error);
    return false;
  }

  try {
    options.onProgress?.(10, 'Preparing PDF export...');

    // Clone the element to avoid modifying the original
    const clonedElement = element.cloneNode(true) as HTMLElement;

    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600');

    if (!printWindow) {
      throw new Error('Failed to open print window. Please check your popup blocker settings.');
    }

    options.onProgress?.(25, 'Setting up print layout...');

    // Page size configurations
    const pageSizes = {
      a4: { width: '210mm', height: '297mm' },
      letter: { width: '8.5in', height: '11in' },
      legal: { width: '8.5in', height: '14in' }
    };

    const pageSize = options.pageSize || 'a4';
    const size = pageSizes[pageSize];

    // Create print-optimized HTML
    const printHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${options.filename || 'Resume'}</title>
          <style>
            * {
              box-sizing: border-box;
            }

            @page {
              size: ${pageSize};
              margin: ${options.margins ? `${options.margins[0]}mm ${options.margins[1]}mm ${options.margins[2]}mm ${options.margins[3]}mm` : '10mm'};
            }

            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              font-size: 12px;
              line-height: 1.4;
              color: #000;
              background: ${options.includeBackground ? 'transparent' : '#fff'};
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            .resume-container {
              width: 100%;
              max-width: none;
              margin: 0;
              padding: 20px;
              background: ${options.includeBackground ? 'transparent' : '#fff'};
              box-shadow: none;
              border: none;
              page-break-inside: avoid;
            }

            h1 {
              font-size: 24px;
              margin: 0 0 8px 0;
              font-weight: 700;
              page-break-after: avoid;
            }

            h2 {
              font-size: 18px;
              margin: 16px 0 8px 0;
              font-weight: 600;
              page-break-after: avoid;
              border-bottom: 1px solid #333;
              padding-bottom: 4px;
            }

            h3 {
              font-size: 14px;
              margin: 12px 0 4px 0;
              font-weight: 600;
              page-break-after: avoid;
            }

            p, li {
              margin: 0 0 4px 0;
              page-break-inside: avoid;
            }

            ul, ol {
              margin: 8px 0;
              padding-left: 20px;
            }

            .section {
              margin-bottom: 20px;
              page-break-inside: avoid;
            }

            .work-experience, .education-item, .project-item {
              margin-bottom: 16px;
              page-break-inside: avoid;
            }

            .contact-info {
              display: flex;
              flex-wrap: wrap;
              gap: 16px;
              margin-bottom: 16px;
            }

            .contact-item {
              display: flex;
              align-items: center;
              gap: 4px;
            }

            .skills-list {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
            }

            .skill-tag {
              background: #f0f0f0;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 11px;
              border: 1px solid #ddd;
            }

            .print\\:hidden {
              display: none !important;
            }

            .no-print {
              display: none !important;
            }

            /* Custom CSS injection */
            ${options.customCSS || ''}

            @media print {
              html, body {
                width: 100%;
                height: 100%;
              }

              .resume-container {
                box-shadow: none;
                border: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="resume-container">
            ${clonedElement.innerHTML}
          </div>
        </body>
      </html>
    `;

    options.onProgress?.(50, 'Opening print dialog...');

    // Write content to print window
    printWindow.document.write(printHTML);
    printWindow.document.close();

    // Wait for content to load
    await new Promise((resolve) => {
      printWindow.onload = resolve;
      setTimeout(resolve, 1000); // Fallback timeout
    });

    options.onProgress?.(75, 'Generating PDF...');

    // Focus print window and trigger print dialog
    printWindow.focus();

    // Use a promise to handle the print dialog
    return new Promise((resolve, reject) => {
      try {
        // Set up print dialog
        printWindow.print();

        // Monitor window state
        const checkClosed = setInterval(() => {
          if (printWindow.closed) {
            clearInterval(checkClosed);
            options.onProgress?.(100, 'PDF export completed!');
            options.onComplete?.();
            resolve(true);
          }
        }, 1000);

        // Cleanup timeout
        setTimeout(() => {
          clearInterval(checkClosed);
          if (!printWindow.closed) {
            printWindow.close();
          }
          resolve(true);
        }, 30000); // 30 second timeout

      } catch (error) {
        printWindow.close();
        reject(error);
      }
    });

  } catch (error) {
    console.error('PDF generation error:', error);

    if (error instanceof Error) {
      options.onError?.(error);
      return false;
    } else {
      const genericError = new Error('Unknown error during PDF generation');
      options.onError?.(genericError);
      return false;
    }
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
  // Try multiple selectors in order of preference
  const selectors = [
    '[data-resume-preview] .resume-container',
    '[data-resume-preview]',
    '.resume-container',
    '[class*="ats-"][class*="template"]',
    '[class*="template-container"]',
    '[class*="resume"]'
  ];

  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element && element.innerHTML.trim() && !element.innerHTML.includes('ResumeLoadingSkeleton')) {
      // Make sure it's not just a loading skeleton
      const hasActualContent = element.textContent && 
                              element.textContent.trim().length > 50 &&
                              !element.textContent.includes('loading') &&
                              !element.querySelector('.animate-spin');

      if (hasActualContent) {
        return element;
      }
    }
  }

  // Last resort: look for any element with substantial text content
  const allDivs = document.querySelectorAll('div');
  for (const div of allDivs) {
    if (div.textContent && 
        div.textContent.trim().length > 100 && 
        div.textContent.includes('@') && // likely has email
        !div.textContent.includes('loading') &&
        !div.querySelector('.animate-spin')) {
      return div;
    }
  }

  return null;
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
    const resumeElement = findResumeElement();

    if (!resumeElement) {
      toast.error('Could not find resume content', {
        description: 'Please try again or contact support if the issue persists.'
      });
      return false;
    }

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

    // Show initial toast
    const toastId = toast.loading('Preparing your PDF...', {
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