'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  UserCheck, 
  FileText, 
  Cookie,
  AlertTriangle,
  Clock,
  Globe,
  Mail
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const lastUpdated = 'May 15, 2024';
  
  // Create refs for each section to track when they come into view
  const headerRef = useRef<HTMLElement>(null);
  const tocRef = useRef<HTMLElement>(null);
  const sections = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  
  // Check if sections are in view
  const headerInView = useInView(headerRef, { once: false, amount: 0.3 });
  const tocInView = useInView(tocRef, { once: false, amount: 0.3 });
  const sectionsInView = sections.map(ref => useInView(ref, { once: false, amount: 0.2 }));
  
  // Scroll-based animations
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);
  const headerY = useTransform(scrollY, [0, 300], [0, 50]);

  // Animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const fadeInLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const staggerContainerVariants = {
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
      
      {/* Header */}
      <section 
        ref={headerRef} 
        className="pt-24 pb-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 relative overflow-hidden"
      >
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
          />
        </motion.div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={fadeInUpVariants}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Badge variant="outline" className="mb-4 px-4 py-2 text-blue-600 border-blue-200">
                Legal
              </Badge>
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              <motion.span
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                Privacy Policy
              </motion.span>
            </h1>
            <motion.div 
              className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Clock className="w-4 h-4 mr-2" />
              Last Updated: {lastUpdated}
            </motion.div>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUpVariants}
            >
              This Privacy Policy describes how SnapCV ("we", "our", or "us") collects, uses, and shares your personal information when you use our website and services.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section ref={tocRef} className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={tocInView ? "visible" : "hidden"}
            variants={fadeInLeftVariants}
          >
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <motion.nav 
                  className="grid grid-cols-1 md:grid-cols-2 gap-2"
                  variants={staggerContainerVariants}
                  initial="hidden"
                  animate={tocInView ? "visible" : "hidden"}
                >
                  {[
                    { id: 'information-collection', title: '1. Information We Collect' },
                    { id: 'information-use', title: '2. How We Use Your Information' },
                    { id: 'information-sharing', title: '3. Information Sharing and Disclosure' },
                    { id: 'cookies', title: '4. Cookies and Tracking Technologies' },
                    { id: 'data-security', title: '5. Data Security' },
                    { id: 'user-rights', title: '6. Your Rights and Choices' },
                    { id: 'children', title: '7. Children\'s Privacy' },
                    { id: 'international', title: '8. International Data Transfers' },
                    { id: 'changes', title: '9. Changes to This Privacy Policy' },
                    { id: 'contact', title: '10. Contact Us' }
                  ].map((item) => (
                    <motion.a 
                      key={item.id}
                      href={`#${item.id}`}
                      className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.03, 
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        color: "#3b82f6",
                        transition: { duration: 0.2 }
                      }}
                    >
                      {item.title}
                    </motion.a>
                  ))}
                </motion.nav>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            {/* Information Collection */}
            <div id="information-collection" className="scroll-mt-24" ref={sections[0]}>
              <motion.div 
                className="flex items-center mb-4"
                initial="hidden"
                animate={sectionsInView[0] ? "visible" : "hidden"}
                variants={fadeInLeftVariants}
              >
                <Database className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Information We Collect</h2>
              </motion.div>
              
              <motion.div 
                className="pl-9"
                initial="hidden"
                animate={sectionsInView[0] ? "visible" : "hidden"}
                variants={staggerContainerVariants}
              >
                <motion.h3 
                  className="text-xl font-semibold text-gray-900 dark:text-white mb-3"
                  variants={itemVariants}
                >
                  Personal Information
                </motion.h3>
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  variants={itemVariants}
                >
                  We may collect the following types of personal information:
                </motion.p>
                <motion.ul 
                  className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2"
                  variants={staggerContainerVariants}
                >
                  <motion.li variants={itemVariants}><strong>Contact Information:</strong> Name, email address, phone number, and mailing address.</motion.li>
                  <motion.li variants={itemVariants}><strong>Account Information:</strong> Username, password, and account preferences.</motion.li>
                  <motion.li variants={itemVariants}><strong>Profile Information:</strong> Resume data, professional history, education, skills, and other information you provide for your resume.</motion.li>
                  <motion.li variants={itemVariants}><strong>Payment Information:</strong> Credit card details, billing address, and other payment details (processed securely through our payment processors).</motion.li>
                  <motion.li variants={itemVariants}><strong>Communication Information:</strong> Information you provide when contacting us or participating in surveys.</motion.li>
                </motion.ul>

                <motion.h3 
                  className="text-xl font-semibold text-gray-900 dark:text-white mb-3"
                  variants={itemVariants}
                >
                  Automatically Collected Information
                </motion.h3>
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  variants={itemVariants}
                >
                  We automatically collect certain information when you visit our website:
                </motion.p>
                <motion.ul 
                  className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2"
                  variants={staggerContainerVariants}
                >
                  <motion.li variants={itemVariants}><strong>Usage Data:</strong> Pages visited, time spent on pages, links clicked, and other actions taken on our website.</motion.li>
                  <motion.li variants={itemVariants}><strong>Device Information:</strong> IP address, browser type, operating system, device type, and screen resolution.</motion.li>
                  <motion.li variants={itemVariants}><strong>Location Information:</strong> General location based on IP address.</motion.li>
                </motion.ul>
              </motion.div>
              
              <Separator className="my-8" />
            </div>

            {/* Information Use */}
            <div id="information-use" className="scroll-mt-24" ref={sections[1]}>
              <motion.div 
                className="flex items-center mb-4"
                initial="hidden"
                animate={sectionsInView[1] ? "visible" : "hidden"}
                variants={fadeInLeftVariants}
              >
                <Eye className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. How We Use Your Information</h2>
              </motion.div>
              
              <motion.div 
                className="pl-9"
                initial="hidden"
                animate={sectionsInView[1] ? "visible" : "hidden"}
                variants={staggerContainerVariants}
              >
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  variants={itemVariants}
                >
                  We use the information we collect for various purposes, including:
                </motion.p>
                <motion.ul 
                  className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2"
                  variants={staggerContainerVariants}
                >
                  <motion.li variants={itemVariants}><strong>Providing Services:</strong> To create and manage your account, provide our resume building services, process payments, and fulfill your requests.</motion.li>
                  <motion.li variants={itemVariants}><strong>Personalization:</strong> To personalize your experience, recommend features, and provide tailored content.</motion.li>
                  <motion.li variants={itemVariants}><strong>Communication:</strong> To communicate with you about your account, respond to inquiries, and send service-related announcements.</motion.li>
                  <motion.li variants={itemVariants}><strong>Marketing:</strong> To send promotional emails about new features, special offers, or other information we think you may find interesting (with your consent where required by law).</motion.li>
                  <motion.li variants={itemVariants}><strong>Improvement:</strong> To improve our website, services, and user experience based on the information and feedback we receive from you.</motion.li>
                  <motion.li variants={itemVariants}><strong>Security:</strong> To detect, prevent, and address technical issues, fraud, or other illegal activities.</motion.li>
                  <motion.li variants={itemVariants}><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, legal processes, or enforceable governmental requests.</motion.li>
                </motion.ul>
              </motion.div>
              
              <Separator className="my-8" />
            </div>

            {/* Information Sharing */}
            <div id="information-sharing" className="scroll-mt-24" ref={sections[2]}>
              <motion.div 
                className="flex items-center mb-4"
                initial="hidden"
                animate={sectionsInView[2] ? "visible" : "hidden"}
                variants={fadeInLeftVariants}
              >
                <UserCheck className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Information Sharing and Disclosure</h2>
              </motion.div>
              
              <motion.div 
                className="pl-9"
                initial="hidden"
                animate={sectionsInView[2] ? "visible" : "hidden"}
                variants={staggerContainerVariants}
              >
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  variants={itemVariants}
                >
                  We may share your personal information in the following situations:
                </motion.p>
                <motion.ul 
                  className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2"
                  variants={staggerContainerVariants}
                >
                  <motion.li variants={itemVariants}><strong>Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service.</motion.li>
                  <motion.li variants={itemVariants}><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</motion.li>
                  <motion.li variants={itemVariants}><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</motion.li>
                  <motion.li variants={itemVariants}><strong>Protection of Rights:</strong> We may disclose your information to protect our rights, privacy, safety, or property, and that of our users or others.</motion.li>
                </motion.ul>
                
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  variants={itemVariants}
                >
                  We do not sell, rent, or lease your personal information to third parties without your consent.
                </motion.p>
              </motion.div>
              
              <Separator className="my-8" />
            </div>

            {/* Cookies */}
            <div id="cookies" className="scroll-mt-24" ref={sections[3]}>
              <motion.div 
                className="flex items-center mb-4"
                initial="hidden"
                animate={sectionsInView[3] ? "visible" : "hidden"}
                variants={fadeInLeftVariants}
              >
                <Cookie className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. Cookies and Tracking Technologies</h2>
              </motion.div>
              
              <motion.div 
                className="pl-9"
                initial="hidden"
                animate={sectionsInView[3] ? "visible" : "hidden"}
                variants={staggerContainerVariants}
              >
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  variants={itemVariants}
                >
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
                </motion.p>
                
                <motion.h3 
                  className="text-xl font-semibold text-gray-900 dark:text-white mb-3"
                  variants={itemVariants}
                >
                  Types of Cookies We Use
                </motion.h3>
                <motion.ul 
                  className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2"
                  variants={staggerContainerVariants}
                >
                  <motion.li variants={itemVariants}><strong>Essential Cookies:</strong> Necessary for the website to function properly.</motion.li>
                  <motion.li variants={itemVariants}><strong>Preference Cookies:</strong> Allow the website to remember choices you make and provide enhanced features.</motion.li>
                  <motion.li variants={itemVariants}><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</motion.li>
                  <motion.li variants={itemVariants}><strong>Marketing Cookies:</strong> Used to track visitors across websites to display relevant advertisements.</motion.li>
                </motion.ul>
                
                <motion.h3 
                  className="text-xl font-semibold text-gray-900 dark:text-white mb-3"
                  variants={itemVariants}
                >
                  Your Cookie Choices
                </motion.h3>
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  variants={itemVariants}
                >
                  Most web browsers allow you to control cookies through their settings. However, if you reject cookies, you may still use our website, but your ability to use some features may be limited.
                </motion.p>
              </motion.div>
              
              <Separator className="my-8" />
            </div>

            {/* Data Security */}
            <div id="data-security" className="scroll-mt-24" ref={sections[4]}>
              <motion.div 
                className="flex items-center mb-4"
                initial="hidden"
                animate={sectionsInView[4] ? "visible" : "hidden"}
                variants={fadeInLeftVariants}
              >
                <Lock className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Data Security</h2>
              </motion.div>
              
              <motion.div 
                className="pl-9"
                initial="hidden"
                animate={sectionsInView[4] ? "visible" : "hidden"}
                variants={staggerContainerVariants}
              >
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  variants={itemVariants}
                >
                  We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.
                </motion.p>
                
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  variants={itemVariants}
                >
                  Our security measures include:
                </motion.p>
                <motion.ul 
                  className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2"
                  variants={staggerContainerVariants}
                >
                  <motion.li variants={itemVariants}>Encryption of sensitive data</motion.li>
                  <motion.li variants={itemVariants}>Regular security assessments</motion.li>
                  <motion.li variants={itemVariants}>Access controls and authentication procedures</motion.li>
                  <motion.li variants={itemVariants}>Secure data storage practices</motion.li>
                  <motion.li variants={itemVariants}>Regular security training for our staff</motion.li>
                </motion.ul>
                
                <motion.div 
                  className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-6"
                  variants={itemVariants}
                  whileHover={{ 
                    x: 5,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                    <p className="text-yellow-700 dark:text-yellow-400">
                      While we strive to protect your personal information, we cannot guarantee the absolute security of your data. If you have reason to believe that your interaction with us is no longer secure, please contact us immediately.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
              
              <Separator className="my-8" />
            </div>

            {/* User Rights */}
            <div id="user-rights" className="scroll-mt-24" ref={sections[5]}>
              <motion.div 
                className="flex items-center mb-4"
                initial="hidden"
                animate={sectionsInView[5] ? "visible" : "hidden"}
                variants={fadeInLeftVariants}
              >
                <Shield className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">6. Your Rights and Choices</h2>
              </motion.div>
              
              <motion.div 
                className="pl-9"
                initial="hidden"
                animate={sectionsInView[5] ? "visible" : "hidden"}
                variants={staggerContainerVariants}
              >
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  variants={itemVariants}
                >
                  Depending on your location, you may have certain rights regarding your personal information:
                </motion.p>
                <motion.ul 
                  className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2"
                  variants={staggerContainerVariants}
                >
                  <motion.li variants={itemVariants}><strong>Access:</strong> You have the right to request copies of your personal information.</motion.li>
                  <motion.li variants={itemVariants}><strong>Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</motion.li>
                  <motion.li variants={itemVariants}><strong>Erasure:</strong> You have the right to request that we erase your personal information under certain conditions.</motion.li>
                  <motion.li variants={itemVariants}><strong>Restriction:</strong> You have the right to request that we restrict the processing of your personal information under certain conditions.</motion.li>
                  <motion.li variants={itemVariants}><strong>Object:</strong> You have the right to object to our processing of your personal information under certain conditions.</motion.li>
                  <motion.li variants={itemVariants}><strong>Data Portability:</strong> You have the right to request that we transfer the data we have collected to another organization or directly to you under certain conditions.</motion.li>
                </motion.ul>
                
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  variants={itemVariants}
                >
                  To exercise any of these rights, please contact us using the contact information provided at the end of this policy. We may ask you to verify your identity before responding to such requests.
                </motion.p>
              </motion.div>
              
              <Separator className="my-8" />
            </div>

            {/* Children's Privacy */}
            <div id="children" className="scroll-mt-24" ref={sections[6]}>
              <motion.div 
                className="flex items-center mb-4"
                initial="hidden"
                animate={sectionsInView[6] ? "visible" : "hidden"}
                variants={fadeInLeftVariants}
              >
                <AlertTriangle className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">7. Children's Privacy</h2>
              </motion.div>
              
              <motion.div 
                className="pl-9"
                initial="hidden"
                animate={sectionsInView[6] ? "visible" : "hidden"}
                variants={fadeInUpVariants}
              >
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  variants={itemVariants}
                >
                  Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal information from a child under 16 without verification of parental consent, we will take steps to remove that information from our servers.
                </motion.p>
              </motion.div>
              
              <Separator className="my-8" />
            </div>

            {/* International Data Transfers */}
            <div id="international" className="scroll-mt-24" ref={sections[7]}>
              <motion.div 
                className="flex items-center mb-4"
                initial="hidden"
                animate={sectionsInView[7] ? "visible" : "hidden"}
                variants={fadeInLeftVariants}
              >
                <Globe className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">8. International Data Transfers</h2>
              </motion.div>
              
              <motion.div 
                className="pl-9"
                initial="hidden"
                animate={sectionsInView[7] ? "visible" : "hidden"}
                variants={staggerContainerVariants}
              >
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  variants={itemVariants}
                >
                  Your information may be transferred to and processed in countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country.
                </motion.p>
                
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  variants={itemVariants}
                >
                  Specifically, our servers are located in the United States, and our service providers and partners operate around the world. This means that when we collect your personal information, we may process it in any of these countries.
                </motion.p>
                
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  variants={itemVariants}
                >
                  However, we have taken appropriate safeguards to require that your personal information will remain protected in accordance with this Privacy Policy. These include implementing the European Commission's Standard Contractual Clauses for transfers of personal information between our group companies and third-party service providers, which require all companies to protect personal information they process from the EEA in accordance with European Union data protection law.
                </motion.p>
              </motion.div>
              
              <Separator className="my-8" />
            </div>

            {/* Changes to Privacy Policy */}
            <div id="changes" className="scroll-mt-24" ref={sections[8]}>
              <motion.div 
                className="flex items-center mb-4"
                initial="hidden"
                animate={sectionsInView[8] ? "visible" : "hidden"}
                variants={fadeInLeftVariants}
              >
                <FileText className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">9. Changes to This Privacy Policy</h2>
              </motion.div>
              
              <motion.div 
                className="pl-9"
                initial="hidden"
                animate={sectionsInView[8] ? "visible" : "hidden"}
                variants={staggerContainerVariants}
              >
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  variants={itemVariants}
                >
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this page.
                </motion.p>
                
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  variants={itemVariants}
                >
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </motion.p>
                
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  variants={itemVariants}
                >
                  For significant changes, we will make reasonable efforts to provide notification through our website or by sending you an email.
                </motion.p>
              </motion.div>
              
              <Separator className="my-8" />
            </div>

            {/* Contact Us */}
            <div id="contact" className="scroll-mt-24" ref={sections[9]}>
              <motion.div 
                className="flex items-center mb-4"
                initial="hidden"
                animate={sectionsInView[9] ? "visible" : "hidden"}
                variants={fadeInLeftVariants}
              >
                <Mail className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">10. Contact Us</h2>
              </motion.div>
              
              <motion.div 
                className="pl-9"
                initial="hidden"
                animate={sectionsInView[9] ? "visible" : "hidden"}
                variants={staggerContainerVariants}
              >
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  variants={itemVariants}
                >
                  If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
                </motion.p>
                
                <motion.ul 
                  className="list-none mb-6 text-gray-700 dark:text-gray-300 space-y-2"
                  variants={staggerContainerVariants}
                >
                  <motion.li 
                    variants={itemVariants}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <strong>Mail:</strong> SnapCV Privacy Team, 123 Innovation Way, Karachi, Sindh, Pakistan
                  </motion.li>
                  <motion.li 
                    variants={itemVariants}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <strong>Project Lead:</strong> <a href="https://www.linkedin.com/in/zubairabid509" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Muhammad Zubair on LinkedIn</a>
                  </motion.li>
                </motion.ul>
                
                <motion.div 
                  className="mt-8"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                >
                  <Link href="/contact">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Contact Us
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}