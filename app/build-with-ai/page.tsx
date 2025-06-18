import { AIResumeBuilder } from '@/components/ai-resume-builder/ai-resume-builder';
import { Navigation } from '@/components/navigation';

export default function BuildWithAIPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="pt-16">
        <AIResumeBuilder />
      </div>
    </main>
  );
}