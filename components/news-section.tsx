'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight, TrendingUp, Award, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

export function NewsSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);

  const news = [
    {
      id: 1,
      category: 'Product Update',
      title: 'New AI-Powered Skills Analyzer Launched',
      excerpt: 'Our latest feature analyzes job descriptions and suggests the most relevant skills to include in your resume, increasing your match rate by 40%.',
      date: '2024-01-15',
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      badge: 'New Feature',
      badgeColor: 'bg-green-100 text-green-700'
    },
    {
      id: 2,
      category: 'Company News',
      title: 'SnapCV Reaches 50,000 Users Milestone',
      excerpt: 'We\'re thrilled to announce that over 50,000 professionals have successfully created resumes using our platform, with a 95% job placement success rate.',
      date: '2024-01-10',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      badge: 'Milestone',
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    {
      id: 3,
      category: 'Industry Insights',
      title: '2024 Resume Trends: What Recruiters Want to See',
      excerpt: 'Based on analysis of 10,000+ successful resumes, we\'ve identified the key trends that will dominate recruitment in 2024.',
      date: '2024-01-05',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      badge: 'Trending',
      badgeColor: 'bg-purple-100 text-purple-700'
    }
  ];

  const updates = [
    {
      icon: TrendingUp,
      title: 'Performance Boost',
      description: 'Resume generation is now 3x faster with our optimized AI engine',
      color: 'text-green-600'
    },
    {
      icon: Award,
      title: 'Industry Recognition',
      description: 'Named "Best Resume Builder 2024" by CareerTech Awards',
      color: 'text-yellow-600'
    },
    {
      icon: Users,
      title: 'Community Growth',
      description: 'Join our growing community of 50,000+ successful professionals',
      color: 'text-blue-600'
    }
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" id="news">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 text-green-600 border-green-200">
            Latest Updates
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Stay Updated with
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> SnapCV News</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the latest features, industry insights, and success stories from the SnapCV community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main News Articles */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            {news.map((article, index) => (
              <motion.div
                key={article.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: 'easeOut',
                    },
                  },
                }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div 
                        className="h-48 md:h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${article.image})` }}
                        role="img"
                        aria-label={article.title}
                      />
                    </div>
                    <CardContent className="md:w-2/3 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className={`${article.badgeColor} border-0`}>
                          {article.badge}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(article.date)}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        {article.excerpt}
                      </p>
                      
                      <Button 
                        variant="ghost" 
                        className="p-0 h-auto text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 group"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Sidebar Updates */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Quick Updates
                </h3>
                <div className="space-y-6">
                  {updates.map((update, index) => (
                    <motion.div
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.5,
                            ease: 'easeOut',
                          },
                        },
                      }}
                      className="flex items-start space-x-4"
                    >
                      <div className={`p-2 rounded-lg bg-gray-50 dark:bg-gray-700 ${update.color}`}>
                        <update.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {update.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {update.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">
                  Stay in the Loop
                </h3>
                <p className="text-blue-100 mb-4 text-sm">
                  Get the latest updates, tips, and career insights delivered to your inbox.
                </p>
                <form onSubmit={handleSubscribe}>
                  <div className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors) setErrors(null);
                      }}
                      disabled={isSubmitting}
                      required
                      aria-label="Email for newsletter"
                      aria-invalid={errors ? "true" : "false"}
                      aria-describedby={errors ? "news-email-error" : undefined}
                    />
                    {errors && (
                      <p id="news-email-error" className="text-sm text-red-300 mt-1">{errors}</p>
                    )}
                    <Button 
                      type="submit"
                      className="w-full bg-white text-blue-600 hover:bg-gray-100"
                      size="sm"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                          <span>Subscribing...</span>
                        </div>
                      ) : (
                        <>Subscribe to Newsletter</>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* View All News CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 py-4 rounded-xl border-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
          >
            View All News & Updates
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}