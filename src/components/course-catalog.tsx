
"use client";

import { useState } from 'react';
import { AiSuggestion } from './ai-suggestion';
import { CourseCard } from './course-card';
import type { Course } from '@/lib/courses';
import { ProgressTracker } from './progress-tracker';
import { useAuth } from '@/hooks/use-auth';

export function CourseCatalog({ courses, learningModules, isAuthenticated }: { courses: Course[], learningModules: Course[], isAuthenticated: boolean }) {
  const [highlighted, setHighlighted] = useState<string[]>([]);
  
  const handleSuggestions = (suggestions: string[]) => {
    const allCourses = [...courses, ...learningModules];
    const matchingCourseNames = allCourses
        .filter(t => suggestions.some(s => t.name.toLowerCase().includes(s.toLowerCase().replace(/['"]+/g, ''))))
        .map(t => t.name);
    
    setHighlighted(matchingCourseNames);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
            <AiSuggestion onSuggestions={handleSuggestions} />
        </div>
        <div className="lg:col-span-1">
            <ProgressTracker />
        </div>
      </div>
      
      {learningModules.length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-black font-headline text-foreground mb-6">Modul Belajar</h3>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 items-stretch">
              {learningModules.map((course) => (
                <div
                  key={course.id}
                  className="transition-all duration-500"
                >
                  <CourseCard
                    course={course}
                    isHighlighted={highlighted.some(h => h.toLowerCase() === course.name.toLowerCase())}
                    isAuthenticated={isAuthenticated}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {courses.length > 0 && (
         <div className="mt-16">
          <h3 className="text-2xl font-black font-headline text-foreground mb-6">Latihan Kuis</h3>
           <div className="max-w-5xl mx-auto">
             <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 items-stretch">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="transition-all duration-500"
                >
                  <CourseCard
                    course={course}
                    isHighlighted={highlighted.some(h => h.toLowerCase() === course.name.toLowerCase())}
                    isAuthenticated={isAuthenticated}
                  />
                </div>
              ))}
            </div>
           </div>
         </div>
      )}

    </div>
  );
}
