import { ResumeForm } from '@/components/resume-builder/resume-form';
import { Navigation } from '@/components/navigation';

export default function ResumeBuilderPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <ResumeForm />
      </div>
    </main>
  );
}