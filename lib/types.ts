export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  graduationDate: string;
}

export interface ResumeFormData {
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  professionalSummary: string;
  skills: string;
  workExperience: WorkExperience[];
  education: Education[];
  profilePhoto?: string;
}