
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface WorkExperience {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrentJob?: boolean;
  responsibilities: string;
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  honors?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  expirationDate?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Language {
  language: string;
  proficiency: 'Basic' | 'Intermediate' | 'Advanced' | 'Native';
}

export interface ResumeFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  professionalSummary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  certifications?: Certification[];
  projects?: Project[];
  languages?: Language[];
  achievements?: string[];
}

export interface ResumeData extends ResumeFormData {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  template?: string;
}
