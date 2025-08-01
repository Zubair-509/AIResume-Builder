'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Loader2, Target, CheckCircle, AlertCircle, TrendingUp, Star } from 'lucide-react';
import { toast } from 'sonner';

interface SkillMatch {
  matched: string[];
  missing: string[];
  score: number;
}

interface ExperienceMatch {
  matched: string[];
  gaps: string[];
  score: number;
}

interface MatchAnalysis {
  overallScore: number;
  technicalSkills: SkillMatch;
  softSkills: SkillMatch;
  keywords: {
    matched: string[];
    suggested: string[];
    score: number;
  };
  experience: ExperienceMatch;
  recommendations: string[];
}
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  
  Loader2, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Search,
  FileText,
  Zap,
  Copy,
  Download,
  BarChart3
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';


interface MatchResult {
  overallScore: number;
  technicalSkills: {
    matched: string[];
    missing: string[];
    score: number;
  };
  softSkills: {
    matched: string[];
    missing: string[];
    score: number;
  };
  keywords: {
    matched: string[];
    suggested: string[];
    score: number;
  };
  experience: {
    matched: string[];
    gaps: string[];
    score: number;
  };
  recommendations: string[];
}

interface JobDescriptionMatcherProps {
  onMatch: (data: any) => void;
}

export function JobDescriptionMatcher({ onMatch }: JobDescriptionMatcherProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeContent, setResumeContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);

      // Simulate file reading
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setJobDescription(content);
        toast.success('Job description uploaded successfully!');
      };
      reader.readAsText(file);
    }
  };

  const analyzeMatch = async () => {
    if (!jobDescription.trim() || !resumeContent.trim()) {
      toast.error('Please provide both job description and resume content');
      return;
    }

    setIsAnalyzing(true);

    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 3000));

      const result = await simulateJobMatching(jobDescription, resumeContent);
      setMatchResult(result);

      onMatch({
        type: 'job-matching',
        result,
        summary: {
          overallScore: result.overallScore,
          keyFindings: [
            `${result.technicalSkills.matched.length} technical skills matched`,
            `${result.keywords.suggested.length} keywords to add`,
            `${result.experience.gaps.length} experience gaps identified`
          ]
        }
      });

      toast.success('Job matching analysis complete!', {
        description: `Overall match score: ${result.overallScore}%`
      });
    } catch (error) {
      toast.error('Analysis failed', {
        description: 'Please try again or contact support.'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const simulateJobMatching = async (jobDesc: string, resume: string): Promise<MatchResult> => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock analysis based on common patterns
    const technicalSkillsPool = ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'SQL', 'Git', 'TypeScript', 'MongoDB'];
    const softSkillsPool = ['Leadership', 'Communication', 'Problem-solving', 'Teamwork', 'Adaptability', 'Critical thinking'];
    const keywordsPool = ['Agile', 'Scrum', 'CI/CD', 'Microservices', 'API', 'Database', 'Testing', 'Performance', 'Security', 'Analytics'];

    const matchedTechnical = technicalSkillsPool.slice(0, Math.floor(Math.random() * 6) + 3);
    const missingTechnical = technicalSkillsPool.slice(matchedTechnical.length, matchedTechnical.length + 3);

    const matchedSoft = softSkillsPool.slice(0, Math.floor(Math.random() * 4) + 2);
    const missingSoft = softSkillsPool.slice(matchedSoft.length, matchedSoft.length + 2);

    const matchedKeywords = keywordsPool.slice(0, Math.floor(Math.random() * 5) + 3);
    const suggestedKeywords = keywordsPool.slice(matchedKeywords.length, matchedKeywords.length + 4);

    const technicalScore = Math.floor((matchedTechnical.length / (matchedTechnical.length + missingTechnical.length)) * 100);
    const softScore = Math.floor((matchedSoft.length / (matchedSoft.length + missingSoft.length)) * 100);
    const keywordScore = Math.floor((matchedKeywords.length / (matchedKeywords.length + suggestedKeywords.length)) * 100);
    const experienceScore = Math.floor(Math.random() * 30) + 70;

    const overallScore = Math.floor((technicalScore + softScore + keywordScore + experienceScore) / 4);

    return {
      overallScore,
      technicalSkills: {
        matched: matchedTechnical,
        missing: missingTechnical,
        score: technicalScore
      },
      softSkills: {
        matched: matchedSoft,
        missing: missingSoft,
        score: softScore
      },
      keywords: {
        matched: matchedKeywords,
        suggested: suggestedKeywords,
        score: keywordScore
      },
      experience: {
        matched: ['Project Management', 'Team Leadership', 'Software Development'],
        gaps: ['Enterprise Architecture', 'DevOps Implementation'],
        score: experienceScore
      },
      recommendations: [
        'Add missing technical skills to your skills section',
        'Include more quantifiable achievements in your experience',
        'Incorporate suggested keywords naturally throughout your resume',
        'Highlight relevant certifications and training',
        'Emphasize leadership and collaboration experiences'
      ]
    };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/20';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/20';
    return 'bg-red-100 dark:bg-red-900/20';
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy text');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Job Description Matching
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Analyze job postings and optimize your resume for better matches
        </p>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Description Input */}
        <Card className="border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Job Description
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="job-upload">Upload Job Description</Label>
              <div className="flex items-center space-x-2">
                <input
                  id="job-upload"
                  type="file"
                  accept=".txt,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('job-upload')?.click()}
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </Button>
                {uploadedFile && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {uploadedFile.name}
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-description">Or Paste Job Description</Label>
              <Textarea
                id="job-description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                rows={8}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Resume Content Input */}
        <Card className="border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-green-600" />
              Your Resume Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resume-content">Resume Text</Label>
              <Textarea
                id="resume-content"
                value={resumeContent}
                onChange={(e) => setResumeContent(e.target.value)}
                placeholder="Paste your resume content here (skills, experience, education)..."
                rows={10}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analyze Button */}
      <div className="flex justify-center">
        <Button
          onClick={analyzeMatch}
          disabled={!jobDescription.trim() || !resumeContent.trim() || isAnalyzing}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing Match...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Analyze Job Match
            </>
          )}
        </Button>
      </div>

      {/* Results Section */}
      {matchResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <Separator />

          {/* Overall Score */}
          <Card className={`border-0 shadow-lg ${getScoreBg(matchResult.overallScore)}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Overall Match Score
                </h3>
                <div className={`text-3xl font-bold ${getScoreColor(matchResult.overallScore)}`}>
                  {matchResult.overallScore}%
                </div>
              </div>
              <Progress value={matchResult.overallScore} className="h-3" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {matchResult.overallScore >= 80 ? 'Excellent match! Your resume aligns well with this job.' :
                 matchResult.overallScore >= 60 ? 'Good match with room for improvement.' :
                 'Consider optimizing your resume for better alignment.'}
              </p>
            </CardContent>
          </Card>

          {/* Detailed Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Technical Skills */}
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-blue-600" />
                    Technical Skills
                  </span>
                  <Badge className={getScoreColor(matchResult.technicalSkills.score)}>
                    {matchResult.technicalSkills.score}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">
                    Matched Skills ({matchResult.technicalSkills.matched.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {matchResult.technicalSkills.matched.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {matchResult.technicalSkills.missing.length > 0 && (
                  <div>
                    <h4 className="font-medium text-red-700 dark:text-red-300 mb-2">
                      Missing Skills ({matchResult.technicalSkills.missing.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.technicalSkills.missing.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-red-100 text-red-700">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Soft Skills */}
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                    Soft Skills
                  </span>
                  <Badge className={getScoreColor(matchResult.softSkills.score)}>
                    {matchResult.softSkills.score}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">
                    Matched Skills ({matchResult.softSkills.matched.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {matchResult.softSkills.matched.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {matchResult.softSkills.missing.length > 0 && (
                  <div>
                    <h4 className="font-medium text-red-700 dark:text-red-300 mb-2">
                      Missing Skills ({matchResult.softSkills.missing.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.softSkills.missing.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-red-100 text-red-700">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Keywords */}
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Search className="w-5 h-5 mr-2 text-orange-600" />
                    Keywords
                  </span>
                  <Badge className={getScoreColor(matchResult.keywords.score)}>
                    {matchResult.keywords.score}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">
                    Found Keywords ({matchResult.keywords.matched.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {matchResult.keywords.matched.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="bg-green-100 text-green-700">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-blue-700 dark:text-blue-300">
                      Suggested Keywords ({matchResult.keywords.suggested.length})
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(matchResult.keywords.suggested.join(', '))}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {matchResult.keywords.suggested.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="border-blue-300 text-blue-700">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                    Experience
                  </span>
                  <Badge className={getScoreColor(matchResult.experience.score)}>
                    {matchResult.experience.score}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">
                    Relevant Experience ({matchResult.experience.matched.length})
                  </h4>
                  <div className="space-y-1">
                    {matchResult.experience.matched.map((exp, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-600" />
                        {exp}
                      </div>
                    ))}
                  </div>
                </div>

                {matchResult.experience.gaps.length > 0 && (
                  <div>
                    <h4 className="font-medium text-orange-700 dark:text-orange-300 mb-2">
                      Experience Gaps ({matchResult.experience.gaps.length})
                    </h4>
                    <div className="space-y-1">
                      {matchResult.experience.gaps.map((gap, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <AlertTriangle className="w-3 h-3 mr-2 text-orange-600" />
                          {gap}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                Optimization Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {matchResult.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start">
                    <span className="w-6 h-6 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {rec}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}