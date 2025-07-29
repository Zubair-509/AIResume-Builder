
'use client';

import React, { useState, useEffect } from 'react';
import { motion, MotionConfig, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, Download, Edit, Copy, Share2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Link from 'next/link';

interface LivePreviewProps {
  children: React.ReactNode;
  title?: string;
  templateId?: string;
  showEditButton?: boolean;
  showDownloadButton?: boolean;
  showShareButton?: boolean;
  onDownload?: () => void;
  className?: string;
}

export function LivePreview({
  children,
  title = 'Live Preview',
  templateId,
  showEditButton = true,
  showDownloadButton = true,
  showShareButton = true,
  onDownload,
  className = ''
}: LivePreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Reset loading state after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleVisibilityToggle = () => {
    setIsVisible(!isVisible);
  };

  const handleDownload = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (onDownload) {
        onDownload();
      } else {
        toast.success('Download initiated', {
          description: 'Your file is being prepared for download'
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      toast.success('Link copied to clipboard!');
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: 'Check out my resume',
          url: window.location.href,
        });
        toast.success('Shared successfully!');
      } else {
        handleCopy();
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <Card className={`border-0 shadow-xl bg-white dark:bg-gray-800 overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
      }`}>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Eye className="w-5 h-5 mr-2 text-blue-600" />
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <div className="ml-2 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Live</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {showEditButton && templateId && (
              <Link href={`/edit-resume?template=${templateId}`}>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
            )}
            
            {showDownloadButton && (
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 p-0"
                onClick={handleDownload}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
              </Button>
            )}
            
            {showShareButton && (
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 p-0"
                onClick={handleShare}
              >
                {isCopied ? (
                  <Copy className="h-4 w-4 text-green-500" />
                ) : (
                  <Share2 className="h-4 w-4" />
                )}
              </Button>
            )}
            
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 w-8 p-0"
              onClick={handleVisibilityToggle}
            >
              {isVisible ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 w-8 p-0"
              onClick={handleFullscreenToggle}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            {isVisible && (
              <motion.div
                key={`preview-${isVisible}-${isFullscreen}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-gray-50 dark:bg-gray-900 ${
                  isFullscreen ? 'min-h-screen overflow-y-auto' : ''
                }`}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
      
      {!isVisible && (
        <div className="mt-4 text-center">
          <Badge 
            variant="outline" 
            className="cursor-pointer"
            onClick={handleVisibilityToggle}
          >
            <Eye className="w-3 h-3 mr-1" />
            Show Preview
          </Badge>
        </div>
      )}
    </MotionConfig>
  );
}
