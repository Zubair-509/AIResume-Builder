'use client';

import { ProfessionalResume } from './professional-resume';

/**
 * Example implementation of the ProfessionalResume component
 * This demonstrates how to use the component with sample data
 */
export function ResumeExample() {
  const sampleData = {
    name: "Sarah Johnson",
    contact: {
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "https://linkedin.com/in/sarahjohnson"
    },
    summary: "Experienced Software Engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of leading cross-functional teams and delivering scalable solutions that improve user experience and drive business growth. Passionate about clean code, agile methodologies, and mentoring junior developers.",
    skills: [
      "JavaScript/TypeScript",
      "React & Next.js",
      "Node.js & Express",
      "Python & Django",
      "AWS & Docker",
      "PostgreSQL & MongoDB",
      "Git & CI/CD",
      "Agile/Scrum"
    ],
    experience: [
      {
        company: "TechCorp Solutions",
        title: "Senior Software Engineer",
        dates: "Jan 2022 - Present",
        achievements: [
          "Led development of microservices architecture serving 1M+ daily users",
          "Reduced application load time by 40% through performance optimization",
          "Mentored 3 junior developers and established code review best practices",
          "Collaborated with product team to define technical requirements for new features"
        ]
      },
      {
        company: "StartupXYZ",
        title: "Full Stack Developer",
        dates: "Jun 2020 - Dec 2021",
        achievements: [
          "Built responsive web applications using React and Node.js",
          "Implemented automated testing suite increasing code coverage to 85%",
          "Designed and developed RESTful APIs handling 10K+ requests per minute",
          "Participated in agile development process and sprint planning"
        ]
      },
      {
        company: "Digital Agency Inc",
        title: "Frontend Developer",
        dates: "Aug 2019 - May 2020",
        achievements: [
          "Developed pixel-perfect responsive websites for 15+ clients",
          "Optimized website performance achieving 95+ Google PageSpeed scores",
          "Collaborated with designers to implement modern UI/UX patterns"
        ]
      }
    ],
    education: [
      {
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science in Computer Science",
        graduationDate: "May 2019",
        gpa: "3.8"
      },
      {
        institution: "Stanford University",
        degree: "Certificate in Machine Learning",
        graduationDate: "Dec 2021"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Professional Resume Component
          </h1>
          <p className="text-gray-600">
            A4-sized resume with modern styling and responsive design
          </p>
        </div>
        
        <ProfessionalResume {...sampleData} />
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            This resume maintains A4 proportions (210mm × 297mm) and is optimized for both screen and print.
          </p>
        </div>
      </div>
    </div>
  );
}