
"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { COURSES, LEARNING_MODULES } from '@/lib/courses';
import { useAuth } from './use-auth';

// Structure to hold progress for each course
type CourseProgress = {
  [courseId: string]: {
    completedLessons: string[];
  };
};

type SavedCoursesContextType = {
  progress: CourseProgress;
  addLesson: (courseId: string, lessonId: string) => void;
  getCourseProgress: (courseId: string) => number;
  isStarted: (courseId: string) => boolean;
  totalStartedCourses: number;
  overallProgress: number;
};

const SavedCoursesContext = createContext<SavedCoursesContextType | undefined>(undefined);

export function useSavedCourses() {
  const context = useContext(SavedCoursesContext);
  if (!context) {
    throw new Error('useSavedCourses must be used within a SavedCoursesProvider');
  }
  return context;
}

export function SavedCoursesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<CourseProgress>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load progress from localStorage when the component mounts or user changes
  useEffect(() => {
    setIsLoading(true);
    if (user && typeof window !== 'undefined') {
      const savedProgress = localStorage.getItem(`progress_${user.uid}`);
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      } else {
        setProgress({});
      }
    } else {
      // If no user, reset progress
      setProgress({});
    }
    setIsLoading(false);
  }, [user]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (user && typeof window !== 'undefined' && !isLoading) {
      localStorage.setItem(`progress_${user.uid}`, JSON.stringify(progress));
    }
  }, [progress, user, isLoading]);

  const addLesson = useCallback((courseId: string, lessonId: string) => {
    setProgress((prev) => {
      const newProgress = JSON.parse(JSON.stringify(prev)); // Deep copy
      if (!newProgress[courseId]) {
        newProgress[courseId] = { completedLessons: [] };
      }
      if (!newProgress[courseId].completedLessons.includes(lessonId)) {
        newProgress[courseId].completedLessons.push(lessonId);
      }
      return newProgress;
    });
  }, []);

  const getCourseProgress = useCallback((courseId: string): number => {
    const allCourses = [...COURSES, ...LEARNING_MODULES];
    const course = allCourses.find(c => c.id === courseId);

    // If the course doesn't exist or has no lessons, progress is 0.
    if (!course || !course.lessons || course.lessons.length === 0) {
      return 0;
    }

    // Get the total lessons dynamically from the course object.
    const totalLessons = course.lessons.length;
    const courseData = progress[courseId];

    if (!courseData) {
      return 0;
    }

    // Calculate the percentage based on completed lessons vs total lessons.
    return (courseData.completedLessons.length / totalLessons) * 100;
  }, [progress]);

  const isStarted = useCallback((courseId: string): boolean => {
    return !!progress[courseId] && progress[courseId].completedLessons.length > 0;
  }, [progress]);
  
  const totalStartedCourses = Object.keys(progress).filter(courseId => progress[courseId]?.completedLessons.length > 0).length;

  const overallProgress = useCallback(() => {
    const allCourses = [...COURSES, ...LEARNING_MODULES];
    if (allCourses.length === 0) return 0;

    const totalProgress = allCourses.reduce((sum, course) => {
      return sum + getCourseProgress(course.id);
    }, 0);

    return totalProgress / allCourses.length;
  }, [getCourseProgress])();


  return (
    <SavedCoursesContext.Provider value={{ progress, addLesson, getCourseProgress, isStarted, totalStartedCourses, overallProgress }}>
      {!isLoading && children}
    </SavedCoursesContext.Provider>
  );
}
