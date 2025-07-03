'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
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
  Briefcase,
  Linkedin
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  const { scrollY } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const missionInView = useInView(missionRef, { once: false, amount: 0.3 });
  const teamInView = useInView(teamRef, { once: false, amount: 0.3 });
  const milestonesInView = useInView(milestonesRef, { once: false, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: false, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.3 });

  // Parallax effect for hero section
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.5]);

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

  const fadeInRightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const teamMembers = [
    {
      name: 'Muhammad Zubair',
      role: 'CEO & Co-Founder',
      bio: 'Former tech recruiter with 10+ years of experience helping professionals land their dream jobs.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      linkedin: 'https://linkedin.com/in/muhammadzubair'
    },
    {
      name: 'Sarhan Ahmed',
      role: 'CTO & Co-Founder',
      bio: 'AI specialist with a background in natural language processing and machine learning.',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      linkedin: 'https://linkedin.com/in/sarhanahmed'
    },
    {
      name: 'Abdul Hannan',
      role: 'Head of Design',
      bio: 'Award-winning UX designer focused on creating beautiful, functional user experiences.',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      linkedin: 'https://linkedin.com/in/abdulhannan'
    }
  ];

  const milestones = [
    {
      year: '2025',
      title: 'Company Founded',
      description: 'SnapCV was founded with a mission to revolutionize the resume creation process using AI technology.'
    }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: heroY, opacity: heroOpacity }}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={fadeInUpVariants}
            className="text-center"
          >
            <Badge variant="outline" className="mb-4 px-4 py-2 text-blue-600 border-blue-200">
              Our Story
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About
              <motion.span 
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              > SnapCV</motion.span>
            </h1>
            <motion.p 
              variants={fadeInUpVariants}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              We're on a mission to help professionals create stunning, ATS-optimized resumes 
              that showcase their unique talents and help them land their dream jobs.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section ref={missionRef} className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={missionInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInLeftVariants}>
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
                <motion.div 
                  className="flex items-start"
                  variants={itemVariants}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
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
                </motion.div>
                <motion.div 
                  className="flex items-start"
                  variants={itemVariants}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
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
                </motion.div>
                <motion.div 
                  className="flex items-start"
                  variants={itemVariants}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
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
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              variants={fadeInRightVariants}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl transform rotate-3 opacity-10"
                animate={{ 
                  rotate: [3, 5, 3],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              <Card className="border-0 shadow-2xl bg-white dark:bg-gray-800 overflow-hidden rounded-2xl">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <motion.div 
                      className="flex items-center space-x-4"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                        <Target className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Our Vision</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          To become the global standard for professional resume creation and career advancement.
                        </p>
                      </div>
                    </motion.div>
                    <Separator />
                    <motion.div 
                      className="flex items-center space-x-4"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                        <Award className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Our Values</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Innovation, accessibility, integrity, and user-centered design guide everything we do.
                        </p>
                      </div>
                    </motion.div>
                    <Separator />
                    <motion.div 
                      className="flex items-center space-x-4"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Our Impact</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Over 50,000 professionals have secured better jobs using our platform.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Team */}
      <section ref={teamRef} className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            variants={fadeInUpVariants}
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
            animate={teamInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group"
              >
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-900 overflow-hidden h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <motion.div
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-800 shadow-lg mb-6">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <motion.h3 
                      className="text-xl font-bold text-gray-900 dark:text-white mb-1"
                      whileHover={{ color: "#3b82f6" }}
                    >
                      {member.name}
                    </motion.h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      {member.bio}
                    </p>
                    
                    {/* LinkedIn Button */}
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-auto"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center space-x-2 border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20"
                        >
                          <Linkedin className="w-4 h-4" />
                          <span>Connect on LinkedIn</span>
                        </Button>
                      </motion.div>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Milestones */}
      <section ref={milestonesRef} className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={milestonesInView ? "visible" : "hidden"}
            variants={fadeInUpVariants}
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
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-100 dark:bg-blue-900/20"
              initial={{ height: 0 }}
              animate={milestonesInView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            ></motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={milestonesInView ? "visible" : "hidden"}
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
                    <motion.div 
                      className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      initial={{ scale: 0 }}
                      animate={milestonesInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ 
                        delay: 0.5 + index * 0.2,
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                      }}
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg">
                        <Calendar className="w-5 h-5" />
                      </div>
                    </motion.div>
                    <div className="w-1/2 pl-12 pr-4">
                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        animate={milestonesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        transition={{ 
                          delay: 0.7 + index * 0.2,
                          duration: 0.8,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                      >
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
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section ref={statsRef} className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={fadeInUpVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              SnapCV by the Numbers
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our impact on professionals worldwide
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
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
                variants={scaleInVariants}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  transition: { duration: 0.3 }
                }}
                className="text-center"
              >
                <Card className="border-0 shadow-lg bg-white dark:bg-gray-800 h-full">
                  <CardContent className="p-6 flex flex-col items-center">
                    <motion.div 
                      className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-4"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 3,
                        delay: index * 0.2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <stat.icon className="w-8 h-8 text-blue-600" />
                    </motion.div>
                    <motion.div 
                      className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                      transition={{ 
                        delay: 0.3 + index * 0.1,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
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
      <section ref={ctaRef} className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
            variants={scaleInVariants}
            className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white overflow-hidden relative"
          >
            {/* Animated background elements */}
            <motion.div 
              className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full"
              animate={{
                x: [50, 150, 50],
                y: [50, -50, 50],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.h2 
              className="text-3xl font-bold mb-4 relative z-10"
              variants={fadeInUpVariants}
            >
              Ready to Join Our Success Story?
            </motion.h2>
            <motion.p 
              className="text-xl opacity-90 mb-8 max-w-3xl mx-auto relative z-10"
              variants={fadeInUpVariants}
            >
              Create your professional resume today and become part of our growing community of successful professionals.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 relative z-10"
              variants={fadeInUpVariants}
            >
              <Link href="/resume-builder">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Building Now
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Contact Us
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}