"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OwlIcon } from '@/components/header';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { user, isLoading } = useAuth();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!auth) {
        setError("Firebase is not configured. Please check your environment variables.");
        return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error: any) {
      console.error("Firebase Login Error:", error); // Log the full error
      switch (error.code) {
        case 'auth/user-not-found':
          setError("No user found with this email.");
          break;
        case 'auth/wrong-password':
          setError("Incorrect password. Please try again.");
          break;
        case 'auth/invalid-email':
           setError("The email address is not valid.");
           break;
        case 'auth/invalid-credential':
           setError("Invalid credentials. Please check your email and password.");
           break;
        case 'auth/invalid-api-key':
            setError("Invalid API Key. Please check your Firebase configuration in the .env file.");
            break;
        default:
          setError(`An unexpected error occurred. Please try again. (Code: ${error.code})`);
          break;
      }
    }
  };

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/');
    }
    if (!isFirebaseConfigured()) {
        setError("Firebase configuration is missing. Please add your credentials to the .env file.");
    }
  }, [user, isLoading, router]);

  if (isLoading || (!isLoading && user)) {
    return null; // Or show a loading spinner
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <div className="flex items-center gap-3 mb-8">
          <OwlIcon className="h-12 w-12 text-primary" />
          <h1 className="font-headline text-4xl font-black text-primary tracking-tighter">
            LinguAI
          </h1>
        </div>
      <Card className="w-full max-w-sm border-2 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-black">Welcome Back!</CardTitle>
          <CardDescription>Log in to continue your learning journey.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
             <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full uppercase text-lg font-bold" size="lg">
                Log In
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-bold text-primary underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
