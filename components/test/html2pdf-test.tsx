
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface TestResult {
  test: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  duration?: number;
}

export function Html2PdfTest() {
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  const updateTestResult = (index: number, status: 'success' | 'error', message: string, duration?: number) => {
    setTestResults(prev => prev.map((result, i) => 
      i === index ? { ...result, status, message, duration } : result
    ));
  };

  const runTests = async () => {
    setIsRunning(true);
    const tests: TestResult[] = [
      { test: 'Library Import', status: 'pending', message: 'Testing html2pdf.js import...' },
      { test: 'Element Creation', status: 'pending', message: 'Creating test HTML element...' },
      { test: 'PDF Configuration', status: 'pending', message: 'Setting up PDF options...' },
      { test: 'PDF Generation', status: 'pending', message: 'Generating PDF from HTML...' },
      { test: 'Cleanup', status: 'pending', message: 'Cleaning up test elements...' }
    ];
    
    setTestResults(tests);

    try {
      // Test 1: Library Import
      const startTime = Date.now();
      let html2pdf;
      try {
        html2pdf = (await import('html2pdf.js')).default;
        updateTestResult(0, 'success', 'html2pdf.js imported successfully', Date.now() - startTime);
      } catch (error) {
        updateTestResult(0, 'error', `Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        throw error;
      }

      // Test 2: Element Creation
      const test2Start = Date.now();
      const testElement = document.createElement('div');
      testElement.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif; width: 210mm; min-height: 297mm; background: white;">
          <h1 style="color: #2563eb; margin-bottom: 20px;">HTML2PDF Test Document</h1>
          <p style="margin-bottom: 15px;">This is a test document to verify html2pdf.js functionality.</p>
          <ul style="margin-left: 20px;">
            <li>✓ Library import test</li>
            <li>✓ Element creation test</li>
            <li>✓ PDF generation test</li>
          </ul>
          <div style="margin-top: 30px; padding: 15px; background: #f3f4f6; border-radius: 8px;">
            <h3 style="margin: 0 0 10px 0; color: #059669;">Test Details:</h3>
            <p style="margin: 5px 0;">Date: ${new Date().toLocaleDateString()}</p>
            <p style="margin: 5px 0;">Time: ${new Date().toLocaleTimeString()}</p>
            <p style="margin: 5px 0;">Browser: ${navigator.userAgent.split(' ')[0]}</p>
          </div>
        </div>
      `;
      
      testElement.style.position = 'absolute';
      testElement.style.left = '-9999px';
      testElement.style.top = '0';
      document.body.appendChild(testElement);
      
      updateTestResult(1, 'success', 'Test HTML element created successfully', Date.now() - test2Start);

      // Test 3: PDF Configuration
      const test3Start = Date.now();
      const options = {
        margin: [10, 10, 10, 10],
        filename: `html2pdf-test-${Date.now()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          allowTaint: false,
          backgroundColor: '#ffffff',
          width: 794,
          height: 1123
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };
      
      updateTestResult(2, 'success', 'PDF configuration setup complete', Date.now() - test3Start);

      // Test 4: PDF Generation
      const test4Start = Date.now();
      try {
        await html2pdf()
          .from(testElement)
          .set(options)
          .save();
        
        updateTestResult(3, 'success', `PDF generated and downloaded successfully`, Date.now() - test4Start);
        toast.success('HTML2PDF test completed successfully!', {
          description: 'PDF has been downloaded to verify functionality'
        });
      } catch (pdfError) {
        updateTestResult(3, 'error', `PDF generation failed: ${pdfError instanceof Error ? pdfError.message : 'Unknown error'}`);
        throw pdfError;
      }

      // Test 5: Cleanup
      const test5Start = Date.now();
      if (document.body.contains(testElement)) {
        document.body.removeChild(testElement);
      }
      updateTestResult(4, 'success', 'Test elements cleaned up successfully', Date.now() - test5Start);

    } catch (error) {
      console.error('HTML2PDF test failed:', error);
      toast.error('HTML2PDF test failed', {
        description: error instanceof Error ? error.message : 'Unknown error occurred'
      });
      
      // Clean up any remaining test elements
      const remainingElements = document.querySelectorAll('[style*="position: absolute"][style*="left: -9999px"]');
      remainingElements.forEach(el => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'error':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Download className="w-6 h-6 mr-3 text-blue-600" />
          HTML2PDF.js Functionality Test
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This test verifies that html2pdf.js is working correctly with your resume export functionality.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Button
          onClick={runTests}
          disabled={isRunning}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          size="lg"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Running Tests...
            </>
          ) : (
            <>
              <Download className="w-5 h-5 mr-2" />
              Run HTML2PDF Tests
            </>
          )}
        </Button>

        {testResults.length > 0 && (
          <div className="space-y-3 mt-6">
            <h3 className="font-semibold text-lg">Test Results:</h3>
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${getStatusColor(result.status)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(result.status)}
                    <span className="font-medium">{result.test}</span>
                  </div>
                  {result.duration && (
                    <span className="text-xs opacity-75">
                      {result.duration}ms
                    </span>
                  )}
                </div>
                <p className="text-sm mt-1 ml-8">{result.message}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">What this test checks:</h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Library import and initialization</li>
            <li>• HTML element creation and manipulation</li>
            <li>• PDF configuration setup</li>
            <li>• Actual PDF generation and download</li>
            <li>• Proper cleanup of test elements</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
