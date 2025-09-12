
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useSavedCourses } from '@/hooks/use-saved-courses';
import { COURSES } from '@/lib/courses';
import { BookOpen } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { useAuth } from '@/hooks/use-auth';

export function ProgressTracker() {
  const { isAuthenticated } = useAuth();
  const { getCourseProgress, overallProgress, totalStartedCourses } = useSavedCourses();

  const displayOverallProgress = isAuthenticated ? overallProgress : 0;
  
  const startedCourses = isAuthenticated ? COURSES.filter(course => getCourseProgress(course.id) > 0) : [];
  const unstartedCourses = COURSES.filter(course => getCourseProgress(course.id) === 0);


  return (
    <div className="max-w-3xl my-8">
    <Card className="border-2 shadow-lg h-[60vh] flex flex-col">
      <CardHeader className="p-4 border-b">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Progres kamu
        </CardTitle>
        <CardDescription>
            {Math.round(displayOverallProgress)}% dari semua materi telah diselesaikan.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 flex-grow flex flex-col gap-4 overflow-hidden">
        <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-semibold text-foreground">Progress Total</p>
                <p className="text-sm font-bold text-primary">{Math.round(displayOverallProgress)}%</p>
            </div>
            <Progress value={displayOverallProgress} className="w-full h-3" />
        </div>
        
        <ScrollArea className="flex-grow pr-4">
            <div className='space-y-4'>
            {!isAuthenticated ? (
                 <p className="text-muted-foreground text-center pt-8">Login untuk melihat progresmu!</p>
            ) : totalStartedCourses === 0 ? (
                <p className="text-muted-foreground text-center pt-8">Kamu belum mulai kursus!</p>
            ) : (
                <>
                {startedCourses.map(course => {
                    const progress = getCourseProgress(course.id);
                    return (
                        <div key={course.id}>
                            <div className='flex justify-between items-center mb-1'>
                                <p className="text-sm font-semibold text-foreground">{course.name}</p>
                                <p className="text-sm font-bold text-primary">{Math.round(progress)}%</p>
                            </div>
                            <Progress value={progress} className="w-full h-2" />
                        </div>
                    )
                })}
                {unstartedCourses.length > 0 && startedCourses.length > 0 && <hr className='my-6'/>}
                </>
            )}

            {isAuthenticated && unstartedCourses.map(course => (
                 <div key={course.id} className="opacity-60">
                    <div className='flex justify-between items-center mb-1'>
                        <p className="text-sm font-semibold text-muted-foreground">{course.name}</p>
                        <p className="text-sm font-bold text-muted-foreground">0%</p>
                    </div>
                    <Progress value={0} className="w-full h-2" />
                </div>
            ))}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
    </div>
  );
}
