'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { TemplateRenderer } from '@/components/resume-templates/template-renderer';
import { PDFExporter } from '@/components/resume-templates/pdf-exporter';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Download, Share2 } from 'lucide-react';
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
        title: `${resumeData.fullName}'s Resume`,
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your resume...</p>
        </div>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
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
            
            <div className="flex space-x-3 mt-4 md:mt-0">
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
            </div>
          </div>
          
          {/* Resume Preview */}
          <Card className="border-0 shadow-xl bg-white dark:bg-gray-800 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gray-100 dark:bg-gray-900 p-8">
                <TemplateRenderer 
                  templateId={templateId} 
                  data={resumeData} 
                  showEditButton={false}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}