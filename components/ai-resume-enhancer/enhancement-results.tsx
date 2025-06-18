'use client';

import { motion } from 'framer-motion';
import { 
  Download, 
  Share2, 
  Copy, 
  CheckCircle, 
  TrendingUp,
  Target,
  Sparkles,
  FileText,
  BarChart3,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface EnhancementResultsProps {
  data: any;
}

export function EnhancementResults({ data }: EnhancementResultsProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy text');
    }
  };

  const downloadReport = () => {
    const reportContent = generateReport(data);
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-enhancement-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Report downloaded successfully!');
  };

  const generateReport = (data: any) => {
    let report = `RESUME ENHANCEMENT REPORT\n`;
    report += `Generated on: ${new Date().toLocaleDateString()}\n`;
    report += `Enhancement Type: ${data.type}\n\n`;

    if (data.type === 'bullet-enhancement') {
      report += `BULLET POINT ENHANCEMENT RESULTS\n`;
      report += `================================\n\n`;
      report += `Total Bullet Points Enhanced: ${data.summary.total}\n`;
      report += `Average Improvement: ${data.summary.avgImprovement}%\n\n`;
      
      data.bulletPoints.forEach((bp: any, index: number) => {
        if (bp.enhanced) {
          report += `Bullet Point ${index + 1}:\n`;
          report += `Original: ${bp.original}\n`;
          report += `Enhanced: ${bp.enhanced}\n`;
          report += `Metrics: ${bp.metrics.wordCount} words, ${bp.metrics.actionVerbs} action verbs, ${bp.metrics.quantifiers} quantifiers\n\n`;
        }
      });
    }

    if (data.type === 'job-matching') {
      report += `JOB MATCHING ANALYSIS\n`;
      report += `====================\n\n`;
      report += `Overall Match Score: ${data.result.overallScore}%\n`;
      report += `Technical Skills Score: ${data.result.technicalSkills.score}%\n`;
      report += `Soft Skills Score: ${data.result.softSkills.score}%\n`;
      report += `Keywords Score: ${data.result.keywords.score}%\n\n`;
      
      report += `RECOMMENDATIONS:\n`;
      data.result.recommendations.forEach((rec: string, index: number) => {
        report += `${index + 1}. ${rec}\n`;
      });
    }

    if (data.type === 'writing-assistance') {
      report += `WRITING ANALYSIS RESULTS\n`;
      report += `=======================\n\n`;
      report += `Overall Score: ${data.analysis.overallScore}%\n`;
      report += `Readability Score: ${data.analysis.readabilityScore}%\n`;
      report += `ATS Score: ${data.analysis.atsScore}%\n`;
      report += `Professional Tone: ${data.analysis.professionalTone}%\n\n`;
      
      report += `STATISTICS:\n`;
      report += `Word Count: ${data.analysis.wordCount}\n`;
      report += `Sentence Count: ${data.analysis.sentenceCount}\n`;
      report += `Average Words per Sentence: ${data.analysis.avgWordsPerSentence}\n`;
      report += `Passive Voice Instances: ${data.analysis.passiveVoiceCount}\n\n`;
      
      if (data.analysis.issues.length > 0) {
        report += `ISSUES FOUND:\n`;
        data.analysis.issues.forEach((issue: any, index: number) => {
          report += `${index + 1}. ${issue.type} (${issue.severity}): ${issue.message}\n`;
          report += `   Suggestion: ${issue.suggestion}\n`;
        });
      }
    }

    return report;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bullet-enhancement':
        return Sparkles;
      case 'job-matching':
        return Target;
      case 'writing-assistance':
        return FileText;
      default:
        return CheckCircle;
    }
  };

  const getTypeTitle = (type: string) => {
    switch (type) {
      case 'bullet-enhancement':
        return 'Bullet Point Enhancement Results';
      case 'job-matching':
        return 'Job Matching Analysis Results';
      case 'writing-assistance':
        return 'Writing Analysis Results';
      default:
        return 'Enhancement Results';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'bullet-enhancement':
        return 'from-blue-500 to-cyan-500';
      case 'job-matching':
        return 'from-green-500 to-emerald-500';
      case 'writing-assistance':
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const TypeIcon = getTypeIcon(data.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card className={`border-0 shadow-2xl bg-gradient-to-r ${getTypeColor(data.type)} text-white`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <TypeIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  {getTypeTitle(data.type)}
                </h2>
                <p className="opacity-90">
                  Enhancement completed successfully
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold mb-1">
                <CheckCircle className="w-8 h-8 inline mr-2" />
                Complete
              </div>
              <div className="text-sm opacity-75">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.summary.keyMetrics?.map((metric: string, index: number) => (
          <Card key={index} className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {metric}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Results */}
      {data.type === 'bullet-enhancement' && data.bulletPoints && (
        <Card className="border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
              Enhanced Bullet Points
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {data.bulletPoints.filter((bp: any) => bp.enhanced).map((bp: any, index: number) => (
              <div key={bp.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    Bullet Point {index + 1}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(bp.enhanced)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Original
                    </Label>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {bp.original}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Enhanced
                    </Label>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {bp.enhanced}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{bp.metrics.wordCount}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Words</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{bp.metrics.actionVerbs}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Action Verbs</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{bp.metrics.quantifiers}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Quantifiers</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">{bp.metrics.starCompliance}%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">STAR Score</div>
                  </div>
                </div>
                
                {index < data.bulletPoints.filter((bp: any) => bp.enhanced).length - 1 && (
                  <Separator />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {data.type === 'job-matching' && data.result && (
        <Card className="border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-600" />
                Job Matching Score
              </span>
              <Badge className="text-lg px-3 py-1">
                {data.result.overallScore}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {data.result.technicalSkills.score}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Technical Skills</div>
                <Progress value={data.result.technicalSkills.score} className="h-2 mt-2" />
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {data.result.softSkills.score}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Soft Skills</div>
                <Progress value={data.result.softSkills.score} className="h-2 mt-2" />
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {data.result.keywords.score}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Keywords</div>
                <Progress value={data.result.keywords.score} className="h-2 mt-2" />
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {data.result.experience.score}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Experience</div>
                <Progress value={data.result.experience.score} className="h-2 mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {data.type === 'writing-assistance' && data.analysis && (
        <Card className="border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-purple-600" />
                Writing Analysis Score
              </span>
              <Badge className="text-lg px-3 py-1">
                {data.analysis.overallScore}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {data.analysis.readabilityScore}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Readability</div>
                <Progress value={data.analysis.readabilityScore} className="h-2 mt-2" />
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {data.analysis.atsScore}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">ATS Score</div>
                <Progress value={data.analysis.atsScore} className="h-2 mt-2" />
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {data.analysis.professionalTone}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Professional Tone</div>
                <Progress value={data.analysis.professionalTone} className="h-2 mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          onClick={downloadReport}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          size="lg"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          className="border-2"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Results
        </Button>
      </div>

      {/* Achievement Badge */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Enhancement Complete!
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Your resume has been successfully enhanced using AI. Apply these improvements to stand out from the competition.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className || ''}`}>
      {children}
    </label>
  );
}