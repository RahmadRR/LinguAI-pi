
import type { Metadata } from 'next';
import { AuthProvider } from '@/hooks/use-auth';
import { SavedCoursesProvider } from '@/hooks/use-saved-courses';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

export const metadata: Metadata = {
  title: 'LinguAI',
  description: 'AI-Powered Interface Template Suggestions',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
          <AuthProvider>
            <SavedCoursesProvider>
              {children}
            </SavedCoursesProvider>
          </AuthProvider>
          <Toaster />
      </body>
    </html>
  );
}
