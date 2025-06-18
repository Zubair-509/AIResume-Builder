import { TemplateGallery } from '@/components/resume-templates/template-gallery';
import { Navigation } from '@/components/navigation';

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <TemplateGallery />
        </div>
      </div>
    </main>
  );
}