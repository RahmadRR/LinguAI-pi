
"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { AuthGuard } from '@/components/auth-guard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Book, BookCopy, BookUp } from 'lucide-react';
import { COURSES, LEARNING_MODULES } from '@/lib/courses';
import type { Course } from '@/lib/courses';
import { useEffect, useState } from 'react';

export default function CourseModulesPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const allCourses = [...COURSES, ...LEARNING_MODULES];
    const foundCourse = allCourses.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      router.push('/');
    }
  }, [courseId, router]);

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
          <div className="container mx-auto max-w-4xl">
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Latihan Kuis
            </Link>
            <Card className="border-2 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-black font-headline">{course.name}</CardTitle>
                <CardDescription className="text-base">Silakan pilih level kesulitan yang ingin Anda pelajari.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href={`/course/${course.id}/level/beginner`} className="w-full">
                        <Card className="flex flex-col items-center p-6 text-center hover:bg-secondary/50 transition-colors cursor-pointer h-full">
                            <Book className="h-10 w-10 text-yellow-400 mb-4"/>
                            <h3 className="text-xl font-bold mb-2">Pemula</h3>
                             <p className="text-sm text-muted-foreground mb-4 flex-grow">Materi dasar untuk membangun fondasi yang kuat.</p>
                            <Button className="w-full uppercase mt-auto">Pilih</Button>
                        </Card>
                    </Link>
                     <Link href={`/course/${course.id}/level/intermediate`} className="w-full">
                        <Card className="flex flex-col items-center p-6 text-center hover:bg-secondary/50 transition-colors cursor-pointer h-full">
                            <BookCopy className="h-10 w-10 text-sky-500 mb-4"/>
                            <h3 className="text-xl font-bold mb-2">Menengah</h3>
                             <p className="text-sm text-muted-foreground mb-4 flex-grow">Lanjutkan pembelajaran dengan topik yang lebih menantang.</p>
                            <Button className="w-full uppercase mt-auto">Pilih</Button>
                        </Card>
                     </Link>
                     <Link href={`/course/${course.id}/level/advanced`} className="w-full">
                        <Card className="flex flex-col items-center p-6 text-center hover:bg-secondary/50 transition-colors cursor-pointer h-full">
                            <BookUp className="h-10 w-10 text-emerald-500 mb-4"/>
                            <h3 className="text-xl font-bold mb-2">Lanjutan</h3>
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
