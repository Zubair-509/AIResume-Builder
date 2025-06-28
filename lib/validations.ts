import { z } from 'zod';

const workExperienceSchema = z.object({
  dataId: z.string(),
  company: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  responsibilities: z.string().min(10, 'Please provide at least 10 characters for responsibilities'),
});

const educationSchema = z.object({
  dataId: z.string(),
  institution: z.string().min(1, 'Institution name is required'),
  degree: z.string().min(1, 'Degree is required'),
  fieldOfStudy: z.string().min(1, 'Field of study is required'),
  graduationDate: z.string().min(1, 'Graduation date is required'),
});

const certificationSchema = z.object({
  dataId: z.string(),
  name: z.string(),
  issuer: z.string(),
  date: z.string(),
  credentialId: z.string().optional(),
});

const projectSchema = z.object({
  dataId: z.string(),
  name: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  url: z.string().optional(),
  highlights: z.array(z.string()),
});

export const resumeFormSchema = z.object({
  fullName: z.string()
    .min(1, 'Full name is required')
    .max(50, 'Full name must be less than 50 characters'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
  jobTitle: z.string()
    .min(1, 'Job title is required')
    .max(100, 'Job title must be less than 100 characters'),
  professionalSummary: z.string()
    .min(100, 'Professional summary must be at least 100 characters')
    .max(500, 'Professional summary must be less than 500 characters'),
  skills: z.string()
    .min(1, 'At least one skill is required'),
  workExperience: z.array(workExperienceSchema)
    .min(1, 'At least one work experience is required'),
  education: z.array(educationSchema)
    .min(1, 'At least one education entry is required'),
  certifications: z.array(certificationSchema).optional(),
  projects: z.array(projectSchema).optional(),
  languages: z.array(z.string()).optional(),
  profilePhoto: z.string().optional(),
});

export type ResumeFormData = z.infer<typeof resumeFormSchema>;