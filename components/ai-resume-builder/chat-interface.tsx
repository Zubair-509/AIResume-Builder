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
import { generateChatResponse, GeminiMessage, parseResumeData } from '@/lib/gemini-ai';

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [collectedData, setCollectedData] = useState<Partial<ResumeFormData>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isCollectingAdditional, setIsCollectingAdditional] = useState(false);
  const [showTemplateInfo, setShowTemplateInfo] = useState(false);
  const [chatHistory, setChatHistory] = useState<GeminiMessage[]>([]);
  const [isDataComplete, setIsDataComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat with a greeting
  useEffect(() => {
    const initializeChat = async () => {
      setIsLoading(true);
      try {
        const initialMessage: GeminiMessage = {
          role: 'user',
          parts: 'Hello, I need help building my resume.'
        };
        
        setChatHistory([initialMessage]);
        const response = await generateChatResponse([initialMessage]);
        
        setMessages([
          {
            id: '1',
            type: 'bot',
            content: response,
            timestamp: new Date(),
            suggestions: ['John Smith', 'Sarah Johnson', 'Michael Brown']
          }
        ]);
        
        setChatHistory(prev => [...prev, { role: 'model', parts: response }]);
      } catch (error) {
        console.error('Failed to initialize chat:', error);
        setMessages([
          {
            id: '1',
            type: 'bot',
            content: "Hi! I'm your AI resume assistant. I'll help you create a professional resume by asking you a few questions. Let's start with your basic information. What's your full name?",
            timestamp: new Date(),
            suggestions: ['John Smith', 'Sarah Johnson', 'Michael Brown']
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();
  }, []);

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

  const checkForCompleteData = (text: string): boolean => {
    // Check if the text contains a formatted resume or indicates completion
    return (
      text.includes("============================") ||
      text.includes("Here's your complete resume:") ||
      text.includes("I've compiled all your information") ||
      text.includes("SUMMARY") && text.includes("WORK EXPERIENCE") && text.includes("EDUCATION") && text.includes("SKILLS")
    );
  };

  const extractResumeData = async (resumeText: string) => {
    try {
      setIsLoading(true);
      // Try to parse the resume text into structured data
      const parsedData = await parseResumeData(resumeText);
      
      // Convert the parsed data to match our ResumeFormData structure
      const formattedData: Partial<ResumeFormData> = {
        fullName: parsedData.fullName,
        email: parsedData.email,
        phone: parsedData.phone,
        jobTitle: parsedData.jobTitle,
        professionalSummary: parsedData.professionalSummary,
        skills: Array.isArray(parsedData.skills) 
          ? parsedData.skills.join('\n') 
          : typeof parsedData.skills === 'string' 
            ? parsedData.skills.replace(/,\s*/g, '\n') 
            : '',
        workExperience: parsedData.workExperience?.map((exp: any) => ({
          id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
          company: exp.company,
          position: exp.position,
          startDate: exp.startDate,
          endDate: exp.endDate || '',
          current: exp.current || false,
          responsibilities: exp.responsibilities
        })) || [],
        education: parsedData.education?.map((edu: any) => ({
          id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
          institution: edu.institution,
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy,
          graduationDate: edu.graduationDate
        })) || []
      };
      
      setCollectedData(formattedData);
      return formattedData;
    } catch (error) {
      console.error('Failed to parse resume data:', error);
      // If parsing fails, return the current collected data
      return collectedData;
    } finally {
      setIsLoading(false);
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
    
    // Update chat history with user message
    const updatedHistory = [...chatHistory, { role: 'user', parts: userMessage }];
    setChatHistory(updatedHistory);

    try {
      // Get response from Gemini
      const response = await generateChatResponse(updatedHistory);
      
      // Add bot message
      addMessage('bot', response);
      
      // Update chat history with bot response
      setChatHistory([...updatedHistory, { role: 'model', parts: response }]);
      
      // Check if the response contains a complete resume
      if (checkForCompleteData(response)) {
        setIsDataComplete(true);
        const resumeData = await extractResumeData(response);
        
        setTimeout(() => {
          onComplete(resumeData);
          toast.success('Resume data collected successfully!', {
            description: 'Now let\'s create your professional resume templates.'
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to get AI response:', error);
      addMessage('bot', "I'm sorry, I encountered an error. Please try again or check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditResume = () => {
    setIsEditMode(true);
    addMessage('bot', `I can help you edit your resume! What would you like to change?`);
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
              {!isEditMode && !isCollectingAdditional && isDataComplete && (
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
                placeholder="Type your response here..."
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
            {!isEditMode && isDataComplete && (
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