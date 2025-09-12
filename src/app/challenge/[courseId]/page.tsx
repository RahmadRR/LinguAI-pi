"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { AuthGuard } from '@/components/auth-guard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle, XCircle, RefreshCw, Star, Loader2, AlertCircle, Zap } from 'lucide-react';
import { COURSES } from '@/lib/courses';
import type { Course } from '@/lib/courses';
import { generateQuiz, type GenerateQuizOutput } from '@/ai/flows/generate-quiz';
import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

type QuizQuestion = GenerateQuizOutput['quiz'][0];
type SelectionStatus = 'correct' | 'incorrect' | 'unselected';

function ChallengeCompletionCard({ course, correctAnswers, totalQuestions, onRetry }: { course: Course, correctAnswers: number, totalQuestions: number, onRetry: () => void }) {
    return (
        <Card className="border-2 shadow-lg w-full text-center">
            <CardHeader>
                <div className="mx-auto bg-yellow-400 p-4 rounded-full w-fit mb-4">
                  <Star className="h-10 w-10 text-white fill-white"/>
                </div>
                <CardTitle className="text-4xl font-black">Challenge Complete!</CardTitle>
                <CardDescription className="text-base">You got {correctAnswers} out of {totalQuestions} questions right.</CardDescription>
            </CardHeader>
            <CardContent>
                <Progress value={(correctAnswers/totalQuestions) * 100} className="h-4 mt-6"/>
            </CardContent>
            <CardFooter className="flex-col sm:flex-row gap-4">
                <Button onClick={onRetry} className="w-full" variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4"/>
                    New Challenge
                </Button>
                <Button asChild className="w-full">
                    <Link href="/">
                        <CheckCircle className="mr-2 h-4 w-4"/>
                        Done
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

export default function ChallengeQuizPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [quizContent, setQuizContent] = useState<GenerateQuizOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [status, setStatus] = useState<SelectionStatus>('unselected');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const fetchQuiz = useCallback(async (courseName: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateQuiz({ courseName });
      setQuizContent(result);
    } catch (e: any) {
      console.error(e);
      let errorMessage = "Failed to generate quiz. The AI might be busy. Please try again in a moment.";
      if (e.message?.includes('503') || e.message?.includes('overloaded')) {
           errorMessage = "The AI is currently overloaded due to high demand. Please try again in a few moments."
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const foundCourse = COURSES.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      fetchQuiz(foundCourse.name);
    } else {
      router.push('/');
    }
  }, [courseId, router, fetchQuiz]);

  const handleAnswerSelect = (answer: string) => {
    if (status !== 'unselected') return;

    setSelectedAnswer(answer);
    const currentQuestion = quizContent?.quiz[currentQuestionIndex];
    if (currentQuestion && answer === currentQuestion.correctAnswer) {
      setStatus('correct');
      setCorrectAnswers(prev => prev + 1);
    } else {
      setStatus('incorrect');
    }
  };

  const handleNext = () => {
    if (quizContent && currentQuestionIndex < quizContent.quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      resetQuestionState();
    } else {
      setIsFinished(true);
    }
  };
  
  const handleRetry = () => {
     if(course) {
        setCorrectAnswers(0);
        setIsFinished(false);
        resetQuestionState();
        setCurrentQuestionIndex(0);
        fetchQuiz(course.name);
     }
  }

  const resetQuestionState = () => {
    setSelectedAnswer(null);
    setStatus('unselected');
  }

  const progressPercentage = quizContent ? (currentQuestionIndex / quizContent.quiz.length) * 100 : 0;
  const currentQuestion = quizContent?.quiz[currentQuestionIndex];
  
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

  if (isLoading) {
    return (
        <AuthGuard>
            <div className="flex min-h-screen flex-col bg-background">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center p-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                    <p className="text-lg text-muted-foreground">Lingu is preparing your challenge...</p>
                </main>
            </div>
        </AuthGuard>
    );
  }

  if (error) {
     return (
        <AuthGuard>
            <div className="flex min-h-screen flex-col bg-background">
                <Header />
                 <main className="flex-1 p-4 md:p-8">
                    <div className="container mx-auto max-w-4xl">
                        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Courses
                        </Link>
                         <Card className="border-2 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl font-black">Error</CardTitle>
                                <CardDescription>Could not load the challenge quiz.</CardDescription>
                            </CardHeader>
                             <CardContent>
                                 <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Request Failed</AlertTitle>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                             </CardContent>
                             <CardFooter>
                                <Button onClick={handleRetry} className="w-full">
                                    <RefreshCw className="mr-2 h-4 w-4"/>
                                    Try Again
                                </Button>
                             </CardFooter>
                         </Card>
                    </div>
                </main>
            </div>
        </AuthGuard>
      )
  }
  
  if (isFinished) {
    return (
        <AuthGuard>
            <div className="flex min-h-screen flex-col bg-background">
                <Header />
                <main className="flex-1 p-4 md:p-8">
                    <div className="container mx-auto max-w-2xl flex items-center justify-center min-h-[60vh]">
                        {course && quizContent && (
                            <ChallengeCompletionCard 
                                course={course}
                                correctAnswers={correctAnswers}
                                totalQuestions={quizContent.quiz.length}
                                onRetry={handleRetry}
                            />
                        )}
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
                <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Link>
                <div className="text-sm font-bold text-muted-foreground">
                    {currentQuestionIndex + 1} / {quizContent?.quiz.length}
                </div>
            </div>
            
            <Progress value={progressPercentage} className="mb-6 h-2" />

            <Card className="border-2 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-black font-headline flex items-center gap-2">
                        <Zap className="h-7 w-7 text-yellow-500"/>
                        Tantangan Lingu! : {quizContent?.title}
                    </CardTitle>
                    <CardDescription className="text-base">Choose the best answer for the question.</CardDescription>
                </CardHeader>

                <CardContent className="space-y-8 min-h-[250px]">
                    <div className="p-6 bg-secondary rounded-lg min-h-[100px] flex items-center justify-center">
                        {currentQuestion && renderQuestionText(currentQuestion.question, selectedAnswer)}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {currentQuestion?.options.map((option, index) => (
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
                                <p className="font-bold text-lg">Correct!</p>
                            </div>
                        )}
                        {status === 'incorrect' && (
                            <div className="flex items-center gap-2 text-red-600">
                                <XCircle className="h-6 w-6"/>
                                <p className="font-bold text-lg">Almost!</p>
                            </div>
                        )}
                    </div>

                    {status !== 'unselected' && (
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <Button onClick={resetQuestionState} variant="outline">
                                Retry
                            </Button>
                            <Button 
                                onClick={handleNext} 
                                className="w-full sm:w-auto uppercase"
                                size="lg"
                            >
                            {quizContent && currentQuestionIndex < quizContent.quiz.length - 1 ? 'Next' : 'Finish'}
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
