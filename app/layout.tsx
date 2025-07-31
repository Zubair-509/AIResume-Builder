import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { PageTransition } from '@/components/ui/page-transition';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { Toaster } from '@/components/ui/sonner';
import { PagePreloader } from '@/components/ui/page-preloader';
import { PageLoader } from '@/components/ui/page-loader';
import { LenisProvider } from '@/components/ui/lenis-provider';
import { ErrorBoundary } from '@/components/ui/error-boundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SnapCV - AI-Powered Resume Builder',
  description: 'Create professional resumes in minutes with our AI-powered builder. Stand out from the crowd with beautiful, ATS-friendly designs.',
  keywords: 'resume builder, CV creator, AI resume, professional resume, job application',
  authors: [{ name: 'SnapCV Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            <PagePreloader />
            <PageLoader />
            <ErrorBoundary>
              <PageTransition>
                {children}
              </PageTransition>
            </ErrorBoundary>
            <ScrollToTop />
            <Toaster />
          </LenisProvider>
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('unhandledrejection', function(event) {
                console.error('Unhandled promise rejection:', event.reason);
                event.preventDefault();
              });

              window.addEventListener('error', function(event) {
                console.error('Global error:', event.error);
              });
            `
          }}
        />
      </body>
    </html>
  );
}