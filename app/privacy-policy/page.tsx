'use client';

import React from 'react';
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
  Linkedin,
  Mail
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const lastUpdated = 'May 15, 2024';  

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-blue-600 border-blue-200">
              Legal
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>
            <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 mb-6">
              <Clock className="w-4 h-4 mr-2" />
              Last Updated: {lastUpdated}
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              This Privacy Policy describes how SnapCV ("we", "our", or "us") collects, uses, and shares your personal information when you use our website and services.
            </p>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl">Table of Contents</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                  <a 
                    key={item.id}
                    href={`#${item.id}`}
                    className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* Information Collection */}
            <div id="information-collection" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <Database className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Information We Collect</h2>
              </div>
              
              <div className="pl-9">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Personal Information
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We may collect the following types of personal information:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Contact Information:</strong> Name, email address, phone number, and mailing address.</li>
                  <li><strong>Account Information:</strong> Username, password, and account preferences.</li>
                  <li><strong>Profile Information:</strong> Resume data, professional history, education, skills, and other information you provide for your resume.</li>
                  <li><strong>Payment Information:</strong> Credit card details, billing address, and other payment details (processed securely through our payment processors).</li>
                  <li><strong>Communication Information:</strong> Information you provide when contacting us or participating in surveys.</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Automatically Collected Information
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We automatically collect certain information when you visit our website:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Usage Data:</strong> Pages visited, time spent on pages, links clicked, and other actions taken on our website.</li>
                  <li><strong>Device Information:</strong> IP address, browser type, operating system, device type, and screen resolution.</li>
                  <li><strong>Location Information:</strong> General location based on IP address.</li>
                </ul>
              </div>
              
              <Separator className="my-8" />
            </div>

            {/* Information Use */}
            <div id="information-use" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. How We Use Your Information</h2>
              </div>
              
              <div className="pl-9">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Providing Services:</strong> To create and manage your account, provide our resume building services, process payments, and fulfill your requests.</li>
                  <li><strong>Personalization:</strong> To personalize your experience, recommend features, and provide tailored content.</li>
                  <li><strong>Communication:</strong> To communicate with you about your account, respond to inquiries, and send service-related announcements.</li>
                  <li><strong>Marketing:</strong> To send promotional emails about new features, special offers, or other information we think you may find interesting (with your consent where required by law).</li>
                  <li><strong>Improvement:</strong> To improve our website, services, and user experience based on the information and feedback we receive from you.</li>
                  <li><strong>Security:</strong> To detect, prevent, and address technical issues, fraud, or other illegal activities.</li>
                  <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, legal processes, or enforceable governmental requests.</li>
                </ul>
              </div>
              
              <Separator className="my-8" />
            </div>

            {/* Information Sharing */}
            <div id="information-sharing" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <UserCheck className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Information Sharing and Disclosure</h2>
              </div>
              
              <div className="pl-9">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We may share your personal information in the following situations:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service.</li>
                  <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
                  <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</li>
                  <li><strong>Protection of Rights:</strong> We may disclose your information to protect our rights, privacy, safety, or property, and that of our users or others.</li>
                </ul>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We do not sell, rent, or lease your personal information to third parties without your consent.
                </p>
              </div>
              
              <Separator className="my-8" />
            </div>

            {/* Cookies */}
            <div id="cookies" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <Cookie className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. Cookies and Tracking Technologies</h2>
              </div>
              
              <div className="pl-9">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Types of Cookies We Use
                </h3>
                <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Essential Cookies:</strong> Necessary for the website to function properly.</li>
                  <li><strong>Preference Cookies:</strong> Allow the website to remember choices you make and provide enhanced features.</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
                  <li><strong>Marketing Cookies:</strong> Used to track visitors across websites to display relevant advertisements.</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Your Cookie Choices
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Most web browsers allow you to control cookies through their settings. However, if you reject cookies, you may still use our website, but your ability to use some features may be limited.
                </p>
              </div>
              
              <Separator className="my-8" />
            </div>

            {/* Data Security */}
            <div id="data-security" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Data Security</h2>
              </div>
              
              <div className="pl-9">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our security measures include:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Encryption of sensitive data</li>
                  <li>Regular security assessments</li>
                  <li>Access controls and authentication procedures</li>
                  <li>Secure data storage practices</li>
                  <li>Regular security training for our staff</li>
                </ul>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-6">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                    <p className="text-yellow-700 dark:text-yellow-400">
                      While we strive to protect your personal information, we cannot guarantee the absolute security of your data. If you have reason to believe that your interaction with us is no longer secure, please contact us immediately.
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator className="my-8" />
            </div>

            {/* User Rights */}
            <div id="user-rights" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">6. Your Rights and Choices</h2>
              </div>
              
              <div className="pl-9">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Access:</strong> You have the right to request copies of your personal information.</li>
                  <li><strong>Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
                  <li><strong>Erasure:</strong> You have the right to request that we erase your personal information under certain conditions.</li>
                  <li><strong>Restriction:</strong> You have the right to request that we restrict the processing of your personal information under certain conditions.</li>
                  <li><strong>Object:</strong> You have the right to object to our processing of your personal information under certain conditions.</li>
                  <li><strong>Data Portability:</strong> You have the right to request that we transfer the data we have collected to another organization or directly to you under certain conditions.</li>
                </ul>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  To exercise any of these rights, please contact us using the contact information provided at the end of this policy. We may ask you to verify your identity before responding to such requests.
                </p>
              </div>
              
              <Separator className="my-8" />
            </div>

            {/* Children's Privacy */}
            <div id="children" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">7. Children's Privacy</h2>
              </div>
              
              <div className="pl-9">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal information from a child under 16 without verification of parental consent, we will take steps to remove that information from our servers.
                </p>
              </div>
              
              <Separator className="my-8" />
            </div>

            {/* International Data Transfers */}
            <div id="international" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <Globe className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">8. International Data Transfers</h2>
              </div>
              
              <div className="pl-9">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Your information may be transferred to and processed in countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Specifically, our servers are located in the United States, and our service providers and partners operate around the world. This means that when we collect your personal information, we may process it in any of these countries.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  However, we have taken appropriate safeguards to require that your personal information will remain protected in accordance with this Privacy Policy. These include implementing the European Commission's Standard Contractual Clauses for transfers of personal information between our group companies and third-party service providers, which require all companies to protect personal information they process from the EEA in accordance with European Union data protection law.
                </p>
              </div>
              
              <Separator className="my-8" />
            </div>

            {/* Changes to Privacy Policy */}
            <div id="changes" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">9. Changes to This Privacy Policy</h2>
              </div>
              
              <div className="pl-9">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this page.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  For significant changes, we will make reasonable efforts to provide notification through our website or by sending you an email.
                </p>
              </div>
              
              <Separator className="my-8" />
            </div>

            {/* Contact Us */}
            <div id="contact" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">10. Contact Us</h2>
              </div>
              
              <div className="pl-9">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
                </p>
                
                <ul className="list-none mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>
                    <strong>Mail:</strong> SnapCV Privacy Team, 123 Innovation Way, Karachi, Sindh, Pakistan
                  </li>
                  <li>
                    <strong>Project Lead:</strong> <a href="https://www.linkedin.com/in/zubairabid509" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Muhammad Zubair on LinkedIn</a>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <Link href="/contact">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}