
"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { AuthGuard } from '@/components/auth-guard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Book, BookCopy, BookUp, BrainCircuit } from 'lucide-react';
import { LEARNING_MODULES } from '@/lib/courses';
import type { Course } from '@/lib/courses';
import { useEffect, useState } from 'react';

// This page is specifically for the 'English Basic Course' module.
export default function CourseModulesPage() {
  const router = useRouter();
  // Hardcoded course ID for this specific page
  const courseId = 'module-basic';
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const foundCourse = LEARNING_MODULES.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      // If for some reason the course is not found, redirect to home
      console.error(`Course with id '${courseId}' not found in LEARNING_MODULES.`);
      router.push('/');
    }
  }, [router]);

  if (!course) {
    return (
        <AuthGuard>
            <div className="flex min-h-screen flex-col bg-background">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <p>Loading...</p>
                </main>
            </div>
        </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 p-4 md:p-8">
          <div className="container mx-auto max-w-5xl">
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Latihan Kuis
            </Link>
            <Card className="border-2 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-black font-headline">{course.name}</CardTitle>
                <CardDescription className="text-base">Silakan pilih Modul yang ingin Anda pelajari.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link href={`/course/module-basic/beginner`} className="w-full">
                        <Card className="flex flex-col items-center p-6 text-center hover:bg-secondary/50 transition-colors cursor-pointer h-full">
                            <Book className="h-10 w-10 text-yellow-400 mb-4"/>
                            <h3 className="text-xl font-bold mb-2">Beginner</h3>
                            <h4 className="text-lg font-semibold mb-2"> (A1) </h4>
                             <p className="text-sm text-muted-foreground mb-4 flex-grow">Noun, Verb, dan Pronouns.</p>
                            <Button className="w-full uppercase mt-auto">Pilih</Button>
                        </Card>
                    </Link>
                     <Link href={`/course/module-basic/elementary`} className="w-full">
                        <Card className="flex flex-col items-center p-6 text-center hover:bg-secondary/50 transition-colors cursor-pointer h-full">
                            <BookCopy className="h-10 w-10 text-sky-500 mb-4"/>
                            <h3 className="text-xl font-bold mb-2">Elementary</h3>
                            <h4 className="text-xl font-bold mb-2"> (A2) </h4>
                             <p className="text-sm text-muted-foreground mb-4 flex-grow">Tenses dasar dan Instructions</p>
                            <Button className="w-full uppercase mt-auto">Pilih</Button>
                        </Card>
                     </Link>
                     <Link href={`/course/module-basic/intermediate`} className="w-full">
                        <Card className="flex flex-col items-center p-6 text-center hover:bg-secondary/50 transition-colors cursor-pointer h-full">
                            <BrainCircuit className="h-10 w-10 text-orange-500 mb-4"/>
                            <h3 className="text-xl font-bold mb-2">Intermediate</h3>
                            <h4 className="text-xl font-bold mb-2">B1-B2</h4>
                             <p className="text-sm text-muted-foreground mb-4 flex-grow">Perfect Tenses, Conditional, Grammar, dan Active - Passive voice.</p>
                            <Button className="w-full uppercase mt-auto">Pilih</Button>
                        </Card>
                     </Link>
                     <Link href={`/course/module-basic/advanced`} className="w-full">
                        <Card className="flex flex-col items-center p-6 text-center hover:bg-secondary/50 transition-colors cursor-pointer h-full">
                            <BookUp className="h-10 w-10 text-emerald-500 mb-4"/>
                            <h3 className="text-xl font-bold mb-2">Advanced</h3>
                            <h4 className="text-xl font-bold mb-2">C1-C2</h4>
                             <p className="text-sm text-muted-foreground mb-4 flex-grow">Asah keahlianmu ke tingkat mahir dengan materi kompleks.</p>
                            <Button className="w-full uppercase mt-auto">Pilih</Button>
                        </Card>
                     </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
