"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { AuthGuard } from '@/components/auth-guard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle } from 'lucide-react';
import { STATIC_LESSONS_CONTENT } from '@/lib/lessons';
import type { StaticLessonContent } from '@/lib/lessons';
import { LEARNING_MODULES } from '@/lib/courses';
import type { Course } from '@/lib/courses';
import { useSavedCourses } from '@/hooks/use-saved-courses';

export default function StaticLessonPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = 'module-basic'; // Hardcoded for this route
  const levelId = params.levelId as string;
  const { addLesson } = useSavedCourses();

  const [course, setCourse] = useState<Course | null>(null);
  const [lesson, setLesson] = useState<StaticLessonContent | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const foundCourse = LEARNING_MODULES.find(c => c.id === courseId);
    setCourse(foundCourse || null);

    const foundLesson = STATIC_LESSONS_CONTENT.find(l => l.courseId === courseId && l.levelId === levelId);
    setLesson(foundLesson || null);

    if (!foundCourse || !foundLesson) {
       notFound();
    }
  }, [courseId, levelId]);

  const handleNext = () => {
    if (lesson && currentPage < lesson.pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    } else {
      setIsFinished(true);
      addLesson(courseId, levelId);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };
  
  if (!lesson || !course) {
    return (
        <AuthGuard>
            <div className="flex min-h-screen flex-col bg-background">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <p>Memuat...</p>
                </main>
            </div>
        </AuthGuard>
    );
  }

  const progressPercentage = (currentPage + 1) / lesson.pages.length * 100;
  
  if (isFinished) {
    return (
      <AuthGuard>
        <div className="flex min-h-screen flex-col bg-background">
          <Header />
          <main className="flex-1 p-4 md:p-8 flex items-center justify-center">
            <Card className="w-full max-w-2xl text-center border-2 shadow-lg">
              <CardHeader>
                <div className="mx-auto bg-green-500 p-4 rounded-full w-fit mb-4">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-4xl font-black">Materi Selesai!</CardTitle>
                <CardDescription className="text-base">Kamu telah menyelesaikan materi {lesson.title}.</CardDescription>
              </CardHeader>
              <CardFooter>
                 <Button asChild className="w-full">
                    <Link href={`/course/module-basic`}>
                        <ArrowLeft className="mr-2 h-4 w-4"/>
                        Kembali ke Pilihan Level
                    </Link>
                </Button>
              </CardFooter>
            </Card>
          </main>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 p-4 md:p-8">
          <div className="container mx-auto max-w-4xl">
             <div className="mb-4 flex items-center justify-between">
                <Link href="/course/module-basic" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Level
                </Link>
                <div className="text-sm font-bold text-muted-foreground">
                    Halaman {currentPage + 1} dari {lesson.pages.length}
                </div>
            </div>
             <Progress value={progressPercentage} className="mb-6 h-2" />
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-black font-headline flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-primary"/>
                  {lesson.title}
                </CardTitle>
                 <CardDescription className="text-base">{lesson.pages[currentPage].subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg whitespace-pre-line leading-relaxed">
                  {lesson.pages[currentPage].content}
                </p>
                {lesson.pages[currentPage].tableHtml && (
                  <div 
                    className="mt-4 prose"
                    dangerouslySetInnerHTML={{ __html: lesson.pages[currentPage].tableHtml! }} 
                  />
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack} disabled={currentPage === 0}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali
                </Button>
                <Button onClick={handleNext}>
                  {currentPage === lesson.pages.length - 1 ? 'Selesai' : 'Lanjut'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
//src/app/course/[courseId]/level/[levelId]/page.tsx