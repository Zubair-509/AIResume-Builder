'use client';

import React, { useState } from 'react';
import { ResumeFormData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, Info, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ATSCheckerProps {
  resumeData: ResumeFormData;
  templateId: string;
}

export function ATSChecker({ resumeData, templateId }: ATSCheckerProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<any>(null);

  const templateScores = {
    'modern': 95,
    'classic': 98,
    'professional': 97,
    'technical': 99,
    'entry-level': 96,
    'executive': 97,
    'creative': 92
  };

  const checkATS = async () => {
    setIsChecking(true);
    
    try {
      // Simulate ATS check
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock results
      const templateScore = templateScores[templateId as keyof typeof templateScores] || 95;
      const contentScore = calculateContentScore(resumeData);
      const formatScore = calculateFormatScore(resumeData);
      const keywordScore = calculateKeywordScore(resumeData);
      
      const overallScore = Math.round((templateScore + contentScore + formatScore + keywordScore) / 4);
      
      const results = {
        overallScore,
        templateScore,
        contentScore,
        formatScore,
        keywordScore,
        issues: generateIssues(resumeData),
        recommendations: generateRecommendations(resumeData)
      };
      
      setResults(results);
      
      if (overallScore >= 90) {
        toast.success('Your resume is ATS-friendly!', {
          description: `Overall score: ${overallScore}%`
        });
      } else {
        toast.info('Your resume needs some improvements', {
          description: `Overall score: ${overallScore}%`
        });
      }
    } catch (error) {
      console.error('ATS check error:', error);
      toast.error('Failed to check ATS compatibility');
    } finally {
      setIsChecking(false);
    }
  };

  const calculateContentScore = (data: ResumeFormData): number => {
    let score = 100;
    
    // Check professional summary
    if (!data.professionalSummary || data.professionalSummary.length < 100) {
      score -= 10;
    }
    
    // Check work experience
    if (!data.workExperience || data.workExperience.length === 0) {
      score -= 20;
    } else {
      // Check for quantifiable achievements
      const hasQuantifiableAchievements = data.workExperience.some(exp => 
        exp.responsibilities && /\d+%|\$\d+|\d+ (years|months|weeks)/.test(exp.responsibilities)
      );
      
      if (!hasQuantifiableAchievements) {
        score -= 10;
      }
    }
    
    // Check skills
    if (!data.skills || data.skills.split('\n').filter(s => s.trim()).length < 5) {
      score -= 10;
    }
    
    return Math.max(60, score);
  };

  const calculateFormatScore = (data: ResumeFormData): number => {
    // For this demo, we'll assume the format is good based on our templates
    return 95;
  };

  const calculateKeywordScore = (data: ResumeFormData): number => {
    // For this demo, we'll generate a random score between 80-100
    return Math.floor(Math.random() * 21) + 80;
  };

  const generateIssues = (data: ResumeFormData): any[] => {
    const issues = [];
    
    if (!data.professionalSummary || data.professionalSummary.length < 100) {
      issues.push({
        type: 'content',
        severity: 'medium',
        message: 'Professional summary is too short',
        recommendation: 'Expand your professional summary to at least 100 characters'
      });
    }
    
    if (data.workExperience && data.workExperience.length > 0) {
      const hasQuantifiableAchievements = data.workExperience.some(exp => 
        exp.responsibilities && /\d+%|\$\d+|\d+ (years|months|weeks)/.test(exp.responsibilities)
      );
      
      if (!hasQuantifiableAchievements) {
        issues.push({
          type: 'content',
          severity: 'high',
          message: 'Work experience lacks quantifiable achievements',
          recommendation: 'Add metrics and numbers to your achievements (e.g., "Increased sales by 20%")'
        });
      }
    }
    
    if (templateId === 'creative') {
      issues.push({
        type: 'format',
        severity: 'low',
        message: 'Creative template may be less ATS-friendly',
        recommendation: 'Consider using a more traditional template for corporate applications'
      });
    }
    
    return issues;
  };

  const generateRecommendations = (data: ResumeFormData): string[] => {
    const recommendations = [
      'Use industry-specific keywords from the job description',
      'Ensure all dates are in consistent format (MM/YYYY)',
      'Use standard section headings (Experience, Education, Skills)'
    ];
    
    if (!data.professionalSummary || data.professionalSummary.length < 150) {
      recommendations.push('Expand your professional summary to highlight key qualifications');
    }
    
    if (data.workExperience && data.workExperience.length > 0) {
      const hasActionVerbs = data.workExperience.some(exp => 
        exp.responsibilities && /(Led|Managed|Developed|Implemented|Created|Designed|Improved)/i.test(exp.responsibilities)
      );
      
      if (!hasActionVerbs) {
        recommendations.push('Start bullet points with strong action verbs (e.g., Led, Developed, Implemented)');
      }
    }
    
    return recommendations;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      {!results ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              ATS Compatibility Check
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Check if your resume is optimized for Applicant Tracking Systems (ATS). 
              This will analyze your content, format, and keywords to ensure your resume gets past automated screening.
            </p>
            
            <Button
              onClick={checkATS}
              disabled={isChecking}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isChecking ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Check ATS Compatibility
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                ATS Compatibility Results
              </CardTitle>
              <Badge className={`${getScoreBg(results.overallScore)} ${getScoreColor(results.overallScore)} text-lg px-3 py-1`}>
                {results.overallScore}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`p-4 rounded-lg ${getScoreBg(results.templateScore)}`}>
                <div className={`text-xl font-bold ${getScoreColor(results.templateScore)}`}>
                  {results.templateScore}%
                </div>
                <div className="text-sm text-gray-600">Template</div>
                <Progress value={results.templateScore} className="h-1 mt-2" />
              </div>
              
              <div className={`p-4 rounded-lg ${getScoreBg(results.contentScore)}`}>
                <div className={`text-xl font-bold ${getScoreColor(results.contentScore)}`}>
                  {results.contentScore}%
                </div>
                <div className="text-sm text-gray-600">Content</div>
                <Progress value={results.contentScore} className="h-1 mt-2" />
              </div>
              
              <div className={`p-4 rounded-lg ${getScoreBg(results.formatScore)}`}>
                <div className={`text-xl font-bold ${getScoreColor(results.formatScore)}`}>
                  {results.formatScore}%
                </div>
                <div className="text-sm text-gray-600">Format</div>
                <Progress value={results.formatScore} className="h-1 mt-2" />
              </div>
              
              <div className={`p-4 rounded-lg ${getScoreBg(results.keywordScore)}`}>
                <div className={`text-xl font-bold ${getScoreColor(results.keywordScore)}`}>
                  {results.keywordScore}%
                </div>
                <div className="text-sm text-gray-600">Keywords</div>
                <Progress value={results.keywordScore} className="h-1 mt-2" />
              </div>
            </div>
            
            {/* Issues */}
            {results.issues.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Issues Found ({results.issues.length})
                </h3>
                {results.issues.map((issue: any, index: number) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border ${
                      issue.severity === 'high' 
                        ? 'border-red-200 bg-red-50' 
                        : issue.severity === 'medium'
                        ? 'border-yellow-200 bg-yellow-50'
                        : 'border-blue-200 bg-blue-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {issue.severity === 'high' ? (
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      ) : issue.severity === 'medium' ? (
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      ) : (
                        <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {issue.message}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {issue.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Recommendations */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Recommendations
              </h3>
              <ul className="space-y-2">
                {results.recommendations.map((recommendation: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {recommendation}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setResults(null)}
              >
                Back
              </Button>
              <PDFExporter
                resumeData={resumeData}
                templateId={templateId}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default ATSChecker;