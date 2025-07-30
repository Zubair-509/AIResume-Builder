'use client';

import React from 'react';
import { ArrowRight, Sparkles, Zap, Target, Users, Shield, Clock } from 'lucide-react';
import Link from 'next/link';

export function FeaturesSection() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Content",
      description: "Let our AI generate compelling content tailored to your industry and role.",
      color: "text-blue-600"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "ATS Optimized",
      description: "Ensure your resume passes through Applicant Tracking Systems effortlessly.",
      color: "text-purple-600"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Create professional resumes in minutes, not hours.",
      color: "text-yellow-600"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multiple Templates",
      description: "Choose from dozens of professionally designed templates.",
      color: "text-green-600"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy First",
      description: "Your data is secure and never shared with third parties.",
      color: "text-red-600"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-time Preview",
      description: "See your changes instantly with our live preview feature.",
      color: "text-indigo-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full px-6 py-3 mb-6">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Powerful Features
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Everything You Need to
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Stand Out</span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive suite of tools helps you create, customize, and optimize your resume for maximum impact.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 mb-6 ${feature.color}`}>
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Create Your Perfect Resume?
          </h3>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of job seekers who have successfully landed their dream jobs with our AI-powered resume builder.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/resume-builder">
              <button className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 group text-lg hover:scale-105">
                <span>Start Building Now</span>
                <ArrowRight className="w-6 h-6 inline-block ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>

            <Link href="/resume-example">
              <button className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-2xl font-bold hover:bg-white/10 transition-all duration-300 text-lg hover:scale-105">
                View Examples
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}