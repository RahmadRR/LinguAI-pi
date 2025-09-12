
"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BookOpen, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSavedCourses } from '@/hooks/use-saved-courses';
import type { Course } from '@/lib/courses';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Link from 'next/link';
import { Progress } from './ui/progress';

type CourseCardProps = {
  course: Course;
  isHighlighted?: boolean;
  isAuthenticated: boolean;
};

export function CourseCard({ course, isHighlighted = false, isAuthenticated }: CourseCardProps) {
  const { getCourseProgress } = useSavedCourses();
  const router = useRouter();
  const courseProgress = getCourseProgress(course.id);
  const isComingSoon = course.id === 'coming-soon';
  const isModule = course.id.startsWith('module-');

  const handleInteraction = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      router.push('/login');
    }
  };

  const CardComponent = (
    <Card className={cn(
        "overflow-visible transition-all duration-300 hover:-translate-y-2 flex flex-col h-full border-2 shadow-lg",
        isHighlighted ? "border-accent" : "",
        isComingSoon ? "opacity-70 cursor-default" : "cursor-pointer"
      )}>
      <div className="relative group p-4">
        <div className='bg-secondary rounded-lg'>
          <Image
            src={course.image}
            alt={`Preview of ${course.name}`}
            width={600}
            height={400}
            className="w-full object-cover aspect-[3/4] rounded-lg"
          />
        </div>
      </div>
        <CardContent className="p-4 pt-0 flex-grow flex flex-col">
          <h3 className="font-headline text-xl font-black text-foreground mb-2">{course.name}</h3>
          <p className="text-sm text-muted-foreground mt-1 flex-grow">{course.description}</p>
          {!isComingSoon && isAuthenticated && (
            <div className="mt-4">
              <Progress value={courseProgress} className="h-2"/>
              <p className="text-xs text-muted-foreground mt-1 text-right">{Math.round(courseProgress)}%</p>
            </div>
          )}
        </CardContent>
    </Card>
  );

  if (isComingSoon) {
    return CardComponent;
  }
  
  // Determine the correct link for the "Mulai Belajar" button
  const startLearningLink = isModule ? `/course/module-basic` : `/course/${course.id}`;
  
  return (
    <Dialog onOpenChange={(open) => {
        if (open && !isAuthenticated) {
           router.push('/login');
        }
    }}>
      <DialogTrigger asChild onClick={handleInteraction}>
        <div className="h-full">
          {CardComponent}
        </div>
      </DialogTrigger>
      {isAuthenticated && (
        <DialogContent className="max-w-lg p-6">
            <DialogHeader className="mb-4">
                <DialogTitle className="font-headline text-3xl font-black text-foreground">{course.name}</DialogTitle>
                <DialogDescription className="text-base text-muted-foreground">
                    {course.description}
                </DialogDescription>
            </DialogHeader>
            <div className="mb-6">
                <Image 
                    src={course.image}
                    alt={`Preview of ${course.name}`}
                    width={800}
                    height={450}
                    className="w-full rounded-lg object-cover"
                />
            </div>
            <p className="mb-8 text-base text-foreground/80 leading-relaxed">
               Ayo mulai perjalanan belajarmu sekarang!.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="w-full uppercase" size="lg">
                  <Link href={startLearningLink}>
                    <BookOpen className="mr-2 h-5 w-5"/>
                    Mulai Belajar
                  </Link>
                </Button>
                {!isModule && (
                  <Button asChild variant="outline" className="w-full uppercase" size="lg">
                      <Link href={`/challenge/${course.id}`}>
                        <Zap className="mr-2 h-5 w-5"/>
                        Kuis Tantangan
                      </Link>
                  </Button>
                )}
            </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
