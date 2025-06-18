'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PenTool, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Zap,
  Target,
  TrendingUp,
  FileText,
  Loader2,
  Copy,
  RotateCcw,
  Eye,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface WritingIssue {
  type: 'grammar' | 'spelling' | 'style' | 'passive' | 'length' | 'ats';
  severity: 'error' | 'warning' | 'suggestion';
  message: string;
  suggestion: string;
  position: { start: number; end: number };
}

interface WritingAnalysis {
  overallScore: number;
  readabilityScore: number;
  atsScore: number;
  professionalTone: number;
  issues: WritingIssue[];
  wordCount: number;
  sentenceCount: number;
  avgWordsPerSentence: number;
  passiveVoiceCount: number;
  suggestions: string[];
}

interface WritingAssistantProps {
  onAssistance: (data: any) => void;
}

export function WritingAssistant({ onAssistance }: WritingAssistantProps) {
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<WritingAnalysis | null>(null);
  const [realTimeCheck, setRealTimeCheck] = useState(true);
  const [industry, setIndustry] = useState('technology');
  const [toneLevel, setToneLevel] = useState('professional');

  // Real-time analysis with debounce
  useEffect(() => {
    if (!realTimeCheck || !content.trim()) return;

    const timer = setTimeout(() => {
      performQuickAnalysis();
    }, 1000);

    return () => clearTimeout(timer);
  }, [content, realTimeCheck]);

  const performQuickAnalysis = async () => {
    if (!content.trim()) return;

    const quickAnalysis = await simulateWritingAnalysis(content, false);
    setAnalysis(quickAnalysis);
  };

  const performFullAnalysis = async () => {
    if (!content.trim()) {
      toast.error('Please enter some text to analyze');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const fullAnalysis = await simulateWritingAnalysis(content, true);
      setAnalysis(fullAnalysis);
      
      onAssistance({
        type: 'writing-assistance',
        analysis: fullAnalysis,
        summary: {
          overallScore: fullAnalysis.overallScore,
          issuesFound: fullAnalysis.issues.length,
          keyMetrics: [
            `${fullAnalysis.wordCount} words`,
            `${fullAnalysis.atsScore}% ATS score`,
            `${fullAnalysis.readabilityScore}% readability`
          ]
        }
      });
      
      toast.success('Writing analysis complete!', {
        description: `Found ${fullAnalysis.issues.length} suggestions for improvement`
      });
    } catch (error) {
      toast.error('Analysis failed', {
        description: 'Please try again or contact support.'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const simulateWritingAnalysis = async (text: string, detailed: boolean): Promise<WritingAnalysis> => {
    // Simulate processing time
    if (detailed) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const words = text.split(/\s+/).filter(word => word.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const wordCount = words.length;
    const sentenceCount = sentences.length;
    const avgWordsPerSentence = sentenceCount > 0 ? Math.round(wordCount / sentenceCount) : 0;

    // Detect passive voice
    const passivePatterns = /\b(was|were|is|are|been|being)\s+\w+ed\b/gi;
    const passiveMatches = text.match(passivePatterns) || [];
    const passiveVoiceCount = passiveMatches.length;

    // Generate issues
    const issues: WritingIssue[] = [];

    // Grammar issues
    if (text.includes('there is') || text.includes('there are')) {
      issues.push({
        type: 'style',
        severity: 'suggestion',
        message: 'Consider using more direct language',
        suggestion: 'Replace "there is/are" constructions with more active language',
        position: { start: 0, end: 10 }
      });
    }

    // Passive voice
    if (passiveVoiceCount > 0) {
      issues.push({
        type: 'passive',
        severity: 'warning',
        message: `Found ${passiveVoiceCount} instances of passive voice`,
        suggestion: 'Convert to active voice for stronger impact',
        position: { start: 0, end: 10 }
      });
    }

    // Length issues
    if (avgWordsPerSentence > 25) {
      issues.push({
        type: 'length',
        severity: 'warning',
        message: 'Some sentences are too long',
        suggestion: 'Break long sentences into shorter, clearer ones',
        position: { start: 0, end: 10 }
      });
    }

    // ATS issues
    if (text.includes('&') || text.includes('#')) {
      issues.push({
        type: 'ats',
        severity: 'error',
        message: 'Special characters may cause ATS parsing issues',
        suggestion: 'Replace special characters with words (& → and)',
        position: { start: 0, end: 10 }
      });
    }

    // Calculate scores
    const readabilityScore = Math.max(0, 100 - (avgWordsPerSentence - 15) * 2);
    const atsScore = Math.max(0, 100 - issues.filter(i => i.type === 'ats').length * 20);
    const professionalTone = Math.max(0, 100 - passiveVoiceCount * 5);
    const overallScore = Math.round((readabilityScore + atsScore + professionalTone) / 3);

    return {
      overallScore,
      readabilityScore: Math.round(readabilityScore),
      atsScore: Math.round(atsScore),
      professionalTone: Math.round(professionalTone),
      issues,
      wordCount,
      sentenceCount,
      avgWordsPerSentence,
      passiveVoiceCount,
      suggestions: [
        'Use strong action verbs to start bullet points',
        'Include specific metrics and numbers',
        'Maintain consistent tense throughout',
        'Avoid personal pronouns (I, me, my)',
        'Use industry-specific keywords naturally'
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

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'grammar':
      case 'spelling':
        return AlertTriangle;
      case 'style':
      case 'passive':
        return Info;
      case 'length':
        return TrendingUp;
      case 'ats':
        return Target;
      default:
        return Info;
    }
  };

  const getIssueColor = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'suggestion':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
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
          Writing Assistant
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Advanced grammar, style, and ATS optimization for your resume content
        </p>
      </div>

      {/* Settings */}
      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2 text-gray-600" />
            Analysis Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Industry Focus</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Tone Level</Label>
              <Select value={toneLevel} onValueChange={setToneLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="conversational">Conversational</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Real-time Analysis</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={realTimeCheck}
                  onCheckedChange={setRealTimeCheck}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {realTimeCheck ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Input */}
      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <PenTool className="w-5 h-5 mr-2 text-blue-600" />
              Content Analysis
            </span>
            {analysis && (
              <Badge className={getScoreColor(analysis.overallScore)}>
                Score: {analysis.overallScore}%
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">Resume Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your resume content here for analysis..."
              rows={12}
              className="resize-none font-mono text-sm"
            />
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>
                {content.split(/\s+/).filter(word => word.length > 0).length} words, {' '}
                {content.split(/[.!?]+/).filter(s => s.trim().length > 0).length} sentences
              </span>
              {realTimeCheck && analysis && (
                <span className="text-green-600">
                  <CheckCircle className="w-4 h-4 inline mr-1" />
                  Real-time analysis active
                </span>
              )}
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={performFullAnalysis}
              disabled={!content.trim() || isAnalyzing}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Full Analysis
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <Separator />
          
          {/* Score Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className={`border-0 shadow-lg ${getScoreBg(analysis.overallScore)}`}>
              <CardContent className="p-4 text-center">
                <div className={`text-2xl font-bold ${getScoreColor(analysis.overallScore)} mb-1`}>
                  {analysis.overallScore}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Overall Score</div>
                <Progress value={analysis.overallScore} className="h-2 mt-2" />
              </CardContent>
            </Card>
            
            <Card className={`border-0 shadow-lg ${getScoreBg(analysis.readabilityScore)}`}>
              <CardContent className="p-4 text-center">
                <div className={`text-2xl font-bold ${getScoreColor(analysis.readabilityScore)} mb-1`}>
                  {analysis.readabilityScore}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Readability</div>
                <Progress value={analysis.readabilityScore} className="h-2 mt-2" />
              </CardContent>
            </Card>
            
            <Card className={`border-0 shadow-lg ${getScoreBg(analysis.atsScore)}`}>
              <CardContent className="p-4 text-center">
                <div className={`text-2xl font-bold ${getScoreColor(analysis.atsScore)} mb-1`}>
                  {analysis.atsScore}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">ATS Score</div>
                <Progress value={analysis.atsScore} className="h-2 mt-2" />
              </CardContent>
            </Card>
            
            <Card className={`border-0 shadow-lg ${getScoreBg(analysis.professionalTone)}`}>
              <CardContent className="p-4 text-center">
                <div className={`text-2xl font-bold ${getScoreColor(analysis.professionalTone)} mb-1`}>
                  {analysis.professionalTone}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Professional Tone</div>
                <Progress value={analysis.professionalTone} className="h-2 mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Writing Statistics */}
          <Card className="border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-green-600" />
                Writing Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {analysis.wordCount}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {analysis.sentenceCount}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Sentences</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {analysis.avgWordsPerSentence}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Words/Sentence</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {analysis.passiveVoiceCount}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Passive Voice</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Issues and Suggestions */}
          {analysis.issues.length > 0 && (
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                    Issues Found ({analysis.issues.length})
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(analysis.issues.map(i => i.suggestion).join('\n'))}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.issues.map((issue, index) => {
                    const Icon = getIssueIcon(issue.type);
                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${getIssueColor(issue.severity)}`}
                      >
                        <div className="flex items-start space-x-3">
                          <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium capitalize">
                                {issue.type} {issue.severity}
                              </h4>
                              <Badge variant="outline" className="text-xs">
                                {issue.type}
                              </Badge>
                            </div>
                            <p className="text-sm mb-2">{issue.message}</p>
                            <p className="text-sm font-medium">
                              Suggestion: {issue.suggestion}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* General Suggestions */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-blue-600" />
                Writing Improvement Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start">
                    <span className="w-6 h-6 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {suggestion}
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