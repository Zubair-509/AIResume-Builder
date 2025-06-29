'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { 
  Users, 
  Target, 
  Award, 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  Building,
  Globe,
  Briefcase
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export default function AboutPage() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const teamMembers = [
    {
      name: 'Muhammad Zubair',
      role: 'CEO & Co-Founder',
      bio: 'Former tech recruiter with 10+ years of experience helping professionals land their dream jobs.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    },
    {
      name: 'Sarhan Ahmed',
      role: 'CTO & Co-Founder',
      bio: 'AI specialist with a background in natural language processing and machine learning.',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    },
    {
      name: 'Abdul Hannan',
      role: 'Head of Design',
      bio: 'Award-winning UX designer focused on creating beautiful, functional user experiences.',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    }
  ];

  const milestones = [
    {
      year: '2022',
      title: 'Company Founded',
      description: 'SnapCV was founded with a mission to revolutionize the resume creation process using AI technology.'
    },
    {
      year: '2023',
      title: 'First 10,000 Users',
      description: 'Reached our first major milestone of 10,000 active users and launched our premium subscription model.'
    },
    {
      year: '2023',
      title: 'AI Enhancement Engine',
      description: 'Released our proprietary AI enhancement engine, capable of transforming basic bullet points into compelling achievements.'
    },
    {
      year: '2024',
      title: 'Series A Funding',
      description: 'Secured $5M in Series A funding to expand our team and develop advanced resume optimization features.'
    },
    {
      year: '2024',
      title: '50,000+ Users',
      description: 'Surpassed 50,000 users worldwide with a 95% satisfaction rate and industry-leading ATS optimization.'
    }
  ];

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
              Our Story
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> SnapCV</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to help professionals create stunning, ATS-optimized resumes 
              that showcase their unique talents and help them land their dream jobs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                Our Mission
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Empowering Career Success Through Technology
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                At SnapCV, we believe that everyone deserves the opportunity to showcase their 
                professional achievements effectively. Our AI-powered platform bridges the gap 
                between your experience and the perfect resume presentation.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Democratizing Professional Presentation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Making professional resume creation accessible to everyone, regardless of design skills.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Optimizing for Modern Hiring
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Ensuring resumes pass through ATS systems while impressing human recruiters.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Continuous Innovation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Constantly improving our AI technology to stay ahead of hiring trends and practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl transform rotate-3 opacity-10"></div>
              <Card className="border-0 shadow-2xl bg-white dark:bg-gray-800 overflow-hidden rounded-2xl">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                        <Target className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Our Vision</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          To become the global standard for professional resume creation and career advancement.
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                        <Award className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Our Values</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Innovation, accessibility, integrity, and user-centered design guide everything we do.
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Our Impact</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Over 50,000 professionals have secured better jobs using our platform.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
              Our Team
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet the People Behind SnapCV
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our diverse team of experts is passionate about helping professionals advance their careers.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-900 overflow-hidden h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-800 shadow-lg mb-6">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Milestones */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300">
              Our Journey
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Company Milestones
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From our founding to today, we've been on a mission to transform how professionals present themselves.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-100 dark:bg-blue-900/20"></div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative space-y-12"
            >
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year + milestone.title}
                  variants={itemVariants}
                  className="relative"
                >
                  <div className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                    <div className="w-1/2"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg">
                        <Calendar className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="w-1/2 pl-12 pr-4">
                      <Card className={`border-0 shadow-lg ${index % 2 === 0 ? 'mr-12' : 'ml-12'}`}>
                        <CardContent className="p-6">
                          <Badge className="mb-2 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                            {milestone.year}
                          </Badge>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {milestone.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              SnapCV by the Numbers
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our impact on professionals worldwide
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: Users, value: '50,000+', label: 'Active Users' },
              { icon: Briefcase, value: '95%', label: 'Success Rate' },
              { icon: Globe, value: '120+', label: 'Countries' },
              { icon: Building, value: '1,000+', label: 'Partner Companies' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <Card className="border-0 shadow-lg bg-white dark:bg-gray-800 h-full">
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-4">
                      <stat.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Join Our Success Story?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Create your professional resume today and become part of our growing community of successful professionals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/resume-builder">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Building Now
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}