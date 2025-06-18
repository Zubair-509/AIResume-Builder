export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: 'professional' | 'modern' | 'creative' | 'executive';
  difficulty: 'entry' | 'mid' | 'senior' | 'executive';
  atsScore: number;
  features: string[];
  colors: string[];
  fonts: string[];
  preview: string;
  downloadFormats: string[];
  margins: string;
  spacing: string;
}

export interface ResumeExample {
  id: string;
  name: string;
  industry: string;
  level: 'entry' | 'mid' | 'senior' | 'executive' | 'career-change';
  description: string;
  keywords: string[];
  atsOptimized: boolean;
  preview: string;
  downloadFormats: string[];
  salary_range?: string;
  experience_years?: string;
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'professional-classic',
    name: 'Professional Classic',
    description: 'Clean, traditional layout perfect for corporate environments and conservative industries',
    category: 'professional',
    difficulty: 'mid',
    atsScore: 98,
    features: ['ATS-Optimized', 'Clean Layout', 'Standard Fonts', 'Conservative Design'],
    colors: ['Black & White', 'Navy Blue', 'Dark Gray'],
    fonts: ['Calibri', 'Arial', 'Times New Roman'],
    preview: '/templates/professional-classic.png',
    downloadFormats: ['PDF', 'DOCX'],
    margins: '0.75 inch',
    spacing: 'Standard'
  },
  {
    id: 'modern-minimalist',
    name: 'Modern Minimalist',
    description: 'Contemporary design with subtle color accents, perfect for tech and creative industries',
    category: 'modern',
    difficulty: 'entry',
    atsScore: 95,
    features: ['Modern Design', 'Color Accents', 'Clean Typography', 'Minimalist Layout'],
    colors: ['Blue Accent', 'Green Accent', 'Purple Accent', 'Black & White'],
    fonts: ['Calibri', 'Arial', 'Helvetica'],
    preview: '/templates/modern-minimalist.png',
    downloadFormats: ['PDF', 'DOCX'],
    margins: '0.5 inch',
    spacing: 'Compact'
  },
  {
    id: 'executive-premium',
    name: 'Executive Premium',
    description: 'Sophisticated layout designed for senior leadership and C-suite positions',
    category: 'executive',
    difficulty: 'executive',
    atsScore: 97,
    features: ['Executive Layout', 'Premium Design', 'Leadership Focus', 'Achievement Emphasis'],
    colors: ['Charcoal', 'Navy', 'Black & White', 'Dark Blue'],
    fonts: ['Times New Roman', 'Calibri', 'Georgia'],
    preview: '/templates/executive-premium.png',
    downloadFormats: ['PDF', 'DOCX'],
    margins: '1 inch',
    spacing: 'Generous'
  },
  {
    id: 'creative-professional',
    name: 'Creative Professional',
    description: 'Balanced creativity with professional standards for design and marketing roles',
    category: 'creative',
    difficulty: 'mid',
    atsScore: 92,
    features: ['Creative Elements', 'Professional', 'Visual Appeal', 'Portfolio Ready'],
    colors: ['Teal', 'Orange', 'Purple', 'Coral'],
    fonts: ['Arial', 'Calibri', 'Helvetica'],
    preview: '/templates/creative-professional.png',
    downloadFormats: ['PDF', 'DOCX'],
    margins: '0.75 inch',
    spacing: 'Standard'
  },
  {
    id: 'entry-level-fresh',
    name: 'Entry Level Fresh',
    description: 'Perfect for new graduates and career starters with education emphasis',
    category: 'modern',
    difficulty: 'entry',
    atsScore: 96,
    features: ['Entry-Level Focus', 'Education Emphasis', 'Skills Highlight', 'Project Showcase'],
    colors: ['Blue', 'Green', 'Black & White', 'Teal'],
    fonts: ['Calibri', 'Arial', 'Helvetica'],
    preview: '/templates/entry-level-fresh.png',
    downloadFormats: ['PDF', 'DOCX'],
    margins: '0.5 inch',
    spacing: 'Compact'
  },
  {
    id: 'technical-specialist',
    name: 'Technical Specialist',
    description: 'Optimized for technical and engineering roles with skills matrix',
    category: 'professional',
    difficulty: 'senior',
    atsScore: 99,
    features: ['Technical Focus', 'Skills Matrix', 'Project Emphasis', 'Certification Ready'],
    colors: ['Black & White', 'Blue', 'Gray', 'Navy'],
    fonts: ['Calibri', 'Arial', 'Consolas'],
    preview: '/templates/technical-specialist.png',
    downloadFormats: ['PDF', 'DOCX'],
    margins: '0.75 inch',
    spacing: 'Standard'
  },
  {
    id: 'healthcare-professional',
    name: 'Healthcare Professional',
    description: 'Designed for medical professionals with certification and license emphasis',
    category: 'professional',
    difficulty: 'mid',
    atsScore: 97,
    features: ['Medical Focus', 'Certification Emphasis', 'License Display', 'Clinical Experience'],
    colors: ['Medical Blue', 'Green', 'Black & White'],
    fonts: ['Calibri', 'Arial', 'Times New Roman'],
    preview: '/templates/healthcare-professional.png',
    downloadFormats: ['PDF', 'DOCX'],
    margins: '0.75 inch',
    spacing: 'Standard'
  },
  {
    id: 'finance-banking',
    name: 'Finance & Banking',
    description: 'Conservative design perfect for financial services and banking roles',
    category: 'professional',
    difficulty: 'mid',
    atsScore: 98,
    features: ['Conservative Design', 'Numbers Focus', 'Achievement Metrics', 'Compliance Ready'],
    colors: ['Navy', 'Dark Gray', 'Black & White'],
    fonts: ['Times New Roman', 'Calibri', 'Arial'],
    preview: '/templates/finance-banking.png',
    downloadFormats: ['PDF', 'DOCX'],
    margins: '1 inch',
    spacing: 'Standard'
  }
];

export const resumeExamples: ResumeExample[] = [
  {
    id: 'software-engineer-entry',
    name: 'Software Engineer - Entry Level',
    industry: 'Technology',
    level: 'entry',
    description: 'Recent computer science graduate with internship experience and strong technical foundation',
    keywords: ['JavaScript', 'React', 'Node.js', 'Git', 'Agile', 'Python', 'SQL', 'API Development'],
    atsOptimized: true,
    preview: '/examples/software-engineer-entry.png',
    downloadFormats: ['PDF', 'DOCX'],
    salary_range: '$70K - $90K',
    experience_years: '0-2 years'
  },
  {
    id: 'marketing-manager-mid',
    name: 'Marketing Manager - Mid-Career',
    industry: 'Marketing',
    level: 'mid',
    description: '5+ years experience in digital marketing and campaign management with proven ROI results',
    keywords: ['Digital Marketing', 'SEO', 'Google Analytics', 'Campaign Management', 'Content Strategy', 'Social Media', 'PPC', 'Marketing Automation'],
    atsOptimized: true,
    preview: '/examples/marketing-manager-mid.png',
    downloadFormats: ['PDF', 'DOCX'],
    salary_range: '$80K - $120K',
    experience_years: '5-8 years'
  },
  {
    id: 'finance-director-senior',
    name: 'Finance Director - Senior',
    industry: 'Finance',
    level: 'senior',
    description: '10+ years in financial planning and analysis with team leadership experience',
    keywords: ['Financial Planning', 'Budget Management', 'Risk Analysis', 'Team Leadership', 'P&L Management', 'Financial Modeling', 'Compliance', 'Strategic Planning'],
    atsOptimized: true,
    preview: '/examples/finance-director-senior.png',
    downloadFormats: ['PDF', 'DOCX'],
    salary_range: '$130K - $180K',
    experience_years: '10-15 years'
  },
  {
    id: 'healthcare-nurse-career-change',
    name: 'Registered Nurse - Career Change',
    industry: 'Healthcare',
    level: 'career-change',
    description: 'Transitioning from business to healthcare nursing with relevant transferable skills',
    keywords: ['Patient Care', 'Medical Knowledge', 'Communication', 'Adaptability', 'Critical Thinking', 'Team Collaboration', 'Emergency Response', 'Documentation'],
    atsOptimized: true,
    preview: '/examples/healthcare-nurse-career-change.png',
    downloadFormats: ['PDF', 'DOCX'],
    salary_range: '$65K - $85K',
    experience_years: 'Career Change'
  },
  {
    id: 'ceo-executive',
    name: 'CEO - Executive Level',
    industry: 'Executive',
    level: 'executive',
    description: 'C-suite executive with 15+ years leadership experience and proven growth track record',
    keywords: ['Strategic Leadership', 'P&L Management', 'Board Relations', 'Growth Strategy', 'Mergers & Acquisitions', 'Stakeholder Management', 'Digital Transformation', 'Global Operations'],
    atsOptimized: true,
    preview: '/examples/ceo-executive.png',
    downloadFormats: ['PDF', 'DOCX'],
    salary_range: '$300K - $500K+',
    experience_years: '15+ years'
  },
  {
    id: 'data-scientist-tech',
    name: 'Data Scientist - Tech Industry',
    industry: 'Technology',
    level: 'mid',
    description: 'Machine learning specialist with Python expertise and statistical analysis background',
    keywords: ['Machine Learning', 'Python', 'SQL', 'Data Analysis', 'Statistics', 'TensorFlow', 'Pandas', 'Data Visualization', 'Big Data', 'A/B Testing'],
    atsOptimized: true,
    preview: '/examples/data-scientist-tech.png',
    downloadFormats: ['PDF', 'DOCX'],
    salary_range: '$110K - $150K',
    experience_years: '3-6 years'
  },
  {
    id: 'teacher-education',
    name: 'Elementary Teacher - Education',
    industry: 'Education',
    level: 'mid',
    description: 'Experienced educator with curriculum development skills and classroom management expertise',
    keywords: ['Curriculum Development', 'Classroom Management', 'Student Assessment', 'Educational Technology', 'Differentiated Instruction', 'Parent Communication', 'Special Needs', 'Professional Development'],
    atsOptimized: true,
    preview: '/examples/teacher-education.png',
    downloadFormats: ['PDF', 'DOCX'],
    salary_range: '$45K - $65K',
    experience_years: '5-10 years'
  },
  {
    id: 'sales-representative-entry',
    name: 'Sales Representative - Entry Level',
    industry: 'Sales',
    level: 'entry',
    description: 'Recent graduate with strong communication skills and customer service experience',
    keywords: ['Customer Relations', 'Communication', 'CRM', 'Lead Generation', 'Sales Process', 'Negotiation', 'Product Knowledge', 'Territory Management'],
    atsOptimized: true,
    preview: '/examples/sales-representative-entry.png',
    downloadFormats: ['PDF', 'DOCX'],
    salary_range: '$45K - $65K + Commission',
    experience_years: '0-2 years'
  },
  {
    id: 'project-manager-mid',
    name: 'Project Manager - Mid-Career',
    industry: 'Technology',
    level: 'mid',
    description: 'Certified PMP with experience managing cross-functional teams and complex projects',
    keywords: ['Project Management', 'Agile', 'Scrum', 'PMP', 'Risk Management', 'Stakeholder Management', 'Budget Management', 'Team Leadership', 'Process Improvement'],
    atsOptimized: true,
    preview: '/examples/project-manager-mid.png',
    downloadFormats: ['PDF', 'DOCX'],
    salary_range: '$85K - $115K',
    experience_years: '5-8 years'
  },
  {
    id: 'graphic-designer-creative',
    name: 'Graphic Designer - Creative',
    industry: 'Design',
    level: 'mid',
    description: 'Creative professional with strong portfolio and brand design experience',
    keywords: ['Graphic Design', 'Adobe Creative Suite', 'Brand Identity', 'Typography', 'UI/UX Design', 'Print Design', 'Digital Marketing', 'Creative Direction'],
    atsOptimized: true,
    preview: '/examples/graphic-designer-creative.png',
    downloadFormats: ['PDF', 'DOCX'],
    salary_range: '$55K - $75K',
    experience_years: '3-6 years'
  },
  {
    id: 'hr-manager-mid',
    name: 'HR Manager - Mid-Career',
    industry: 'Human Resources',
    level: 'mid',
    description: 'HR professional with expertise in talent acquisition and employee development',
    keywords: ['Human Resources', 'Talent Acquisition', 'Employee Relations', 'Performance Management', 'HRIS', 'Compliance', 'Training & Development', 'Compensation'],
    atsOptimized: true,
    preview: '/examples/hr-manager-mid.png',
    downloadFormats: ['PDF', 'DOCX'],
    salary_range: '$70K - $95K',
    experience_years: '5-8 years'
  },
  {
    id: 'operations-manager-senior',
    name: 'Operations Manager - Senior',
    industry: 'Operations',
    level: 'senior',
    description: 'Senior operations leader with supply chain and process optimization expertise',
    keywords: ['Operations Management', 'Supply Chain', 'Process Improvement', 'Lean Six Sigma', 'Team Leadership', 'Cost Reduction', 'Quality Management', 'Vendor Management'],
    atsOptimized: true,
    preview: '/examples/operations-manager-senior.png',
    downloadFormats: ['PDF', 'DOCX'],
    salary_range: '$95K - $130K',
    experience_years: '8-12 years'
  }
];

export const industryCategories = [
  'Technology',
  'Healthcare',
  'Finance',
  'Marketing',
  'Education',
  'Sales',
  'Executive',
  'Design',
  'Human Resources',
  'Operations',
  'Engineering',
  'Consulting',
  'Legal',
  'Manufacturing'
];

export const experienceLevels = [
  'Entry Level (0-2 years)',
  'Mid-Career (3-7 years)',
  'Senior (8-15 years)',
  'Executive (15+ years)',
  'Career Change'
];