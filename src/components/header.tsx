"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, LogOut, Settings, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

// A new logo of an owl.
export const OwlIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
    <path d="M0 0 C0.886875 0.37125 1.77375 0.7425 2.6875 1.125 C3.8321875 1.558125 3.8321875 1.558125 5 2 C5.99 1.34 6.98 0.68 8 0 C11.68722891 -0.4809429 13.56074794 -0.22917499 16.875 1.5 C19.46112004 4.54249417 19.69304215 6.20253508 19.41015625 10.09765625 C19 12 19 12 17.5 14.4375 C14.534891 16.29069313 12.33865311 16.52260303 8.90625 16.78515625 C6.6218691 17.04261721 4.94236223 17.78602361 3 19 C2.34 18.34 1.68 17.68 1 17 C-1.55003461 16.41848873 -4.10136649 16.04732449 -6.6875 15.66015625 C-9 15 -9 15 -11 12 C-11.3350232 8.98479121 -11.56604719 6.90026242 -11 4 C-7.6783057 0.09212435 -5.01542208 -0.62692776 0 0 Z M-7.25 3.125 C-9.3301708 4.96341029 -9.3301708 4.96341029 -9.25 8.1875 C-9.1675 9.115625 -9.085 10.04375 -9 11 C-8.67 11 -8.34 11 -8 11 C-7.34 9.02 -6.68 7.04 -6 5 C-3.36 5 -0.72 5 2 5 C0.7511573 3.4166747 0.7511573 3.4166747 -1 2 C-4.82297795 1.7018576 -4.82297795 1.7018576 -7.25 3.125 Z M6.6875 3.625 C4.6786808 5.93972306 4.6786808 5.93972306 5.125 9.125 C5.78308824 12.09681373 5.78308824 12.09681373 8 14 C11.08347826 14.16681109 11.08347826 14.16681109 14 14 C14 13.67 14 13.34 14 13 C12.02 12.34 10.04 11.68 8 11 C8 9.02 8 7.04 8 5 C10.64 5 13.28 5 16 5 C14.7511573 3.4166747 14.7511573 3.4166747 13 2 C9.074402 1.61670299 9.074402 1.61670299 6.6875 3.625 Z M-5 6 C-5 7.32 -5 8.64 -5 10 C-3.68 10 -2.36 10 -1 10 C-1 9.34 -1 8.68 -1 8 C-1.66 8 -2.32 8 -3 8 C-3 7.34 -3 6.68 -3 6 C-3.66 6 -4.32 6 -5 6 Z M2 6 C1.608125 6.969375 1.21625 7.93875 0.8125 8.9375 C-1 12 -1 12 -3.6875 12.875 C-4.450625 12.91625 -5.21375 12.9575 -6 13 C-6 13.33 -6 13.66 -6 14 C-3.12586875 14.33397787 -3.12586875 14.33397787 0 14 C2.05945016 12.36549876 2.05945016 12.36549876 3 10 C2.78282648 7.79199472 2.78282648 7.79199472 2 6 Z M9 6 C9.33 7.65 9.66 9.3 10 11 C11.32 10.34 12.64 9.68 14 9 C12.62514468 7.45833358 12.62514468 7.45833358 11 6 C10.34 6 9.68 6 9 6 Z M16 8 C17 11 17 11 17 11 Z M-8 11 C-8 11.66 -8 12.32 -8 13 C-7.34 12.67 -6.68 12.34 -6 12 C-6.66 11.67 -7.32 11.34 -8 11 Z M15 11 C14.67 11.66 14.34 12.32 14 13 C14.66 13 15.32 13 16 13 C15.67 12.34 15.34 11.68 15 11 Z M3 13 C3 13.99 3 14.98 3 16 C3.66 16 4.32 16 5 16 C5 15.01 5 14.02 5 13 C4.34 13 3.68 13 3 13 Z " fill="#FFFFFF" transform="translate(12,6)"/>
  </svg>
  
);


export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Handle visibility on scroll down/up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true); // Hide on scroll down
      } else {
        setIsHidden(false); // Show on scroll up
      }

      // Handle shrink effect
      if (currentScrollY > 20) { // Start scroll effect a bit earlier
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header className={cn(
      "bg-header sticky top-0 z-50 transition-all duration-300 ease-in-out",
      "lg:top-4 lg:mx-4 lg:rounded-lg", // Added for rounded corners on larger screens
      isScrolled ? 'h-16 shadow-lg' : 'h-20',
      isHidden ? '-translate-y-[150%]' : 'translate-y-0' // Adjusted to hide completely with margin
    )}>
      <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <OwlIcon className={cn(
            "text-primary-foreground transition-all duration-300",
            isScrolled ? "h-8 w-8" : "h-10 w-10"
          )} />
          <h1 className={cn(
            "font-headline font-black text-primary-foreground tracking-tighter transition-all duration-300",
            isScrolled ? "text-2xl" : "text-3xl"
          )}>
            LinguAI
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full text-primary-foreground hover:bg-white/20 hover:text-primary-foreground p-2 flex items-center gap-2">
                        {user && <span className="font-bold text-base hidden md:inline">{user.displayName}</span>}
                         <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.photoURL || undefined} alt={user?.displayName || 'User'} />
                            <AvatarFallback>
                                <User className="h-5 w-5" />
                            </AvatarFallback>
                        </Avatar>
                        <span className="sr-only">User Menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href="/user">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <Button asChild variant="secondary">
                <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Log In
                </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
