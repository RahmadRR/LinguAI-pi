"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { AuthGuard } from '@/components/auth-guard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, XCircle, RefreshCw, Star } from 'lucide-react';
import { COURSES, LEARNING_MODULES } from '@/lib/courses';
import type { Course } from '@/lib/courses';
import { LESSONS_CONTENT } from '@/lib/lessons';
import type { LessonContent, QuizQuestion } from '@/lib/lessons';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { useSavedCourses } from '@/hooks/use-saved-courses';

type SelectionStatus = 'correct' | 'incorrect' | 'unselected';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const levelId = params.levelId as string;
  const { addLesson } = useSavedCourses();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [lesson, setLesson] = useState<LessonContent | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [status, setStatus] = useState<SelectionStatus>('unselected');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const allCourses = [...COURSES, ...LEARNING_MODULES];
    const foundCourse = allCourses.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      const foundLesson = LESSONS_CONTENT.find(l => l.courseId === courseId && l.levelId === levelId);
      if (foundLesson) {
        setLesson(foundLesson);
      } else {
        console.warn(`No lesson content for course: ${courseId}, level: ${levelId}`);
        router.push(`/course/${courseId}`); 
      }
    } else {
      router.push('/');
    }
  }, [courseId, levelId, router]);

  const handleAnswerSelect = (answer: string) => {
    if (status !== 'unselected') return; 

    setSelectedAnswer(answer);
    const currentQuestion = lesson?.quiz[currentQuestionIndex];
    if (currentQuestion && answer === currentQuestion.correctAnswer) {
      setStatus('correct');
      setCorrectAnswers(prev => prev + 1);
    } else {
      setStatus('incorrect');
    }
  };

  const handleNext = () => {
    if (lesson && currentQuestionIndex < lesson.quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      resetQuestionState();
    } else {
      setIsFinished(true);
      addLesson(courseId, levelId);
    }
  };
  
  const handleRetryQuiz = () => {
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setIsFinished(false);
    resetQuestionState();
  }

  const handleRetryQuestion = () => {
    resetQuestionState();
  };

  const resetQuestionState = () => {
    setSelectedAnswer(null);
    setStatus('unselected');
  }

  const progressPercentage = lesson ? (currentQuestionIndex / lesson.quiz.length) * 100 : 0;
  const currentQuestion = lesson?.quiz[currentQuestionIndex];
  
  const getButtonClass = (option: string) => {
    if (status === 'unselected') {
      return 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
    }
    if (option === selectedAnswer) {
      return status === 'correct' 
        ? 'bg-green-500 hover:bg-green-500/90 text-white' 
        : 'bg-red-500 hover:bg-red-500/90 text-white';
    }
    if (option === currentQuestion?.correctAnswer) {
        return 'bg-green-500 hover:bg-green-500/90 text-white';
    }
    return 'bg-secondary text-secondary-foreground opacity-50';
  }

  const renderQuestionText = (questionText: string, answer: string | null) => {
      const parts = questionText.split('{blank}');
      if (parts.length < 2) return <p className="text-xl whitespace-pre-line">{questionText}</p>;

      const blankContent = answer ? (
          <span className="font-bold text-primary underline underline-offset-4">{answer}</span>
      ) : (
          <span className="font-bold text-muted-foreground">.........</span>
      );

      return (
          <p className="text-xl whitespace-pre-line">
              {parts[0]}
              {blankContent}
              {parts[1]}
          </p>
      )
  }

  if (!course || !lesson || !currentQuestion) {
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
  
  if (isFinished) {
    return (
        <AuthGuard>
            <div className="flex min-h-screen flex-col bg-background">
                <Header />
                <main className="flex-1 p-4 md:p-8">
                    <div className="container mx-auto max-w-2xl flex items-center justify-center min-h-[60vh]">
                        <Card className="border-2 shadow-lg w-full text-center">
                            <CardHeader>
                                <div className="mx-auto bg-yellow-400 p-4 rounded-full w-fit mb-4">
                                  <Star className="h-10 w-10 text-white fill-white"/>
                                </div>
                                <CardTitle className="text-4xl font-black">Latihan Selesai!</CardTitle>
                                <CardDescription className="text-base">Kamu menyelesaikan {correctAnswers} dari {lesson.quiz.length} pertanyaan dengan benar.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Progress value={(correctAnswers/lesson.quiz.length) * 100} className="h-4"/>
                            </CardContent>
                            <CardFooter className="flex-col sm:flex-row gap-4">
                                <Button onClick={handleRetryQuiz} className="w-full" variant="outline">
                                    <RefreshCw className="mr-2 h-4 w-4"/>
                                    Coba Lagi
                                </Button>
                                <Button asChild className="w-full">
                                    <Link href={`/course/${courseId}`}>
                                        <CheckCircle className="mr-2 h-4 w-4"/>
                                        Lanjut
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
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
          <div className="container mx-auto max-w-2xl">
            <div className="mb-4 flex items-center justify-between">
                <Link href={`/course/${courseId}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    Kembali
                </Link>
                <div className="text-sm font-bold text-muted-foreground">
                    {currentQuestionIndex + 1} / {lesson.quiz.length}
                </div>
            </div>
            
            <Progress value={progressPercentage} className="mb-6 h-2" />

            <Card className="border-2 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-black font-headline">{lesson.title}</CardTitle>
                    <CardDescription className="text-base">Pilih jawaban yang paling tepat.</CardDescription>
                </CardHeader>

                <CardContent className="space-y-8 min-h-[250px]">
                    <div className="p-6 bg-secondary rounded-lg min-h-[100px] flex items-center justify-center">
                        {renderQuestionText(currentQuestion.question, selectedAnswer)}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {currentQuestion.options.map((option, index) => (
                        <Button
                            key={index}
                            onClick={() => handleAnswerSelect(option)}
                            className={cn("text-base justify-start h-auto py-3", getButtonClass(option))}
                            disabled={status !== 'unselected'}
                        >
                            {option}
                        </Button>
                        ))}
                    </div>
                </CardContent>

                <CardFooter className="flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                        {status === 'correct' && (
                            <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle className="h-6 w-6"/>
                                <p className="font-bold text-lg">Jawaban Benar!</p>
                            </div>
                        )}
                        {status === 'incorrect' && (
                            <div className="flex items-center gap-2 text-red-600">
                                <XCircle className="h-6 w-6"/>
                                <p className="font-bold text-lg">Hampir Benar!</p>
                            </div>
                        )}
                    </div>

                    {status !== 'unselected' && (
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <Button onClick={handleRetryQuestion} variant="outline">
                                Ulangi
                            </Button>
                            <Button 
                                onClick={handleNext} 
                                className="w-full sm:w-auto uppercase"
                                size="lg"
                            >
                            {currentQuestionIndex < lesson.quiz.length - 1 ? 'Lanjut' : 'Selesai'}
                            </Button>
                        </div>
                    )}
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
