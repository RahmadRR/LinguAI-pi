
"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from 'next/link';
import { ArrowLeft, Edit, AlertCircle } from 'lucide-react';
import { AuthGuard } from '@/components/auth-guard';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/lib/firebase';

const passwordFormSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required.'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters.'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});


export default function UserPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [tempUsername, setTempUsername] = useState('');

  const [passwordError, setPasswordError] = useState<string | null>(null);

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (user) {
      setTempUsername(user.displayName || '');
    }
  }, [user]);

  const hasPasswordProvider = user?.providerData.some(
    (provider) => provider.providerId === 'password'
  );

  const handleSaveChanges = async () => {
    if (!auth || !auth.currentUser) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "You must be logged in to edit your profile.",
        });
        return;
    }
    
    try {
        await updateProfile(auth.currentUser, {
            displayName: tempUsername
        });
        
        toast({
            title: "Success!",
            description: "Your profile has been updated.",
        });
        setIsEditProfileOpen(false);
        // We don't need to update a local state, useAuth hook will trigger a re-render
    } catch (error) {
        console.error("Profile Update Error:", error);
        toast({
            variant: "destructive",
            title: "Update Failed",
            description: "Could not update your profile. Please try again.",
        });
    }
  };
  
  const handleEditProfileOpenChange = (open: boolean) => {
    setIsEditProfileOpen(open);
    if (open) {
      setTempUsername(user?.displayName || '');
    }
  };

  const handleChangePasswordOpenChange = (open: boolean) => {
    setIsChangePasswordOpen(open);
    if (!open) {
        passwordForm.reset();
        setPasswordError(null);
    }
  }

  const onChangePasswordSubmit = async (values: z.infer<typeof passwordFormSchema>) => {
    setPasswordError(null);
    if (!user || !auth) {
        setPasswordError("You must be logged in to change your password.");
        return;
    }
    if (!user.email) {
        setPasswordError("Cannot change password for users without a registered email.");
        return;
    }

    try {
        const credential = EmailAuthProvider.credential(user.email, values.currentPassword);
        await reauthenticateWithCredential(user, credential);
        
        await updatePassword(user, values.newPassword);
        
        toast({
            title: "Success!",
            description: "Your password has been changed successfully.",
        });
        
        passwordForm.reset();
        setIsChangePasswordOpen(false);
    } catch (error: any) {
        console.error("Password Change Error:", error.code);
        switch (error.code) {
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                passwordForm.setError("currentPassword", { type: "manual", message: "The current password you entered is incorrect." });
                break;
            case 'auth/weak-password':
                passwordForm.setError("newPassword", { type: "manual", message: "The new password is too weak. Please use at least 6 characters." });
                break;
            default:
                setPasswordError("An unexpected error occurred. Please try again.");
                break;
        }
    }
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 p-4 md:p-8">
          <div className="container mx-auto max-w-2xl">
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </Link>
            <Card className="border-2 shadow-lg">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24 border-4 border-primary">
                    <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'} />
                    <AvatarFallback>{user?.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-2xl font-black">{user?.displayName || 'User'}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6 border-t">
                 <h3 className="text-lg font-semibold text-center">Account Settings</h3>
                 <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <Dialog open={isEditProfileOpen} onOpenChange={handleEditProfileOpenChange}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                Nama
                                </Label>
                                <Input
                                id="name"
                                value={tempUsername}
                                onChange={(e) => setTempUsername(e.target.value)}
                                className="col-span-3"
                                />
                            </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">Batalkan</Button>
                                </DialogClose>
                                <Button type="submit" onClick={handleSaveChanges}>Simpan</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                     {hasPasswordProvider && (
                        <Dialog open={isChangePasswordOpen} onOpenChange={handleChangePasswordOpenChange}>
                            <DialogTrigger asChild>
                                <Button variant="outline">Change Password</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Change Your Password</DialogTitle>
                                    <DialogDescription>
                                        Enter your current and new password below.
                                    </DialogDescription>
                                </DialogHeader>
                                {passwordError && (
                                    <Alert variant="destructive" className="mb-4">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>
                                        {passwordError}
                                    </AlertDescription>
                                    </Alert>
                                )}
                                <Form {...passwordForm}>
                                    <form onSubmit={passwordForm.handleSubmit(onChangePasswordSubmit)} className="space-y-4">
                                    <FormField
                                        control={passwordForm.control}
                                        name="currentPassword"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Password</FormLabel>
                                            <FormControl>
                                            <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={passwordForm.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                            <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={passwordForm.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm New Password</FormLabel>
                                            <FormControl>
                                            <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                    <DialogFooter className="mt-6">
                                        <DialogClose asChild>
                                            <Button type="button" variant="secondary">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit" disabled={passwordForm.formState.isSubmitting}>
                                            {passwordForm.formState.isSubmitting ? 'Changing...' : 'Change Password'}
                                        </Button>
                                    </DialogFooter>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                     )}
                 </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
