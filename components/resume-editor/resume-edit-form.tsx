'use client';

import { UseFormReturn } from 'react-hook-form';
import { motion } from 'framer-motion';
import { User, FileText, Briefcase, GraduationCap, Code } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ResumeFormData } from '@/lib/validations';
import { WorkExperienceForm } from '@/components/resume-builder/work-experience-form';
import { EducationForm } from '@/components/resume-builder/education-form';

interface ResumeEditFormProps {
  form: UseFormReturn<ResumeFormData>;
}

export function ResumeEditForm({ form }: ResumeEditFormProps) {
  const { register, control, formState: { errors }, watch } = form;
  
  const professionalSummary = watch('professionalSummary');
  const summaryLength = professionalSummary?.length || 0;

  const sections = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: User,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              {...register('fullName')}
              placeholder="John Doe"
              className={errors.fullName ? 'border-red-500' : ''}
            />
            {errors.fullName && (
              <p className="text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title *</Label>
            <Input
              {...register('jobTitle')}
              placeholder="Senior Software Engineer"
              className={errors.jobTitle ? 'border-red-500' : ''}
            />
            {errors.jobTitle && (
              <p className="text-sm text-red-600">{errors.jobTitle.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              {...register('email')}
              type="email"
              placeholder="john@example.com"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              {...register('phone')}
              placeholder="+1 (555) 123-4567"
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>
      )
    },
    {
      id: 'summary',
      title: 'Professional Summary',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="professionalSummary">Professional Summary *</Label>
              <span className={`text-xs ${
                summaryLength < 100 ? 'text-red-500' : 
                summaryLength > 500 ? 'text-red-500' : 'text-green-600'
              }`}>
                {summaryLength}/500 characters
              </span>
            </div>
            <Textarea
              {...register('professionalSummary')}
              placeholder="Write a compelling summary of your professional background..."
              rows={6}
              className={errors.professionalSummary ? 'border-red-500' : ''}
            />
            {errors.professionalSummary && (
              <p className="text-sm text-red-600">{errors.professionalSummary.message}</p>
            )}
          </div>
        </div>
      )
    },
    {
      id: 'skills',
      title: 'Skills',
      icon: Code,
      content: (
        <div className="space-y-2">
          <Label htmlFor="skills">Skills *</Label>
          <Textarea
            {...register('skills')}
            placeholder="List your skills, one per line:&#10;JavaScript&#10;React&#10;Node.js"
            rows={8}
            className={errors.skills ? 'border-red-500' : ''}
          />
          {errors.skills && (
            <p className="text-sm text-red-600">{errors.skills.message}</p>
          )}
          <p className="text-xs text-gray-500">
            Enter each skill on a new line for better formatting
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="border border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <section.icon className="w-5 h-5 mr-2 text-blue-600" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {section.content}
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {/* Work Experience */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="border border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg">
              <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
              Work Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WorkExperienceForm control={control} errors={errors} />
          </CardContent>
        </Card>
      </motion.div>

      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="border border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg">
              <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EducationForm control={control} errors={errors} />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}