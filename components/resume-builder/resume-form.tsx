'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, FileText, User, Mail, Phone, FileCheck, Eye } from 'lucide-react';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';

// Dynamically import components to avoid potential circular dependencies
const AnimatedButton = dynamic(() => import('@/components/ui/animated-button').then(mod => ({ default: mod.AnimatedButton })), {
  ssr: false
});

const Input = dynamic(() => import('@/components/ui/input').then(mod => ({ default: mod.Input })), {
  ssr: false
});

const Label = dynamic(() => import('@/components/ui/label').then(mod => ({ default: mod.Label })), {
  ssr: false
});

const Textarea = dynamic(() => import('@/components/ui/textarea').then(mod => ({ default: mod.Textarea })), {
  ssr: false
});

const Card = dynamic(() => import('@/components/ui/card').then(mod => ({ default: mod.Card })), {
  ssr: false
});

const CardContent = dynamic(() => import('@/components/ui/card').then(mod => ({ default: mod.CardContent })), {
  ssr: false
});

const CardHeader = dynamic(() => import('@/components/ui/card').then(mod => ({ default: mod.CardHeader })), {
  ssr: false
});

const CardTitle = dynamic(() => import('@/components/ui/card').then(mod => ({ default: mod.CardTitle })), {
  ssr: false
});

const FileUpload = dynamic(() => import('@/components/ui/file-upload').then(mod => ({ default: mod.FileUpload })), {
  ssr: false
});

const WorkExperienceForm = dynamic(() => import('./work-experience-form').then(mod => ({ default: mod.WorkExperienceForm })), {
  ssr: false
});

const EducationForm = dynamic(() => import('./education-form').then(mod => ({ default: mod.EducationForm })), {
  ssr: false
});

const ResumeBuilderLayout = dynamic(() => import('./resume-builder-layout').then(mod => ({ default: mod.ResumeBuilderLayout })), {
  ssr: false
});

import { resumeFormSchema, type ResumeFormData } from '@/lib/validations';

export function ResumeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  const form = useForm<ResumeFormData>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      jobTitle: '',
      professionalSummary: '',
      skills: '',
      workExperience: [{
        id: '1',
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        responsibilities: '',
      }],
      education: [{
        id: '1',
        institution: '',
        degree: '',
        fieldOfStudy: '',
        graduationDate: '',
      }],
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = form;

  const formData = watch();
  const professionalSummary = watch('professionalSummary');
  const summaryLength = professionalSummary?.length || 0;

  const handleFileSelect = (file: File | null) => {
    setProfilePhoto(file);
    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setPhotoPreview(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    } else {
      setPhotoPreview('');
    }
  };

  const onSubmit = async (data: ResumeFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate form processing
      await new Promise(resolve => setTimeout(resolve, 800));

      console.log('Form data:', data);
      console.log('Profile photo:', profilePhoto);

      setShowPreview(true);

      toast.success('Resume form completed!', {
        description: 'You can now preview and customize your resume.',
      });
    } catch (error) {
      toast.error('Failed to process form', {
        description: 'Please try again or contact support if the issue persists.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add loading state for dynamic components
  if (!isLoaded) {
    setTimeout(() => setIsLoaded(true), 100);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading form...</p>
        </div>
      </div>
    );
  }

  if (showPreview) {
    return <ResumeBuilderLayout formData={formData} />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div 
            className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/20 rounded-full px-4 py-2 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Resume Builder
            </span>
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Create Your Professional Resume
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Fill out the form below to generate a beautiful, ATS-friendly resume that will help you stand out to employers.
          </p>
        </motion.div>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 sm:space-y-8"
        >
          {/* Personal Information */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                  <User className="w-5 h-5 text-blue-600" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div 
                        className="space-y-2"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          {...register('fullName')}
                          placeholder="John Doe"
                          className={errors.fullName ? 'border-red-500' : ''}
                          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                        />
                        {errors.fullName && (
                          <motion.p 
                            id="fullName-error" 
                            className="text-sm text-red-600"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.fullName.message}
                          </motion.p>
                        )}
                      </motion.div>

                      <motion.div 
                        className="space-y-2"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        <Label htmlFor="jobTitle">Job Title *</Label>
                        <Input
                          {...register('jobTitle')}
                          placeholder="Senior Software Engineer"
                          className={errors.jobTitle ? 'border-red-500' : ''}
                          aria-describedby={errors.jobTitle ? 'jobTitle-error' : undefined}
                        />
                        {errors.jobTitle && (
                          <motion.p 
                            id="jobTitle-error" 
                            className="text-sm text-red-600"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.jobTitle.message}
                          </motion.p>
                        )}
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div 
                        className="space-y-2"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            {...register('email')}
                            type="email"
                            placeholder="john@example.com"
                            className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                          />
                        </div>
                        {errors.email && (
                          <motion.p 
                            id="email-error" 
                            className="text-sm text-red-600"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.email.message}
                          </motion.p>
                        )}
                      </motion.div>

                      <motion.div 
                        className="space-y-2"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        <Label htmlFor="phone">Phone Number *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            {...register('phone')}
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                            aria-describedby={errors.phone ? 'phone-error' : undefined}
                          />
                        </div>
                        {errors.phone && (
                          <motion.p 
                            id="phone-error" 
                            className="text-sm text-red-600"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.phone.message}
                          </motion.p>
                        )}
                      </motion.div>
                    </div>
                  </div>

                  <motion.div 
                    className="space-y-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <Label>Profile Photo</Label>
                    <FileUpload
                      onFileSelect={handleFileSelect}
                      preview={photoPreview}
                    />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Professional Summary */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                  <FileCheck className="w-5 h-5 text-blue-600" />
                  <span>Professional Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div 
                  className="space-y-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <div className="flex justify-between items-center">
                    <Label htmlFor="professionalSummary">Professional Summary *</Label>
                    <motion.span 
                      className={`text-xs ${
                        summaryLength < 100 ? 'text-red-500' : 
                        summaryLength > 500 ? 'text-red-500' : 'text-green-600'
                      }`}
                      animate={{ scale: summaryLength > 0 ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {summaryLength}/500 characters
                    </motion.span>
                  </div>
                  <Textarea
                    {...register('professionalSummary')}
                    placeholder="Write a compelling summary of your professional background, key skills, and career objectives..."
                    rows={6}
                    className={errors.professionalSummary ? 'border-red-500' : ''}
                    aria-describedby={errors.professionalSummary ? 'summary-error' : undefined}
                  />
                  {errors.professionalSummary && (
                    <motion.p 
                      id="summary-error" 
                      className="text-sm text-red-600"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.professionalSummary.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div 
                  className="space-y-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Label htmlFor="skills">Skills *</Label>
                  <Textarea
                    {...register('skills')}
                    placeholder="List your skills, one per line:&#10;JavaScript&#10;React&#10;Node.js&#10;Python"
                    rows={6}
                    className={errors.skills ? 'border-red-500' : ''}
                    aria-describedby={errors.skills ? 'skills-error' : undefined}
                  />
                  {errors.skills && (
                    <motion.p 
                      id="skills-error" 
                      className="text-sm text-red-600"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.skills.message}
                    </motion.p>
                  )}
                  <p className="text-xs text-gray-500">
                    Enter each skill on a new line for better formatting
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Work Experience */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="pt-6">
                <WorkExperienceForm control={control} errors={errors} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Education */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="pt-6">
                <EducationForm control={control} errors={errors} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center pt-8"
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 sm:px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto flex items-center justify-center text-lg font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5 mr-2" />
                  <span>Preview Resume</span>
                </>
              )}
            </button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
}