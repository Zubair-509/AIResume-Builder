import { toast } from 'sonner';

export interface PDFExportOptions {
  filename?: string;
  pageSize?: 'a4' | 'letter';
  quality?: 'high' | 'medium' | 'low';
  includeBackground?: boolean;
  margins?: [number, number, number, number]; // [top, right, bottom, left] in mm
  customCSS?: string;
  onProgress?: (progress: number, stage: string) => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Standardized function to generate PDF from HTML element
 * 
 * @param element - The HTML element to convert to PDF
 * @param options - Configuration options for PDF generation
 * @returns Promise that resolves when PDF generation is complete
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
    // Update progress
    options.onProgress?.(10, 'Initializing PDF generation...');
    
    // Dynamically import html2pdf to avoid SSR issues
    let html2pdf;
    try {
      html2pdf = (await import('html2pdf.js')).default;
    } catch (importError) {
      console.error('Failed to load html2pdf.js:', importError);
      throw new Error('Failed to load PDF generation library. Please check your internet connection and try again.');
    }
    
    options.onProgress?.(25, 'Preparing content...');
    
    // Clone the element for PDF generation to avoid modifying the original
    const clonedElement = element.cloneNode(true) as HTMLElement;
    
    // Apply PDF-specific styles
    clonedElement.style.position = 'absolute';
    clonedElement.style.left = '-9999px';
    clonedElement.style.top = '0';
    clonedElement.style.width = options.pageSize === 'letter' ? '8.5in' : '210mm';
    clonedElement.style.height = 'auto';
    clonedElement.style.minHeight = options.pageSize === 'letter' ? '11in' : '297mm';
    clonedElement.style.backgroundColor = options.includeBackground ? '' : '#ffffff';
    clonedElement.style.boxShadow = 'none';
    clonedElement.style.transform = 'scale(1)';
    clonedElement.style.transformOrigin = 'top left';
    clonedElement.style.padding = '20px';
    
    // Remove any elements with print:hidden class
    const hiddenElements = clonedElement.querySelectorAll('.print\\:hidden');
    hiddenElements.forEach(el => el.remove());
    
    // Apply custom CSS if provided
    if (options.customCSS) {
      const styleElement = document.createElement('style');
      styleElement.textContent = options.customCSS;
      clonedElement.appendChild(styleElement);
    }
    
    // Append to body for processing
    document.body.appendChild(clonedElement);
    
    options.onProgress?.(50, 'Configuring PDF options...');

    // Set quality-based parameters
    const qualitySettings = {
      high: { scale: 2, quality: 1.0 },
      medium: { scale: 1.5, quality: 0.8 },
      low: { scale: 1, quality: 0.6 }
    };
    
    const quality = options.quality || 'high';
    const qualitySetting = qualitySettings[quality];
    
    // Configure html2pdf options
    const pdfOptions = {
      margin: options.margins || [0, 0, 0, 0], // Minimal margins for ATS templates
      filename: options.filename || `resume_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { 
        type: 'jpeg', 
        quality: qualitySetting.quality
      },
      html2canvas: { 
        scale: qualitySetting.scale,
        useCORS: true,
        letterRendering: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: process.env.NODE_ENV === 'development',
        width: options.pageSize === 'letter' ? 816 : options.pageSize === 'legal' ? 816 : 794,
        height: options.pageSize === 'letter' ? 1056 : options.pageSize === 'legal' ? 1344 : 1123
      },
      jsPDF: { 
        unit: 'mm', 
        format: options.pageSize || 'a4', 
        orientation: 'portrait',
        compress: true
      },
      pagebreak: { 
        mode: ['avoid-all', 'css', 'legacy']
      }
    };

    options.onProgress?.(75, 'Generating PDF...');
    
    // Set a timeout to handle potential hanging
    const timeoutPromise = new Promise<void>((_, reject) => {
      const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        reject(new Error('PDF generation timed out after 30 seconds'));
      }, 30000); // 30 second timeout
    });
    
    // Generate and download PDF with timeout
    try {
      await Promise.race([
        html2pdf()
          .from(clonedElement)
          .set(pdfOptions)
          .save(),
        timeoutPromise
      ]);
    } catch (pdfError) {
      throw pdfError;
    }
    
    options.onProgress?.(100, 'PDF generated successfully!');
    
    // Clean up
    if (document.body.contains(clonedElement)) {
      document.body.removeChild(clonedElement);
    }
    
    options.onComplete?.();
    return true;
  } catch (error) {
    console.error('PDF generation error:', error);
    
    // Clean up any appended elements
    const appendedElement = document.querySelector('[style*="position: absolute"][style*="left: -9999px"]');
    if (appendedElement && appendedElement.parentNode) {
      appendedElement.parentNode.removeChild(appendedElement);
    }
    
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
 * Utility function to find the resume preview element
 * Searches for common selectors used across different templates
 */
export function findResumeElement(): HTMLElement | null {
  // Try different selectors used across the application
  const selectors = [
    '[data-resume-preview]',
    '[data-template-id]',
    '[data-resume-template]',
    '.resume-container',
    '.resume-preview'
  ];
  
  for (const selector of selectors) {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) return element;
  }
  
  console.warn('Resume element not found using common selectors');
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
    // Find the resume element
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
    
    // Sanitize filename to prevent path traversal attacks
    options.filename = options.filename
      .replace(/[/\\?%*:|"<>]/g, '-') // Remove invalid filename characters
      .replace(/\.{2,}/g, '.'); // Prevent directory traversal
    
    // Show initial toast
    const toastId = toast.loading('Preparing your PDF...', {
      description: 'This may take a few seconds'
    });
    
    // Generate PDF with progress updates
    await generatePDF(resumeElement, {
      ...options,
      onProgress: (progress, stage) => {
        options.onProgress?.(progress, stage);
        
        // Update toast based on progress
        if (progress < 100) {
          toast.loading(stage, { id: toastId });
        }
      },
      onComplete: () => {
        toast.success('PDF downloaded successfully!', { 
          id: toastId,
          description: `Your resume has been saved as ${options.filename}`
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
    
    return true;
  } catch (error) {
    console.error('PDF export error:', error);
    toast.error('Failed to export PDF', {
      description: 'Please try again or contact support if the issue persists.'
    });
    return false;
  }
}