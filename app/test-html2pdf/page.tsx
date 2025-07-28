
import { Html2PdfTest } from '@/components/test/html2pdf-test';

export default function TestHtml2PdfPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            HTML2PDF.js Test Suite
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Verify that the PDF export functionality is working correctly
          </p>
        </div>
        
        <Html2PdfTest />
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Navigate back to your resume builder to test the actual export functionality
          </p>
        </div>
      </div>
    </div>
  );
}
