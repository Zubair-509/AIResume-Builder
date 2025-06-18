export interface Contact {
  email: string;
  phone: string;
  location?: string;
  linkedin?: string;
  website?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location?: string;
  responsibilities: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  graduationDate: string;
  gpa?: string;
  honors?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  highlights: string[];
}

export interface ResumeData {
  id: string;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location?: string;
  linkedin?: string;
  website?: string;
  professionalSummary: string;
  skills: Record<string, string[]>;
  workExperience: WorkExperience[];
  education: Education[];
  certifications?: Certification[];
  projects?: Project[];
}

export interface ResumeViewerProps {
  resumeData: ResumeData;
  isLoading?: boolean;
  error?: string | null;
}