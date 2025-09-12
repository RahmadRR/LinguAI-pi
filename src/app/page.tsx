
"use client";

import { Header } from '@/components/header';
import { CourseCatalog } from '@/components/course-catalog';
import { COURSES, LEARNING_MODULES } from '@/lib/courses';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';


export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          <CourseCatalog 
            courses={COURSES} 
            learningModules={LEARNING_MODULES}
            isAuthenticated={isAuthenticated}
          />
        </main>
      </div>
  );
}
