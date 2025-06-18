'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Sparkles, 
  Loader2, 
  CheckCircle, 
  TrendingUp,
  Target,
  Zap,
  Copy,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface BulletPoint {
  id: string;
  original: string;
  enhanced: string;
  metrics: {
    wordCount: number;
    actionVerbs: number;
    quantifiers: number;
    starCompliance: number;
  };
}

interface BulletPointEnhancerProps {
  onEnhancement: (data: any) => void;
}

export function BulletPointEnhancer({ onEnhancement }: BulletPointEnhancerProps) {
  const [bulletPoints, setBulletPoints] = useState<BulletPoint[]>([
    { id: '1', original: '', enhanced: '', metrics: { wordCount: 0, actionVerbs: 0, quantifiers: 0, starCompliance: 0 } }
  ]);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedCount, setEnhancedCount] = useState(0);

  const addBulletPoint = () => {
    const newBullet: BulletPoint = {
      id: Date.now().toString(),
      original: '',
      enhanced: '',
      metrics: { wordCount: 0, actionVerbs: 0, quantifiers: 0, starCompliance: 0 }
    };
    setBulletPoints([...bulletPoints, newBullet]);
  };

  const removeBulletPoint = (id: string) => {
    if (bulletPoints.length > 1) {
      setBulletPoints(bulletPoints.filter(bp => bp.id !== id));
    }
  };

  const updateBulletPoint = (id: string, field: 'original' | 'enhanced', value: string) => {
    setBulletPoints(bulletPoints.map(bp => 
      bp.id === id ? { ...bp, [field]: value } : bp
    ));
  };

  const enhanceBulletPoint = async (id: string) => {
    const bulletPoint = bulletPoints.find(bp => bp.id === id);
    if (!bulletPoint || !bulletPoint.original.trim()) return;

    setIsEnhancing(true);
    
    try {
      // Simulate AI enhancement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const enhanced = await simulateAIEnhancement(bulletPoint.original);
      const metrics = calculateMetrics(enhanced);
      
      setBulletPoints(bulletPoints.map(bp => 
        bp.id === id ? { ...bp, enhanced, metrics } : bp
      ));
      
      setEnhancedCount(prev => prev + 1);
      
      toast.success('Bullet point enhanced!', {
        description: 'Your bullet point has been transformed using AI.'
      });
    } catch (error) {
      toast.error('Enhancement failed', {
        description: 'Please try again or contact support.'
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  const enhanceAllBulletPoints = async () => {
    const validBullets = bulletPoints.filter(bp => bp.original.trim());
    if (validBullets.length === 0) return;

    setIsEnhancing(true);
    
    try {
      const enhancedBullets = await Promise.all(
        bulletPoints.map(async (bp) => {
          if (!bp.original.trim()) return bp;
          
          const enhanced = await simulateAIEnhancement(bp.original);
          const metrics = calculateMetrics(enhanced);
          return { ...bp, enhanced, metrics };
        })
      );
      
      setBulletPoints(enhancedBullets);
      setEnhancedCount(validBullets.length);
      
      onEnhancement({
        type: 'bullet-enhancement',
        bulletPoints: enhancedBullets,
        summary: {
          total: validBullets.length,
          avgImprovement: 85,
          keyMetrics: ['Action verbs increased', 'Quantifiable results added', 'STAR method applied']
        }
      });
      
      toast.success(`Enhanced ${validBullets.length} bullet points!`, {
        description: 'All your bullet points have been transformed using AI.'
      });
    } catch (error) {
      toast.error('Enhancement failed', {
        description: 'Please try again or contact support.'
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  const simulateAIEnhancement = async (original: string): Promise<string> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Enhanced examples based on common patterns
    const enhancements = {
      'managed team': 'Led cross-functional team of 8 developers, resulting in 40% faster project delivery and 25% reduction in bug reports through implementation of agile methodologies and code review processes',
      'improved performance': 'Optimized application performance by implementing caching strategies and database indexing, achieving 60% reduction in page load times and improving user satisfaction scores from 3.2 to 4.7/5',
      'increased sales': 'Drove revenue growth by developing and executing targeted marketing campaigns, resulting in 35% increase in quarterly sales ($2.3M to $3.1M) and 50% improvement in customer acquisition rate',
      'reduced costs': 'Implemented cost optimization initiatives across operations, achieving $500K annual savings through process automation and vendor renegotiation while maintaining service quality standards',
      'developed software': 'Architected and developed scalable web application using React and Node.js, serving 10,000+ daily active users with 99.9% uptime and processing over 1M transactions monthly'
    };
    
    // Find the best match or create a generic enhancement
    const lowerOriginal = original.toLowerCase();
    for (const [key, enhancement] of Object.entries(enhancements)) {
      if (lowerOriginal.includes(key)) {
        return enhancement;
      }
    }
    
    // Generic enhancement pattern
    return `Executed ${original.toLowerCase()} initiative, delivering measurable results through strategic implementation and stakeholder collaboration, resulting in improved operational efficiency and enhanced business outcomes with quantifiable impact on key performance indicators`;
  };

  const calculateMetrics = (text: string) => {
    const words = text.split(/\s+/).length;
    const actionVerbs = (text.match(/\b(led|managed|developed|implemented|optimized|achieved|delivered|executed|created|designed|improved|increased|reduced|streamlined|coordinated|facilitated)\b/gi) || []).length;
    const quantifiers = (text.match(/\b(\d+%|\$[\d,]+|\d+[kmb]?|\d+x|over \d+|up to \d+)\b/gi) || []).length;
    const starCompliance = Math.min(100, (actionVerbs * 20) + (quantifiers * 15) + (words > 20 ? 20 : 0));
    
    return {
      wordCount: words,
      actionVerbs,
      quantifiers,
      starCompliance
    };
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
          Bullet Point Enhancement
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Transform basic bullet points into compelling achievement statements using the STAR method
        </p>
      </div>

      {/* Enhancement Stats */}
      {enhancedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{enhancedCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Enhanced</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">85%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Improvement</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">92%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">STAR Score</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">+40%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Impact</div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Bullet Points */}
      <div className="space-y-6">
        <AnimatePresence>
          {bulletPoints.map((bulletPoint, index) => (
            <motion.div
              key={bulletPoint.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border border-gray-200 dark:border-gray-700">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <Target className="w-5 h-5 mr-2 text-blue-600" />
                      Bullet Point {index + 1}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      {bulletPoint.enhanced && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Enhanced
                        </Badge>
                      )}
                      {bulletPoints.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBulletPoint(bulletPoint.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Original Input */}
                  <div className="space-y-2">
                    <Label htmlFor={`original-${bulletPoint.id}`}>
                      Original Bullet Point
                    </Label>
                    <Textarea
                      id={`original-${bulletPoint.id}`}
                      value={bulletPoint.original}
                      onChange={(e) => updateBulletPoint(bulletPoint.id, 'original', e.target.value)}
                      placeholder="Enter your basic bullet point (e.g., 'Managed team', 'Improved performance', 'Increased sales')"
                      rows={2}
                      className="resize-none"
                    />
                  </div>

                  {/* Enhancement Button */}
                  <div className="flex justify-center">
                    <Button
                      onClick={() => enhanceBulletPoint(bulletPoint.id)}
                      disabled={!bulletPoint.original.trim() || isEnhancing}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      {isEnhancing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Enhancing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Enhance with AI
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Enhanced Output */}
                  {bulletPoint.enhanced && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Enhanced Bullet Point</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(bulletPoint.enhanced)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                            {bulletPoint.enhanced}
                          </p>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            {bulletPoint.metrics.wordCount}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Words</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-lg font-bold text-blue-600">
                            {bulletPoint.metrics.actionVerbs}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Action Verbs</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="text-lg font-bold text-green-600">
                            {bulletPoint.metrics.quantifiers}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Quantifiers</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <div className="text-lg font-bold text-purple-600">
                            {bulletPoint.metrics.starCompliance}%
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">STAR Score</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          onClick={addBulletPoint}
          variant="outline"
          className="border-dashed border-2 hover:border-blue-500 hover:text-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Bullet Point
        </Button>
        
        <Button
          onClick={enhanceAllBulletPoints}
          disabled={bulletPoints.every(bp => !bp.original.trim()) || isEnhancing}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
          size="lg"
        >
          {isEnhancing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Enhancing All...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Enhance All Bullet Points
            </>
          )}
        </Button>
      </div>

      {/* Tips */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Enhancement Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Start with action verbs like "Led", "Implemented", "Optimized"</span>
            </div>
            <div className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Include specific numbers, percentages, and metrics</span>
            </div>
            <div className="flex items-start">
              <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Follow STAR method: Situation, Task, Action, Result</span>
            </div>
            <div className="flex items-start">
              <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Focus on achievements and impact, not just responsibilities</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}