'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Plus, 
  Clock, 
  Download, 
  Share2, 
  Trash2, 
  Edit, 
  Search, 
  Filter, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Navigation } from '@/components/navigation';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';
import Link from 'next/link';
import { format } from 'date-fns';

interface Resume {
  id: string;
  title: string;
  template: string;
  created_at: string;
  last_modified: string;
  is_public: boolean;
  share_id: string | null;
}

export default function DashboardPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'created_at' | 'last_modified' | 'title'>('last_modified');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [deleteResumeId, setDeleteResumeId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Fetch user and resumes on component mount
  useEffect(() => {
    const fetchUserAndResumes = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          throw userError;
        }
        
        if (!user) {
          router.push('/auth/login');
          return;
        }
        
        setUser(user);
        
        // Fetch user's resumes
        const { data: resumesData, error: resumesError } = await supabase
          .from('resumes')
          .select('*')
          .eq('user_id', user.id)
          .order(sortBy, { ascending: sortOrder === 'asc' });
        
        if (resumesError) {
          throw resumesError;
        }
        
        setResumes(resumesData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load your resumes. Please try again.');
        toast.error('Failed to load resumes', {
          description: 'Please refresh the page to try again.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserAndResumes();
  }, [router, sortBy, sortOrder]);

  // Filter resumes based on search term
  const filteredResumes = resumes.filter(resume => 
    resume.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle resume deletion
  const handleDeleteResume = async () => {
    if (!deleteResumeId) return;
    
    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', deleteResumeId);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setResumes(resumes.filter(resume => resume.id !== deleteResumeId));
      toast.success('Resume deleted successfully');
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast.error('Failed to delete resume', {
        description: 'Please try again.',
      });
    } finally {
      setDeleteResumeId(null);
    }
  };

  // Handle resume sharing
  const handleShareResume = async (resumeId: string) => {
    try {
      // Generate a unique share ID if not already present
      const shareId = Math.random().toString(36).substring(2, 15);
      
      const { error } = await supabase
        .from('resumes')
        .update({ 
          is_public: true,
          share_id: shareId 
        })
        .eq('id', resumeId);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setResumes(resumes.map(resume => 
        resume.id === resumeId 
          ? { ...resume, is_public: true, share_id: shareId } 
          : resume
      ));
      
      // Copy share link to clipboard
      const shareLink = `${window.location.origin}/resume/${shareId}`;
      await navigator.clipboard.writeText(shareLink);
      
      toast.success('Share link copied to clipboard', {
        description: 'Your resume is now publicly accessible via this link.',
      });
    } catch (error) {
      console.error('Error sharing resume:', error);
      toast.error('Failed to share resume', {
        description: 'Please try again.',
      });
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <main className="pt-16 pb-16">
        {/* Dashboard Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
                  My Resumes
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Manage all your professional resumes in one place
                </p>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4">
                <Link href="/resume-builder">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Resume
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search resumes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    Sort by: {sortBy === 'last_modified' ? 'Last Modified' : sortBy === 'created_at' ? 'Date Created' : 'Title'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSortBy('last_modified')}>
                    <Clock className="mr-2 h-4 w-4" />
                    Last Modified
                    {sortBy === 'last_modified' && <CheckCircle className="ml-2 h-4 w-4 text-green-600" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('created_at')}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Date Created
                    {sortBy === 'created_at' && <CheckCircle className="ml-2 h-4 w-4 text-green-600" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('title')}>
                    <FileText className="mr-2 h-4 w-4" />
                    Title
                    {sortBy === 'title' && <CheckCircle className="ml-2 h-4 w-4 text-green-600" />}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                    <ArrowRight className={`mr-2 h-4 w-4 transform ${sortOrder === 'asc' ? '' : 'rotate-180'}`} />
                    {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Resumes Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600 dark:text-gray-400">Loading your resumes...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Failed to load resumes
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {error}
              </p>
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          ) : filteredResumes.length === 0 ? (
            <div className="text-center py-16 px-4">
              {searchTerm ? (
                <>
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No resumes found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md mx-auto">
                    We couldn't find any resumes matching "{searchTerm}". Try a different search term or clear your search.
                  </p>
                  <Button 
                    onClick={() => setSearchTerm('')}
                    variant="outline"
                  >
                    Clear Search
                  </Button>
                </>
              ) : (
                <>
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No resumes yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md mx-auto">
                    Get started by creating your first professional resume. Our templates and AI tools make it easy to build an impressive resume in minutes.
                  </p>
                  <Link href="/resume-builder">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Resume
                    </Button>
                  </Link>
                </>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredResumes.map((resume) => (
                  <motion.div
                    key={resume.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <Card className="h-full flex flex-col border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{resume.title}</CardTitle>
                            <CardDescription>
                              <span className="capitalize">{resume.template}</span> template
                            </CardDescription>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                >
                                  <path
                                    d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => router.push(`/edit-resume?id=${resume.id}`)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => router.push(`/preview-resume?id=${resume.id}`)}>
                                <FileText className="mr-2 h-4 w-4" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => router.push(`/download-resume?id=${resume.id}`)}>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleShareResume(resume.id)}>
                                <Share2 className="mr-2 h-4 w-4" />
                                {resume.is_public && resume.share_id ? 'Copy Share Link' : 'Share'}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => setDeleteResumeId(resume.id)}
                                className="text-red-600 hover:text-red-700 focus:text-red-700"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                          <FileText className="h-12 w-12 text-gray-400" />
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>Last modified: {formatDate(resume.last_modified)}</span>
                          </div>
                          {resume.is_public && resume.share_id && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">
                              Shared
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <div className="grid grid-cols-2 gap-2 w-full">
                          <Button 
                            variant="outline" 
                            onClick={() => router.push(`/edit-resume?id=${resume.id}`)}
                            className="w-full"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                          <Button 
                            onClick={() => router.push(`/preview-resume?id=${resume.id}`)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            View
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      {/* Create New Resume CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 sm:text-3xl sm:truncate">
                Ready to create a new resume?
              </h2>
              <p className="mt-3 text-lg text-blue-100 max-w-3xl">
                Choose from our professional templates or use AI to build a resume that stands out from the crowd.
              </p>
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4 space-x-4">
              <Link href="/resume-builder">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 shadow-sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Standard Builder
                </Button>
              </Link>
              <Link href="/build-with-ai">
                <Button className="bg-blue-800 text-white hover:bg-blue-900 shadow-sm">
                  <Sparkles className="mr-2 h-4 w-4" />
                  AI-Powered Builder
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteResumeId} onOpenChange={(open) => !open && setDeleteResumeId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your resume and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteResume}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}