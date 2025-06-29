'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Tag,
  FileText,
  DollarSign,
  Users,
  Download,
  Settings,
  Shield,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const faqCategories = [
    { id: 'general', name: 'General', icon: HelpCircle },
    { id: 'account', name: 'Account', icon: Users },
    { id: 'resume', name: 'Resume Builder', icon: FileText },
    { id: 'templates', name: 'Templates', icon: FileText },
    { id: 'billing', name: 'Billing', icon: DollarSign },
    { id: 'download', name: 'Export & Download', icon: Download },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield },
    { id: 'technical', name: 'Technical', icon: Settings }
  ];

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'What is SnapCV?',
      answer: 'SnapCV is an AI-powered resume builder that helps professionals create stunning, ATS-optimized resumes in minutes. Our platform combines cutting-edge AI technology with beautiful templates to help you stand out to employers and land your dream job.',
      category: 'general'
    },
    {
      id: '2',
      question: 'Is SnapCV free to use?',
      answer: 'SnapCV offers both free and premium plans. The free plan allows you to create and download a basic resume. Our premium plans offer additional features like multiple resume versions, advanced AI optimization, premium templates, and more customization options.',
      category: 'billing'
    },
    {
      id: '3',
      question: 'How do I create my first resume?',
      answer: 'To create your first resume, simply sign up for an account, then click on "Resume Builder" in the navigation menu. You can either start from scratch by filling out the form, or use our AI-powered builder to generate content based on your experience. Once complete, you can preview, customize, and download your resume.',
      category: 'resume'
    },
    {
      id: '4',
      question: 'Are SnapCV resumes ATS-friendly?',
      answer: 'Yes! All SnapCV templates are designed to be ATS (Applicant Tracking System) friendly. We use standard fonts, proper formatting, and keyword optimization to ensure your resume passes through automated screening systems and reaches human recruiters.',
      category: 'templates'
    },
    {
      id: '5',
      question: 'How do I download my resume?',
      answer: 'After creating your resume, click on the "Download" button in the preview section. You can download your resume in PDF format, which is the recommended format for job applications. Premium users can also export in additional formats like DOCX and HTML.',
      category: 'download'
    },
    {
      id: '6',
      question: 'Can I create multiple versions of my resume?',
      answer: 'Yes, with our premium plans, you can create multiple versions of your resume tailored to different job applications. This allows you to customize your resume for specific roles and industries, increasing your chances of getting interviews.',
      category: 'resume'
    },
    {
      id: '7',
      question: 'How does the AI resume builder work?',
      answer: 'Our AI resume builder uses advanced natural language processing to help you create professional content. Simply provide some basic information about your experience, and our AI will generate tailored bullet points, professional summaries, and skill suggestions that highlight your strengths and achievements.',
      category: 'resume'
    },
    {
      id: '8',
      question: 'Is my data secure with SnapCV?',
      answer: 'Absolutely. We take data security very seriously. All your personal information and resume data are encrypted and stored securely. We never share your information with third parties without your consent. You can learn more in our Privacy Policy.',
      category: 'privacy'
    },
    {
      id: '9',
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription at any time from your account settings. Go to "Account" > "Subscription" and click on "Cancel Subscription". Your premium features will remain active until the end of your current billing period.',
      category: 'billing'
    },
    {
      id: '10',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover) as well as PayPal for subscription payments. All payments are processed securely through our payment providers.',
      category: 'billing'
    },
    {
      id: '11',
      question: 'How do I edit my resume after creating it?',
      answer: 'You can edit your resume at any time by logging into your account and navigating to "My Resumes". Click on the resume you want to edit, and you\'ll be taken to the editor where you can make changes to your content, formatting, and template.',
      category: 'resume'
    },
    {
      id: '12',
      question: 'Can I share my resume online?',
      answer: 'Yes, premium users can generate a shareable link to their resume that can be sent to employers or included in job applications. This link can be password-protected and you can track when it\'s viewed.',
      category: 'download'
    },
    {
      id: '13',
      question: 'What if I forget my password?',
      answer: 'If you forget your password, click on "Login" and then "Forgot Password". Enter your email address, and we\'ll send you a link to reset your password. For security reasons, this link will expire after 24 hours.',
      category: 'account'
    },
    {
      id: '14',
      question: 'How do I contact customer support?',
      answer: 'You can contact our customer support team by visiting our Contact Support page. We aim to respond to all inquiries within 24-48 hours during business days.',
      category: 'general'
    },
    {
      id: '15',
      question: 'My resume isn\'t downloading correctly. What should I do?',
      answer: 'If you\'re experiencing issues with downloading your resume, try the following: 1) Make sure you\'re using an updated browser, 2) Clear your browser cache, 3) Try a different browser, 4) Check your internet connection. If the issue persists, please contact our support team.',
      category: 'technical'
    }
  ];

  const toggleItem = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const toggleCategory = (category: string) => {
    setActiveCategory(prev => prev === category ? null : category);
  };

  const filteredItems = faqItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === null || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge variant="outline" className="mb-4 px-4 py-2 text-blue-600 border-blue-200">
              Help & Support
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Questions</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about SnapCV's features, pricing, and how to get the most out of our platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search for answers..."
              className="pl-10 py-6 text-lg rounded-xl shadow-lg border-gray-200 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Browse by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Select a category to filter questions or use the search bar above to find specific answers.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {faqCategories.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Button
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={`w-full h-auto py-6 flex flex-col items-center justify-center space-y-3 rounded-xl border-2 transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400"
                  }`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className={`p-3 rounded-full ${
                    activeCategory === category.id
                      ? "bg-blue-500/20"
                      : "bg-blue-50 dark:bg-blue-900/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/30"
                  }`}>
                    <category.icon className={`w-6 h-6 ${
                      activeCategory === category.id
                        ? "text-white"
                        : "text-blue-600 dark:text-blue-400"
                    }`} />
                  </div>
                  <span className="font-medium">{category.name}</span>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <Card 
                  key={item.id}
                  className={`border-0 shadow-lg transition-all duration-300 ${
                    expandedItems.includes(item.id)
                      ? "shadow-xl"
                      : ""
                  }`}
                >
                  <CardContent className="p-0">
                    <button
                      className="w-full text-left p-6 flex justify-between items-start focus:outline-none"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={expandedItems.includes(item.id)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full mt-1">
                          <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                            {item.question}
                          </h3>
                          <div className="mt-2">
                            <Badge variant="outline" className="text-xs">
                              <Tag className="w-3 h-3 mr-1" />
                              {faqCategories.find(cat => cat.id === item.category)?.name}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {expandedItems.includes(item.id) ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </button>
                    
                    {expandedItems.includes(item.id) && (
                      <>
                        <Separator />
                        <div className="p-6 pt-4">
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-gray-600 dark:text-gray-300 leading-relaxed"
                          >
                            <p>{item.answer}</p>
                          </motion.div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We couldn't find any FAQs matching your search. Try different keywords or browse by category.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory(null);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              If you couldn't find the answer you were looking for, our support team is here to help.
            </p>
            <Link href="/support">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
              >
                <Zap className="w-5 h-5 mr-2" />
                Contact Support
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}