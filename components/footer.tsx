'use client';

import { motion } from 'framer-motion';
import { FileText, Mail, MapPin, Github, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);

  const footerLinks = {
    product: [
      { name: 'Resume Builder', href: '/resume-builder' },
      { name: 'Templates', href: '/templates' },
      { name: 'Examples', href: '/resume-example' },
      { name: 'Pricing', href: '/pricing' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Terms of Service', href: '/terms-of-service' }
    ],
    support: [
      { name: 'FAQ', href: '/faq' }
    ]
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#' }
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors(null);
    
    // Validate email
    if (!email.trim()) {
      setErrors('Please enter your email address');
      toast.error('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setErrors('Please enter a valid email address');
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Successfully subscribed!', {
          description: 'Thank you for subscribing to our newsletter.'
        });
        setEmail('');
      } else {
        toast.error('Subscription failed', {
          description: data.message || 'Please try again later.'
        });
        setErrors(data.message || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Subscription failed', {
        description: 'An error occurred. Please try again later.'
      });
      setErrors('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">SnapCV</span>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              Create professional resumes in minutes with our AI-powered builder. 
              Stand out from the crowd with beautiful, ATS-friendly designs.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4" />
                <a href="mailto:hello@snapcv.com" className="hover:text-white transition-colors">
                  hello@snapcv.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4" />
                <span>Karachi, Sindh Pakistan</span>
              </div>
            </div>
          </motion.div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="font-semibold text-white mb-4 capitalize">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="max-w-md mx-auto text-center lg:text-left lg:max-w-none lg:flex lg:items-center lg:justify-between">
            <div className="lg:flex-1">
              <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-400 text-sm">
                Get the latest career tips, resume trends, and job market insights.
              </p>
            </div>
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors) setErrors(null);
                    }}
                    disabled={isSubmitting}
                    required
                    aria-label="Email for newsletter"
                    aria-invalid={errors ? "true" : "false"}
                    aria-describedby={errors ? "footer-email-error" : undefined}
                  />
                  {errors && (
                    <p id="footer-email-error" className="text-sm text-red-400 mt-1 text-left">{errors}</p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 px-6"
                  disabled={isSubmitting}
                  aria-label="Subscribe to newsletter"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Subscribing...</span>
                    </div>
                  ) : (
                    <>Subscribe</>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} SnapCV. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}