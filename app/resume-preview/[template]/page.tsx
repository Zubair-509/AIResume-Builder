'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { TemplateRenderer } from '@/components/resume-templates/template-renderer';
import { PDFExporter } from '@/components/resume-templates/pdf-exporter';
import { HTMLExporter } from '@/components/ui/html-exporter';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Download, Share2, Globe, Code } from 'lucide-react';
import { LivePreview } from '@/components/ui/live-preview';
import { LoadingOverlay } from '@/components/ui/loading-overlay';
import { toast } from 'sonner';
import Link from 'next/link';

export default function ResumePreviewPage() {
  const params = useParams();
  const router = useRouter();
  const [resumeData, setResumeData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const templateId = params.template as string;

  useEffect(() => {
    // Load resume data from session storage
    const loadResumeData = () => {
      try {
        const data = sessionStorage.getItem('resume-data');
        if (data) {
          setResumeData(JSON.parse(data));
        } else {
          // Try localStorage as fallback
          const localData = localStorage.getItem('resume-data');
          if (localData) {
            setResumeData(JSON.parse(localData));
          } else {
            toast.error('No resume data found', {
              description: 'Please create a resume first'
            });
            router.push('/resume-builder');
          }
        }
      } catch (error) {
        console.error('Failed to load resume data:', error);
        toast.error('Failed to load resume data');
      } finally {
        setIsLoading(false);
      }
    };

    loadResumeData();
  }, [router]);

  const handleShare = async () => {
    try {
      const shareData = {
        title: `${resumeData?.fullName || 'My'} Resume`,
        text: 'Check out my professional resume created with SnapCV',
        url: window.location.href
      };

      if (navigator.share) {
        await navigator.share(shareData);
        toast.success('Resume shared successfully!');
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDownload = () => {
    toast.success('Preparing download...', {
      description: 'Your resume will be downloaded shortly'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingOverlay isLoading={true} message="Loading your resume..." fullScreen={true} />
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Resume Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We couldn't find your resume data. Please create a resume first.
          </p>
          <Link href="/resume-builder">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Create Resume
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 sm:mb-8 space-y-4 md:space-y-0">
            <div>
              <div className="flex items-center mb-2">
                <Link href="/templates">
                  <Button variant="ghost" size="sm" className="mr-2">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Templates
                  </Button>
                </Link>
                <Badge className="bg-green-100 text-green-700">
                  ATS Optimized
                </Badge>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {resumeData.fullName}'s Resume
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {resumeData.jobTitle}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mt-4 md:mt-0">
              <Link href={`/edit-resume?template=${templateId}`}>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Resume
                </Button>
              </Link>
              
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              
              <PDFExporter
                resumeData={resumeData}
                templateId={templateId}
              />
              
              <HTMLExporter
                resumeData={resumeData}
                templateId={templateId}
                variant="outline"
                className="border-blue-200 hover:border-blue-300"
              />
            </div>
          </div>
          
          {/* Resume Preview */}
          <LivePreview 
            title={`${resumeData.fullName}'s Resume`}
            templateId={templateId}
            showEditButton={true}
            showDownloadButton={true}
            showShareButton={true}
            onDownload={handleDownload}
          >
            <div className="p-4">
              <TemplateRenderer 
                templateId={templateId} 
                data={resumeData} 
                showEditButton={true}
              />
            </div>
          </LivePreview>
          
          {/* Export Options */}
          <div className="mt-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <Code className="w-5 h-5 mr-2 text-blue-600" />
                  Export Options
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white h-12"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  
                  <HTMLExporter
                    resumeData={resumeData}
                    templateId={templateId}
                    className="h-12 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  />
                  
                  <Button
                    variant="outline"
                    className="h-12 border-2 border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Resume
                  </Button>
                </div>
                
                <div className="mt-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg text-sm text-gray-600 dark:text-gray-400">
                  <p className="flex items-start">
                    <Globe className="w-4 h-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      The HTML export includes all necessary styles and is ready for use in other web projects. 
                      It's also optimized for printing directly from a web browser.
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}