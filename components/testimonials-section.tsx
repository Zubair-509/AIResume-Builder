'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote, Briefcase, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Software Engineer',
      company: 'Google',
      location: 'San Francisco, CA',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'SnapCV completely transformed my job search. The AI-generated content was spot-on and helped me land interviews at top tech companies. I got my dream job at Google within 3 weeks!',
      highlight: 'Landed job at Google in 3 weeks'
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      role: 'Marketing Director',
      company: 'Nike',
      location: 'Portland, OR',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'The templates are absolutely stunning and professional. My resume stood out from hundreds of applications. The ATS optimization feature is a game-changer for anyone serious about their career.',
      highlight: 'Stood out from 100+ applications'
    },
    {
      id: 3,
      name: 'Emily Johnson',
      role: 'UX Designer',
      company: 'Airbnb',
      location: 'Austin, TX',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'As a designer, I\'m very particular about aesthetics. SnapCV exceeded my expectations with beautiful, modern templates that perfectly showcased my portfolio and experience.',
      highlight: 'Perfect for creative professionals'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Data Scientist',
      company: 'Microsoft',
      location: 'Seattle, WA',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'The AI suggestions for technical skills and achievements were incredibly accurate. It helped me articulate my complex projects in a way that non-technical recruiters could understand.',
      highlight: 'Perfect for technical roles'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      role: 'Product Manager',
      company: 'Spotify',
      location: 'New York, NY',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'I was career-changing from consulting to tech. SnapCV helped me highlight transferable skills and present my experience in a way that resonated with tech companies.',
      highlight: 'Successful career transition'
    },
    {
      id: 6,
      name: 'James Wilson',
      role: 'Sales Director',
      company: 'Salesforce',
      location: 'Chicago, IL',
      avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'The quantified achievements feature helped me showcase my sales numbers effectively. My interview rate increased by 300% after using SnapCV. Absolutely worth every penny!',
      highlight: '300% increase in interviews'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -15,
      scale: 1.03,
      rotateY: 5,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const quoteVariants = {
    hover: {
      scale: 1.1,
      rotate: 10,
      color: "#8b5cf6",
      transition: {
        duration: 0.3
      }
    }
  };

  const avatarVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden" id="testimonials">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 30% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Badge variant="outline" className="mb-6 px-6 py-3 text-purple-600 border-purple-200 shadow-lg">
              Success Stories
            </Badge>
          </motion.div>
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Trusted by
            <motion.span 
              className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              style={{ backgroundSize: '200% 200%' }}
            > 50,000+ Professionals</motion.span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            See how SnapCV has helped professionals across industries land their dream jobs at top companies worldwide.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className="border-0 shadow-lg transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-900 overflow-hidden rounded-2xl"
            >
              <CardContent className="p-6">
                <div className="p-8">
                  {/* Quote Icon */}
                  <div className="flex justify-between items-start mb-4">
                    <Quote className="w-8 h-8 text-purple-500 opacity-60" />
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
                    "{testimonial.text}"
                  </blockquote>

                  {/* Highlight Badge */}
                  <Badge 
                    variant="secondary" 
                    className="mb-4 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                  >
                    {testimonial.highlight}
                  </Badge>

                  {/* Author Info */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-purple-100 text-purple-600 font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Briefcase className="w-3 h-3" />
                        <span>{testimonial.role} at {testimonial.company}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{testimonial.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Trusted by professionals at leading companies worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Google', 'Microsoft', 'Apple', 'Amazon', 'Netflix', 'Spotify', 'Airbnb', 'Nike'].map((company) => (
              <div key={company} className="text-xl font-bold text-gray-400 dark:text-gray-600">
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}