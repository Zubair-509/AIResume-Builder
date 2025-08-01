import { z } from 'zod';

export const resumeFormSchema = z.object({
  // Personal Information
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  location: z.string().min(1, 'Location is required'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  github: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),

  // Professional Summary
  professionalSummary: z.string().min(50, 'Professional summary must be at least 50 characters'),

  // Work Experience
  workExperience: z.array(z.object({
    jobTitle: z.string().min(1, 'Job title is required'),
    company: z.string().min(1, 'Company name is required'),
    location: z.string().min(1, 'Location is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().optional(),
    isCurrentJob: z.boolean().optional(),
    responsibilities: z.string().min(50, 'Please provide at least 50 characters of job responsibilities'),
  })).min(1, 'At least one work experience is required'),

  // Education
  education: z.array(z.object({
    degree: z.string().min(1, 'Degree is required'),
    school: z.string().min(1, 'School name is required'),
    location: z.string().min(1, 'Location is required'),
    graduationDate: z.string().min(1, 'Graduation date is required'),
    gpa: z.string().optional(),
    honors: z.string().optional(),
  })).min(1, 'At least one education entry is required'),

  // Skills
  skills: z.array(z.string()).min(1, 'At least one skill is required'),

  // Optional sections
  certifications: z.array(z.object({
    name: z.string().min(1, 'Certification name is required'),
    issuer: z.string().min(1, 'Issuer is required'),
    date: z.string().min(1, 'Date is required'),
    expirationDate: z.string().optional(),
  })).optional(),

  projects: z.array(z.object({
    name: z.string().min(1, 'Project name is required'),
    description: z.string().min(20, 'Project description must be at least 20 characters'),
    technologies: z.array(z.string()).min(1, 'At least one technology is required'),
    link: z.string().url('Invalid project URL').optional().or(z.literal('')),
  })).optional(),

  languages: z.array(z.object({
    language: z.string().min(1, 'Language name is required'),
    proficiency: z.enum(['Basic', 'Intermediate', 'Advanced', 'Native']),
  })).optional(),

  achievements: z.array(z.string()).optional(),
});

export type ResumeFormData = z.infer<typeof resumeFormSchema>;