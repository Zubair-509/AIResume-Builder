export interface WorkExperience {
  dataId: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string;
}

export interface Education {
  dataId: string;
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