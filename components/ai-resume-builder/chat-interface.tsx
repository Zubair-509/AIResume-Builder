'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, CheckCircle, AlertCircle, Edit, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResumeFormData } from '@/lib/validations';
import { toast } from 'sonner';
import Link from 'next/link';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface ChatInterfaceProps {
  onComplete: (data: Partial<ResumeFormData>) => void;
}

export function ChatInterface({ onComplete }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your AI resume assistant. I'll help you create a professional resume by asking you a few questions. Let's start with your basic information. What's your full name?",
      timestamp: new Date(),
      suggestions: ['John Smith', 'Sarah Johnson', 'Michael Brown']
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [collectedData, setCollectedData] = useState<Partial<ResumeFormData>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isCollectingAdditional, setIsCollectingAdditional] = useState(false);
  const [showTemplateInfo, setShowTemplateInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatSteps = [
    {
      field: 'fullName',
      question: "What's your full name?",
      suggestions: ['John Smith', 'Sarah Johnson', 'Michael Brown'],
      validation: (value: string) => value.length >= 2
    },
    {
      field: 'email',
      question: "What's your email address?",
      suggestions: ['john@example.com', 'sarah@gmail.com', 'michael@company.com'],
      validation: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    },
    {
      field: 'phone',
      question: "What's your phone number?",
      suggestions: ['+1 (555) 123-4567', '+1 (555) 987-6543', '+1 (555) 456-7890'],
      validation: (value: string) => /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))
    },
    {
      field: 'jobTitle',
      question: "What's your current or desired job title?",
      suggestions: ['Software Engineer', 'Marketing Manager', 'Data Scientist', 'Product Manager'],
      validation: (value: string) => value.length >= 2
    },
    {
      field: 'professionalSummary',
      question: "Tell me about your professional background and key achievements. This will be your professional summary.",
      suggestions: [
        'Experienced software engineer with 5+ years in full-stack development...',
        'Results-driven marketing professional with expertise in digital campaigns...',
        'Data scientist with strong analytical skills and machine learning experience...'
      ],
      validation: (value: string) => value.length >= 50
    },
    {
      field: 'skills',
      question: "What are your key skills? Please list them separated by commas or new lines.",
      suggestions: [
        'JavaScript, React, Node.js, Python, AWS',
        'Digital Marketing, SEO, Google Analytics, Social Media',
        'Data Analysis, Python, SQL, Machine Learning, Tableau'
      ],
      validation: (value: string) => value.length >= 10
    }
  ];

  const resumeSections = [
    { id: 1, name: 'Personal Information', field: 'personal' },
    { id: 2, name: 'Professional Summary', field: 'professionalSummary' },
    { id: 3, name: 'Skills', field: 'skills' },
    { id: 4, name: 'Work Experience', field: 'workExperience' },
    { id: 5, name: 'Education', field: 'education' }
  ];

  const resumeTemplates = [
    { id: 'modern', name: 'Modern Minimalist', description: 'Clean design for tech and creative roles' },
    { id: 'classic', name: 'Traditional Corporate', description: 'Professional layout for corporate positions' },
    { id: 'executive', name: 'Executive Premium', description: 'Sophisticated design for leadership roles' },
    { id: 'technical', name: 'Technical Specialist', description: 'Optimized for technical positions' },
    { id: 'entry-level', name: 'Entry Level Fresh', description: 'Perfect for new graduates' }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (type: 'bot' | 'user', content: string, suggestions?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      suggestions
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const displayCurrentSectionInfo = (sectionField: string) => {
    let content = '';
    
    switch (sectionField) {
      case 'personal':
        content = `Current Personal Information:
• Name: ${collectedData.fullName || 'Not set'}
• Email: ${collectedData.email || 'Not set'}
• Phone: ${collectedData.phone || 'Not set'}
• Job Title: ${collectedData.jobTitle || 'Not set'}`;
        break;
      case 'professionalSummary':
        content = `Current Professional Summary:
${collectedData.professionalSummary || 'Not set'}`;
        break;
      case 'skills':
        content = `Current Skills:
${collectedData.skills || 'Not set'}`;
        break;
      case 'workExperience':
        const workExp = collectedData.workExperience || [];
        content = `Current Work Experience (${workExp.length} entries):
${workExp.map((exp, index) => `${index + 1}. ${exp.position} at ${exp.company} (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate})`).join('\n') || 'No work experience added'}`;
        break;
      case 'education':
        const education = collectedData.education || [];
        content = `Current Education (${education.length} entries):
${education.map((edu, index) => `${index + 1}. ${edu.degree} in ${edu.fieldOfStudy} from ${edu.institution} (${edu.graduationDate})`).join('\n') || 'No education added'}`;
        break;
    }
    
    return content;
  };

  const processAdditionalInfo = (userInput: string) => {
    // Analyze the input and categorize it
    const input = userInput.toLowerCase();
    let updatedData = { ...collectedData };
    
    // Check for certifications
    if (input.includes('certification') || input.includes('certified') || input.includes('certificate')) {
      const certifications = collectedData.certifications || [];
      certifications.push({
        id: Date.now().toString(),
        name: userInput,
        issuer: 'To be specified',
        date: new Date().getFullYear().toString()
      });
      updatedData.certifications = certifications;
      addMessage('bot', `Great! I've added that certification to your resume. The certification "${userInput}" has been included in your certifications section.`);
    }
    // Check for projects
    else if (input.includes('project') || input.includes('built') || input.includes('developed')) {
      const projects = collectedData.projects || [];
      projects.push({
        id: Date.now().toString(),
        name: userInput.split(' ').slice(0, 3).join(' '),
        description: userInput,
        technologies: [],
        highlights: [userInput]
      });
      updatedData.projects = projects;
      addMessage('bot', `Excellent! I've added that project to your resume. The project has been included in your projects section.`);
    }
    // Check for additional skills
    else if (input.includes('skill') || input.includes('proficient') || input.includes('experience with')) {
      const currentSkills = collectedData.skills || '';
      updatedData.skills = currentSkills + '\n' + userInput;
      addMessage('bot', `Perfect! I've added those additional skills to your resume.`);
    }
    // Check for languages
    else if (input.includes('language') || input.includes('speak') || input.includes('fluent')) {
      const languages = collectedData.languages || [];
      languages.push(userInput);
      updatedData.languages = languages;
      addMessage('bot', `Great! I've added that language information to your resume.`);
    }
    // General additional information
    else {
      // Add to professional summary or create a new section
      const currentSummary = collectedData.professionalSummary || '';
      updatedData.professionalSummary = currentSummary + ' ' + userInput;
      addMessage('bot', `Thank you! I've incorporated that information into your professional summary.`);
    }
    
    setCollectedData(updatedData);
    return updatedData;
  };

  const handleEditModeInput = async (userInput: string) => {
    if (!editingSection) {
      // User is selecting a section to edit
      const sectionNumber = parseInt(userInput);
      if (sectionNumber >= 1 && sectionNumber <= resumeSections.length) {
        const selectedSection = resumeSections[sectionNumber - 1];
        setEditingSection(selectedSection.field);
        
        const sectionInfo = displayCurrentSectionInfo(selectedSection.field);
        addMessage('bot', `You've selected "${selectedSection.name}". Here's the current information:

${sectionInfo}

What would you like to modify? You can:
- Add new information
- Update existing details  
- Delete specific items

Please tell me what changes you'd like to make.`);
      } else {
        addMessage('bot', 'Please enter a valid section number (1-5). Which section would you like to edit?');
      }
      return;
    }

    // Process the edit request
    const input = userInput.toLowerCase();
    let updatedData = { ...collectedData };
    let changesMade = false;

    if (editingSection === 'personal') {
      if (input.includes('name')) {
        const nameMatch = userInput.match(/name.*?([A-Za-z\s]+)/i);
        if (nameMatch) {
          updatedData.fullName = nameMatch[1].trim();
          changesMade = true;
        }
      }
      if (input.includes('email')) {
        const emailMatch = userInput.match(/email.*?([^\s@]+@[^\s@]+\.[^\s@]+)/i);
        if (emailMatch) {
          updatedData.email = emailMatch[1];
          changesMade = true;
        }
      }
      if (input.includes('phone')) {
        const phoneMatch = userInput.match(/phone.*?([\+]?[1-9][\d\s\-\(\)]{8,})/i);
        if (phoneMatch) {
          updatedData.phone = phoneMatch[1];
          changesMade = true;
        }
      }
      if (input.includes('job title') || input.includes('title')) {
        const titleMatch = userInput.match(/title.*?([A-Za-z\s]+)/i);
        if (titleMatch) {
          updatedData.jobTitle = titleMatch[1].trim();
          changesMade = true;
        }
      }
    } else if (editingSection === 'professionalSummary') {
      if (input.includes('replace') || input.includes('change to')) {
        const newSummary = userInput.replace(/.*?(replace|change to)\s*/i, '');
        updatedData.professionalSummary = newSummary;
        changesMade = true;
      } else if (input.includes('add')) {
        const addition = userInput.replace(/.*?add\s*/i, '');
        updatedData.professionalSummary = (collectedData.professionalSummary || '') + ' ' + addition;
        changesMade = true;
      }
    } else if (editingSection === 'skills') {
      if (input.includes('add')) {
        const newSkills = userInput.replace(/.*?add\s*/i, '');
        updatedData.skills = (collectedData.skills || '') + '\n' + newSkills;
        changesMade = true;
      } else if (input.includes('replace') || input.includes('change to')) {
        const newSkills = userInput.replace(/.*?(replace|change to)\s*/i, '');
        updatedData.skills = newSkills;
        changesMade = true;
      }
    }

    if (changesMade) {
      setCollectedData(updatedData);
      const updatedSectionInfo = displayCurrentSectionInfo(editingSection);
      addMessage('bot', `Perfect! I've updated your ${resumeSections.find(s => s.field === editingSection)?.name}. Here's the updated information:

${updatedSectionInfo}

Would you like to edit another section? (Yes/No)`);
      setEditingSection(null);
    } else {
      addMessage('bot', `I couldn't understand the specific changes you want to make. Could you please be more specific? For example:
- "Change name to John Doe"
- "Add skill: Python programming"
- "Replace summary with: [new summary]"`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    // Add user message
    addMessage('user', userMessage);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Handle edit mode
    if (isEditMode) {
      if (userMessage.toLowerCase() === 'no') {
        setIsEditMode(false);
        setEditingSection(null);
        addMessage('bot', "Great! Your resume has been updated. Here's your complete updated resume ready for preview.");
        
        setTimeout(() => {
          onComplete(collectedData);
          toast.success('Resume updated successfully!', {
            description: 'Your changes have been saved and your resume is ready for preview.'
          });
        }, 1500);
        setIsLoading(false);
        return;
      } else if (userMessage.toLowerCase() === 'yes' && !editingSection) {
        addMessage('bot', `Which section would you like to edit? Please enter the corresponding number:

${resumeSections.map(section => `${section.id}. ${section.name}`).join('\n')}`, 
        resumeSections.map(section => section.id.toString()));
        setIsLoading(false);
        return;
      }
      
      await handleEditModeInput(userMessage);
      setIsLoading(false);
      return;
    }

    // Handle additional information collection
    if (isCollectingAdditional) {
      if (userMessage.toLowerCase().includes('no') || userMessage.toLowerCase().includes('nothing') || userMessage.toLowerCase().includes('done')) {
        setIsCollectingAdditional(false);
        
        // Show template information
        setShowTemplateInfo(true);
        addMessage('bot', "Perfect! I have all the information I need. Now, let me tell you about our resume templates before I generate your professional resume templates for you to choose from.");
        
        addMessage('bot', `We offer several professional templates to showcase your experience:

1. Modern Minimalist - Clean design perfect for tech and creative roles
2. Traditional Corporate - Professional layout for corporate positions
3. Executive Premium - Sophisticated design for leadership roles
4. Technical Specialist - Optimized for technical positions
5. Entry Level Fresh - Perfect for new graduates

All templates are ATS-optimized to ensure your resume passes through applicant tracking systems. Would you like to see all templates or should I recommend the best one for your background?`, 
        ['Show all templates', 'Recommend the best template', 'Continue to preview']);
        
        setIsLoading(false);
        return;
      }
      
      if (showTemplateInfo) {
        if (userMessage.toLowerCase().includes('show all') || userMessage.toLowerCase().includes('all templates')) {
          addMessage('bot', "Great! I'll show you all available templates. Let me generate your professional resume templates for you to choose from.");
        } else if (userMessage.toLowerCase().includes('recommend') || userMessage.toLowerCase().includes('best')) {
          // Simulate template recommendation based on job title
          const jobTitle = collectedData.jobTitle?.toLowerCase() || '';
          let recommendedTemplate = 'Modern Minimalist';
          
          if (jobTitle.includes('senior') || jobTitle.includes('director') || jobTitle.includes('manager')) {
            recommendedTemplate = 'Executive Premium';
          } else if (jobTitle.includes('engineer') || jobTitle.includes('developer') || jobTitle.includes('analyst')) {
            recommendedTemplate = 'Technical Specialist';
          } else if (jobTitle.includes('intern') || jobTitle.includes('assistant') || jobTitle.includes('junior')) {
            recommendedTemplate = 'Entry Level Fresh';
          }
          
          addMessage('bot', `Based on your background as a ${collectedData.jobTitle}, I recommend the "${recommendedTemplate}" template. It's designed to highlight your specific experience and skills effectively. Let me generate your professional resume templates for you to choose from.`);
        } else {
          addMessage('bot', "Perfect! Let me generate your professional resume templates for you to choose from.");
        }
        
        setTimeout(() => {
          onComplete(collectedData);
          toast.success('Resume data collected successfully!', {
            description: 'Now let\'s create your professional resume templates.'
          });
        }, 2000);
        setIsLoading(false);
        return;
      }
      
      const updatedData = processAdditionalInfo(userMessage);
      addMessage('bot', "Is there anything else you'd like to add to your resume? (certifications, projects, languages, achievements, etc.) If not, just say 'no' or 'done'.");
      setIsLoading(false);
      return;
    }

    // Handle regular chat flow
    if (currentStep < chatSteps.length) {
      const currentStepData = chatSteps[currentStep];
      
      // Validate input
      if (!currentStepData.validation(userMessage)) {
        addMessage('bot', `I'm sorry, but that doesn't look like a valid ${currentStepData.field.replace(/([A-Z])/g, ' $1').toLowerCase()}. Could you please try again?`, currentStepData.suggestions);
        setIsLoading(false);
        return;
      }

      // Update collected data
      const updatedData = {
        ...collectedData,
        [currentStepData.field]: userMessage
      };
      setCollectedData(updatedData);

      // Move to next step or ask for additional info
      if (currentStep < chatSteps.length - 1) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        
        addMessage('bot', `Great! ${chatSteps[nextStep].question}`, chatSteps[nextStep].suggestions);
      } else {
        // All required info collected, ask for additional info
        setIsCollectingAdditional(true);
        addMessage('bot', "Excellent! I have all the required information. Would you like to add any additional information to your resume? This could include certifications, projects, languages, achievements, or any other relevant details.", 
        ['AWS Certified Solutions Architect', 'Built an e-commerce platform', 'Fluent in Spanish and French', 'No additional information']);
      }
    }

    setIsLoading(false);
  };

  const handleEditResume = () => {
    setIsEditMode(true);
    addMessage('bot', `I can help you edit your resume! Here are the sections available for editing:

${resumeSections.map(section => `${section.id}. ${section.name}`).join('\n')}

Which section would you like to edit? Please enter the corresponding number.`, 
    resumeSections.map(section => section.id.toString()));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-0 shadow-2xl bg-white dark:bg-gray-800 overflow-hidden">
        <CardContent className="p-0">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Resume Assistant</h3>
                  <p className="text-sm opacity-90">
                    {isEditMode ? 'Edit Mode - Modify your resume' : 
                     isCollectingAdditional ? 'Collecting additional information' :
                     'Let\'s build your perfect resume together'}
                  </p>
                </div>
              </div>
              
              {/* Edit Button */}
              {!isEditMode && !isCollectingAdditional && currentStep >= chatSteps.length && (
                <Button
                  onClick={handleEditResume}
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Resume
                </Button>
              )}
              
              {/* Template Button */}
              {!isEditMode && isCollectingAdditional && !showTemplateInfo && (
                <Button
                  onClick={() => setShowTemplateInfo(true)}
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <FileImage className="w-4 h-4 mr-2" />
                  View Templates
                </Button>
              )}
            </div>
            
            {/* Progress Bar */}
            {!isEditMode && !isCollectingAdditional && (
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{Math.round((currentStep / chatSteps.length) * 100)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <motion.div
                    className="bg-white rounded-full h-2"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / chatSteps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                      {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                      
                      {/* Suggestions */}
                      {message.suggestions && message.type === 'bot' && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs opacity-75">Quick suggestions:</p>
                          <div className="flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/20 text-xs"
                                onClick={() => handleSuggestionClick(suggestion)}
                              >
                                {suggestion.length > 30 ? `${suggestion.substring(0, 30)}...` : suggestion}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-gray-600 dark:text-gray-300" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-6">
            <form onSubmit={handleSubmit} className="flex space-x-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  isEditMode && editingSection 
                    ? "Describe the changes you want to make..."
                    : isEditMode 
                    ? "Enter section number (1-5)..."
                    : isCollectingAdditional
                    ? "Add any additional information or type 'done'..."
                    : "Type your response here..."
                }
                disabled={isLoading}
                className="flex-1"
                autoFocus
              />
              <Button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 px-6"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {isEditMode 
                ? "Edit mode: Make specific changes to your resume sections"
                : "Press Enter to send or click the suggestions above for quick responses"
              }
            </p>
            
            {/* Template Info Link */}
            {!isEditMode && currentStep >= chatSteps.length && (
              <div className="mt-4 text-center">
                <Link href="/templates">
                  <Button variant="link" size="sm" className="text-blue-600 dark:text-blue-400">
                    <FileImage className="w-4 h-4 mr-2" />
                    View all resume templates
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}