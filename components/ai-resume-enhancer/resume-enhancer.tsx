'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Target, 
  PenTool, 
  FileText, 
  Upload,
  Download,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Zap,
  Brain,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BulletPointEnhancer } from './bullet-point-enhancer';
import { JobDescriptionMatcher } from './job-description-matcher';
import { WritingAssistant } from './writing-assistant';
import { EnhancementResults } from './enhancement-results';

export function ResumeEnhancer() {
  const [activeTab, setActiveTab] = useState('enhance');
  const [enhancementData, setEnhancementData] = useState<any>(null);

  const features = [
    {
      id: 'enhance',
      title: 'Bullet Point Enhancement',
      description: 'Transform basic bullet points into compelling achievement statements',
      icon: Sparkles,
      color: 'from-blue-500 to-cyan-500',
      stats: { improved: '85%', engagement: '+40%' }
    },
    {
      id: 'match',
      title: 'Job Description Matching',
      description: 'Analyze job postings and optimize your resume for better matches',
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      stats: { accuracy: '92%', matches: '+60%' }
    },
    {
      id: 'writing',
      title: 'Writing Assistant',
      description: 'Advanced grammar, style, and ATS optimization',
      icon: PenTool,
      color: 'from-purple-500 to-pink-500',
      stats: { clarity: '95%', ats: '+75%' }
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div 
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full px-6 py-3 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Brain className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              AI-Powered Resume Enhancement
            </span>
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Elevate Your Resume with
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI Intelligence</span>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Transform your professional story with our comprehensive AI tools. Enhance bullet points, 
            match job descriptions, and optimize your writing for maximum impact.
          </p>
        </motion.div>

        {/* Feature Overview Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => setActiveTab(feature.id)}
            >
              <Card className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 overflow-hidden ${
                activeTab === feature.id ? 'ring-2 ring-blue-500' : ''
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    {Object.entries(feature.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {value}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Enhancement Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-0 shadow-2xl bg-white dark:bg-gray-800">
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b border-gray-200 dark:border-gray-700 px-6 pt-6">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-700">
                    <TabsTrigger 
                      value="enhance" 
                      className="flex items-center space-x-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="hidden sm:inline">Enhance</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="match" 
                      className="flex items-center space-x-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                    >
                      <Target className="w-4 h-4" />
                      <span className="hidden sm:inline">Match</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="writing" 
                      className="flex items-center space-x-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                    >
                      <PenTool className="w-4 h-4" />
                      <span className="hidden sm:inline">Writing</span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6">
                  <AnimatePresence mode="wait">
                    <TabsContent value="enhance" className="mt-0">
                      <motion.div
                        key="enhance"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <BulletPointEnhancer onEnhancement={setEnhancementData} />
                      </motion.div>
                    </TabsContent>

                    <TabsContent value="match" className="mt-0">
                      <motion.div
                        key="match"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <JobDescriptionMatcher onMatch={setEnhancementData} />
                      </motion.div>
                    </TabsContent>

                    <TabsContent value="writing" className="mt-0">
                      <motion.div
                        key="writing"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <WritingAssistant onAssistance={setEnhancementData} />
                      </motion.div>
                    </TabsContent>
                  </AnimatePresence>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Section */}
        {enhancementData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <EnhancementResults data={enhancementData} />
          </motion.div>
        )}

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              icon: TrendingUp,
              title: 'Quantify Results',
              tip: 'Include specific numbers and percentages to demonstrate impact'
            },
            {
              icon: Zap,
              title: 'Action Verbs',
              tip: 'Start bullet points with strong action verbs like "Led", "Implemented", "Optimized"'
            },
            {
              icon: Search,
              title: 'Keywords',
              tip: 'Include relevant industry keywords from job descriptions'
            },
            {
              icon: FileText,
              title: 'ATS Friendly',
              tip: 'Use standard formatting and avoid complex graphics for ATS compatibility'
            }
          ].map((tip, index) => (
            <Card key={index} className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <tip.icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                      {tip.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      {tip.tip}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
}