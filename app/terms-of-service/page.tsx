'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { 
  FileText, 
  Shield, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  XCircle,
  Scale,
  Globe,
  Mail,
  Lock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TermsOfServicePage() {
  const lastUpdated = 'May 15, 2024';

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge variant="outline" className="mb-4 px-4 py-2 text-blue-600 border-blue-200">
              Legal
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Terms of Service
            </h1>
            <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 mb-6">
              <Clock className="w-4 h-4 mr-2" />
              Last Updated: {lastUpdated}
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Please read these Terms of Service carefully before using the SnapCV website and services. By accessing or using our service, you agree to be bound by these Terms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h2>
                <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    { id: 'agreement', title: '1. Agreement to Terms' },
                    { id: 'account', title: '2. Account Registration and Security' },
                    { id: 'services', title: '3. Services and Subscription' },
                    { id: 'user-content', title: '4. User Content' },
                    { id: 'prohibited', title: '5. Prohibited Activities' },
                    { id: 'intellectual-property', title: '6. Intellectual Property Rights' },
                    { id: 'termination', title: '7. Termination' },
                    { id: 'disclaimers', title: '8. Disclaimers and Limitations' },
                    { id: 'indemnification', title: '9. Indemnification' },
                    { id: 'governing-law', title: '10. Governing Law' },
                    { id: 'changes', title: '11. Changes to Terms' },
                    { id: 'contact', title: '12. Contact Us' }
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
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            {/* Agreement to Terms */}
            <div id="agreement" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Agreement to Terms</h2>
              </div>
              
              <div className="pl-9">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  By accessing or using the SnapCV website, mobile applications, or any other services provided by SnapCV (collectively, the "Services"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing the Services.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  These Terms of Service constitute a legally binding agreement between you and SnapCV regarding your use of the Services. You must be at least 16 years old to use our Services.
                </p>
              </div>
              
              <Separator className="my-8" />
            </div>

            {/* Account Registration */}
            <div id="account" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Account Registration and Security</h2>
              </div>
              
              <div className="pl-9">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Account Creation</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  To access certain features of our Services, you may be required to register for an account. When you register, you agree to provide accurate, current, and complete information about yourself and to update this information to keep it accurate, current, and complete.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Account Security</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  You are responsible for:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Maintaining the confidentiality of your account password and any other credentials used to access your account.</li>
                  <li>All activities that occur under your account.</li>
                  <li>Notifying us immediately of any unauthorized use of your account or any other breach of security.</li>
                </ul>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We reserve the right to disable any user account if, in our opinion, you have violated any provision of these Terms of Service.
                </p>
              </div>
              
              <Separator className="my-8" />
            </div>

            {/* Services and Subscription */}
            <div id="services" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Services and Subscription</h2>
              </div>
              
              <div className="pl-9">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Service Description</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  SnapCV provides resume creation, editing, and optimization services, including AI-powered content generation, template selection, and formatting tools. The specific features and functionality may vary based on your subscription level.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Subscription Terms</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Some of our Services are offered on a subscription basis. By subscribing to our Services:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>You agree to pay the subscription fees as described at the time of purchase.</li>
                  <li>Subscriptions automatically renew for the same subscription period unless canceled before the renewal date.</li>
                  <li>You can cancel your subscription at any time through your account settings or by contacting us.</li>
                  <li>We reserve the right to change subscription fees upon reasonable notice.</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Free Trial</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We may offer free trials of our subscription services. At the end of the free trial period, you will be automatically charged the applicable subscription fee unless you cancel before the trial ends.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Refund Policy</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We offer a 14-day money-back guarantee for new subscriptions. If you are not satisfied with our Services, you may request a refund within 14 days of your initial purchase by contacting our support team.
                </p>
              </div>
              
              <Separator className="my-8" />
            </div>

            {/* User Content */}
            <div id="user-content" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. User Content</h2>
              </div>
              
              <div className="pl-9">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Content Ownership</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  You retain all ownership rights to the content you submit to our Services, including your resume data, personal information, and any other materials you upload or create using our platform ("User Content").
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">License Grant</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  By submitting User Content to our Services, you grant SnapCV a worldwide, non-exclusive, royalty-free license to use, store, display, reproduce, and modify your User Content solely for the purpose of providing and improving our Services.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Content Restrictions</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  You agree not to submit User Content that:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Infringes on the intellectual property rights or other rights of any third party.</li>
                  <li>Contains false, misleading, or deceptive information.</li>
                  <li>Violates any applicable law, regulation, or these Terms of Service.</li>
                  <li>Contains viruses, malware, or other harmful code.</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Content Removal</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We reserve the right to remove any User Content that violates these Terms of Service or that we find objectionable for any reason, without prior notice.
                </p>
              </div>
              
              <Separator className="my-8" />
            </div>

            {/* Prohibited Activities */}
            <div id="prohibited" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <XCircle className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Prohibited Activities</h2>
              </div>
              
              <div className="pl-9">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  You agree not to engage in any of the following prohibited activities:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Using the Services for any illegal purpose or in violation of any local, state, national, or international law.</li>
                  <li>Attempting to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Services.</li>
                  <li>Using the Services to send unsolicited or unauthorized advertising, promotional materials, spam, junk mail, chain letters, or any other form of duplicative or unsolicited messages.</li>
                  <li>Uploading or transmitting viruses, malware, or any other type of malicious code that will or may impact the functionality of the Services.</li>
                  <li>Impersonating another person or entity, or falsely stating or misrepresenting your affiliation with a person or entity.</li>
                  <li>Harvesting or collecting email addresses or other contact information of other users from the Services.</li>
                  <li>Interfering with or disrupting the Services or servers or networks connected to the Services.</li>
                  <li>Bypassing measures we may use to prevent or restrict access to the Services.</li>
                </ul>
              </div>
              
              <Separator className="my-8" />
            </div>

            {/* Intellectual Property */}
            <div id="intellectual-property" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">6. Intellectual Property Rights</h2>
              </div>
              
              <div className="pl-9">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Our Intellectual Property</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The Services and their original content (excluding User Content), features, and functionality are and will remain the exclusive property of SnapCV and its licensors. The Services are protected by copyright, trademark, and other laws of both the United States and foreign countries.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">License to Use Services</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Subject to these Terms of Service, we grant you a limited, non-exclusive, non-transferable, and revocable license to use the Services for your personal, non-commercial use.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Feedback</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If you provide us with any feedback or suggestions regarding the Services ("Feedback"), you hereby assign to us all rights in such Feedback and agree that we shall have the right to use and fully exploit such Feedback in any manner we deem appropriate.
                </p>
              </div>
              
              <Separator className="my-8" />
            </div>

            {/* Termination */}
            <div id="termination" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <XCircle className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">7. Termination</h2>
              </div>
              
              <div className="pl-9">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Termination by You</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  You may terminate your account at any time by following the instructions on our website or by contacting us. Upon termination, your right to use the Services will immediately cease.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Termination by Us</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We may terminate or suspend your account and access to the Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Service.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Effect of Termination</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Upon termination:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Your access to the Services will cease.</li>
                  <li>We may delete your account and all associated data after a reasonable period.</li>
                  <li>Any provisions of these Terms of Service that by their nature should survive termination shall survive termination.</li>
                </ul>
              </div>
              
              <Separator className="my-8" />
            </div>

            {/* Disclaimers and Limitations */}
            <div id="disclaimers" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">8. Disclaimers and Limitations</h2>
              </div>
              
              <div className="pl-9">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Disclaimer of Warranties</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  SNAPCV AND ITS AFFILIATES, LICENSORS, AND SERVICE PROVIDERS DO NOT WARRANT THAT:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>THE SERVICES WILL FUNCTION UNINTERRUPTED, SECURE, OR AVAILABLE AT ANY PARTICULAR TIME OR LOCATION;</li>
                  <li>ANY ERRORS OR DEFECTS WILL BE CORRECTED;</li>
                  <li>THE SERVICES ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS;</li>
                  <li>THE RESULTS OF USING THE SERVICES WILL MEET YOUR REQUIREMENTS.</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Limitation of Liability</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL SNAPCV, ITS AFFILIATES, DIRECTORS, EMPLOYEES, AGENTS, LICENSORS, OR SERVICE PROVIDERS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, THAT RESULT FROM THE USE OF, OR INABILITY TO USE, THE SERVICES.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  IN NO EVENT WILL SNAPCV'S TOTAL LIABILITY TO YOU FOR ALL CLAIMS, DAMAGES, LOSSES, AND CAUSES OF ACTION ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR USE OF THE SERVICES EXCEED THE AMOUNT YOU HAVE PAID TO SNAPCV FOR THE SERVICES IN THE PAST TWELVE (12) MONTHS, OR ONE HUNDRED DOLLARS ($100) IF YOU HAVE NOT HAD ANY PAYMENT OBLIGATIONS TO SNAPCV.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR THE LIMITATION OR EXCLUSION OF LIABILITY FOR CERTAIN TYPES OF DAMAGES. THEREFORE, SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
                </p>
              </div>
              
              <Separator className="my-8" />
            </div>

            {/* Indemnification */}
            <div id="indemnification" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">9. Indemnification</h2>
              </div>
              
              <div className="pl-9">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  You agree to defend, indemnify, and hold harmless SnapCV, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Your violation of these Terms of Service;</li>
                  <li>Your User Content;</li>
                  <li>Your use of the Services;</li>
                  <li>Your violation of any third-party right, including without limitation any intellectual property right, publicity, confidentiality, property, or privacy right.</li>
                </ul>
              </div>
              
              <Separator className="my-8" />
            </div>

            {/* Governing Law */}
            <div id="governing-law" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <Scale className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">10. Governing Law</h2>
              </div>
              
              <div className="pl-9">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  These Terms of Service and your use of the Services shall be governed by and construed in accordance with the laws of the State of California, without giving effect to any choice or conflict of law provision or rule.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Dispute Resolution</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Any legal action or proceeding arising out of or relating to these Terms of Service or the Services shall be exclusively brought in the federal or state courts located in San Francisco County, California, and you consent to the personal jurisdiction and venue of such courts.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Waiver of Class Actions</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  YOU AND SNAPCV AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE ACTION.
                </p>
              </div>
              
              <Separator className="my-8" />
            </div>

            {/* Changes to Terms */}
            <div id="changes" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">11. Changes to Terms</h2>
              </div>
              
              <div className="pl-9">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms of Service at any time. We will provide notice of any changes by posting the new Terms of Service on this page and updating the "Last Updated" date.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Your continued use of the Services after any such changes constitutes your acceptance of the new Terms of Service. If you do not agree to the new terms, you must stop using the Services.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We encourage you to review the Terms of Service whenever you access the Services to stay informed about our terms and conditions.
                </p>
              </div>
              
              <Separator className="my-8" />
            </div>

            {/* Contact Us */}
            <div id="contact" className="scroll-mt-24">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">12. Contact Us</h2>
              </div>
              
              <div className="pl-9">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If you have any questions or concerns about these Terms of Service, please contact us:
                </p>
                
                <ul className="list-none mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Email:</strong> <a href="mailto:legal@snapcv.com" className="text-blue-600 hover:underline">legal@snapcv.com</a></li>
                  <li><strong>Mail:</strong> SnapCV Legal Department, 123 Innovation Way, San Francisco, CA 94107, United States</li>
                  <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}