import { ResumeViewer } from '@/components/resume-viewer/resume-viewer';
import { notFound } from 'next/navigation';

interface ResumePageProps {
  params: {
    username: string;
  };
}

// Mock data for demonstration - in a real app, this would come from a database
const mockResumeData = {
  johnsmith: {
    id: 'johnsmith',
    fullName: 'John Smith',
    jobTitle: 'Senior Software Engineer',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/johnsmith',
    website: 'https://johnsmith.dev',
    professionalSummary: 'Experienced Software Engineer with 7+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of leading cross-functional teams and delivering scalable solutions that improve user experience and drive business growth. Passionate about clean code, agile methodologies, and mentoring junior developers.',
    skills: {
      'Frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
      'Backend': ['Node.js', 'Express', 'Python', 'Django', 'GraphQL'],
      'Database': ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'],
      'Cloud & DevOps': ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
      'Tools': ['Git', 'Jira', 'Figma', 'Postman', 'VS Code']
    },
    workExperience: [
      {
        id: '1',
        company: 'TechCorp Solutions',
        position: 'Senior Software Engineer',
        startDate: '2022-01',
        endDate: '',
        current: true,
        location: 'San Francisco, CA',
        responsibilities: 'Led development of microservices architecture serving 1M+ daily users\nReduced application load time by 40% through performance optimization\nMentored 3 junior developers and established code review best practices\nCollaborated with product team to define technical requirements for new features'
      },
      {
        id: '2',
        company: 'StartupXYZ',
        position: 'Full Stack Developer',
        startDate: '2020-06',
        endDate: '2021-12',
        current: false,
        location: 'Remote',
        responsibilities: 'Built responsive web applications using React and Node.js\nImplemented automated testing suite increasing code coverage to 85%\nDesigned and developed RESTful APIs handling 10K+ requests per minute\nParticipated in agile development process and sprint planning'
      },
      {
        id: '3',
        company: 'Digital Agency Inc',
        position: 'Frontend Developer',
        startDate: '2019-08',
        endDate: '2020-05',
        current: false,
        location: 'New York, NY',
        responsibilities: 'Developed pixel-perfect responsive websites for 15+ clients\nOptimized website performance achieving 95+ Google PageSpeed scores\nCollaborated with designers to implement modern UI/UX patterns'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        graduationDate: '2019-05',
        gpa: '3.8',
        honors: 'Magna Cum Laude'
      },
      {
        id: '2',
        institution: 'Stanford University',
        degree: 'Certificate',
        fieldOfStudy: 'Machine Learning',
        graduationDate: '2021-12'
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2023-03',
        credentialId: 'AWS-CSA-2023-001'
      },
      {
        id: '2',
        name: 'Certified Kubernetes Administrator',
        issuer: 'Cloud Native Computing Foundation',
        date: '2022-11',
        credentialId: 'CKA-2022-456'
      }
    ],
    projects: [
      {
        id: '1',
        name: 'E-commerce Platform',
        description: 'Built a scalable e-commerce platform using React, Node.js, and AWS',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Stripe'],
        url: 'https://github.com/johnsmith/ecommerce-platform',
        highlights: ['Handles 50K+ daily transactions', 'Integrated with multiple payment gateways', 'Implemented real-time inventory management']
      },
      {
        id: '2',
        name: 'Task Management App',
        description: 'Developed a collaborative task management application with real-time updates',
        technologies: ['Next.js', 'Socket.io', 'MongoDB', 'Docker'],
        url: 'https://github.com/johnsmith/task-manager',
        highlights: ['Real-time collaboration features', 'Mobile-responsive design', 'Offline functionality']
      }
    ]
  },
  sarahjohnson: {
    id: 'sarahjohnson',
    fullName: 'Sarah Johnson',
    jobTitle: 'UX/UI Designer',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 987-6543',
    location: 'Los Angeles, CA',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    website: 'https://sarahjohnson.design',
    professionalSummary: 'Creative UX/UI Designer with 5+ years of experience creating intuitive and engaging digital experiences. Specialized in user research, wireframing, prototyping, and visual design. Passionate about solving complex user problems through thoughtful design and data-driven decisions.',
    skills: {
      'Design Tools': ['Figma', 'Sketch', 'Adobe Creative Suite', 'Principle', 'InVision'],
      'Research': ['User Interviews', 'Usability Testing', 'A/B Testing', 'Analytics'],
      'Frontend': ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
      'Collaboration': ['Agile/Scrum', 'Design Systems', 'Stakeholder Management']
    },
    workExperience: [
      {
        id: '1',
        company: 'Design Studio Pro',
        position: 'Senior UX/UI Designer',
        startDate: '2021-03',
        endDate: '',
        current: true,
        location: 'Los Angeles, CA',
        responsibilities: 'Lead design for mobile and web applications serving 500K+ users\nConducted user research and usability testing to inform design decisions\nCreated and maintained design system used across 5 product teams\nCollaborated with product managers and engineers to deliver pixel-perfect implementations'
      },
      {
        id: '2',
        company: 'TechStart Inc',
        position: 'UX Designer',
        startDate: '2019-06',
        endDate: '2021-02',
        current: false,
        location: 'Remote',
        responsibilities: 'Designed user interfaces for B2B SaaS platform\nImproved user onboarding flow resulting in 35% increase in user retention\nCreated wireframes, prototypes, and high-fidelity mockups\nParticipated in design sprints and cross-functional team meetings'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'Art Center College of Design',
        degree: 'Bachelor of Fine Arts',
        fieldOfStudy: 'Graphic Design',
        graduationDate: '2019-05'
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'Google UX Design Certificate',
        issuer: 'Google',
        date: '2020-08'
      }
    ],
    projects: [
      {
        id: '1',
        name: 'Mobile Banking App',
        description: 'Redesigned mobile banking app improving user satisfaction by 40%',
        technologies: ['Figma', 'Principle', 'User Research'],
        highlights: ['Increased user engagement by 25%', 'Reduced support tickets by 30%', 'Won Best Mobile Design Award 2022']
      }
    ]
  }
};

export default function ResumePage({ params }: ResumePageProps) {
  const { username } = params;
  const resumeData = mockResumeData[username as keyof typeof mockResumeData];

  if (!resumeData) {
    notFound();
  }

  return <ResumeViewer resumeData={resumeData} />;
}

export async function generateStaticParams() {
  // In a real app, this would fetch usernames from your database
  return Object.keys(mockResumeData).map((username) => ({
    username,
  }));
}

export async function generateMetadata({ params }: ResumePageProps) {
  const { username } = params;
  const resumeData = mockResumeData[username as keyof typeof mockResumeData];

  if (!resumeData) {
    return {
      title: 'Resume Not Found',
      description: 'The requested resume could not be found.',
    };
  }

  return {
    title: `${resumeData.fullName} - ${resumeData.jobTitle} | SnapCV`,
    description: `View ${resumeData.fullName}'s professional resume. ${resumeData.professionalSummary.substring(0, 150)}...`,
    openGraph: {
      title: `${resumeData.fullName} - ${resumeData.jobTitle}`,
      description: resumeData.professionalSummary.substring(0, 200),
      type: 'profile',
    },
  };
}