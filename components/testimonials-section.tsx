'use client';

import { motion } from 'framer-motion';
import { Star, Quote, Briefcase, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function TestimonialsSection() {
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

  return (
    <section className="py-20 bg-white dark:bg-gray-800" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 text-purple-600 border-purple-200">
            Success Stories
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Trusted by
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> 50,000+ Professionals</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            See how SnapCV has helped professionals across industries land their dream jobs at top companies worldwide.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-900 overflow-hidden">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="flex justify-between items-start mb-4">
                    <Quote className="w-8 h-8 text-purple-500 opacity-50" />
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
                    <Avatar className="w-12 h-12 ring-2 ring-purple-100 dark:ring-purple-800">
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
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Trusted by professionals at leading companies worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center space-x-8 opacity-60">
            {['Google', 'Microsoft', 'Apple', 'Amazon', 'Netflix', 'Spotify', 'Airbnb', 'Nike'].map((company) => (
              <div key={company} className="text-2xl font-bold text-gray-400 dark:text-gray-600 mb-4">
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}