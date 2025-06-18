import { ResumeEnhancer } from '@/components/ai-resume-enhancer/resume-enhancer';
import { Navigation } from '@/components/navigation';

export default function EnhanceResumePage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="pt-16">
        <ResumeEnhancer />
      </div>
    </main>
  );
}