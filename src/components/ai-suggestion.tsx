
"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { chat } from '@/ai/flows/chat';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Sparkles, Loader2, User, Bot, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { OwlIcon } from './header';

const formSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty.'),
});

type Message = {
  id: number;
  role: 'user' | 'assistant';
  text: string;
};

type AiSuggestionProps = {
  onSuggestions: (suggestions: string[]) => void;
};

const initialMessage: Message = { 
  id: 1, 
  role: 'assistant', 
  text: "Hey there! I'm Lingu, your AI pal. What do you want to work on with your English today?" 
};

export function AiSuggestion({ onSuggestions }: AiSuggestionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleNewChat = () => {
    setMessages([initialMessage]);
    onSuggestions([]);
    form.reset();
  };


  async function onSubmit(values: z.infer<typeof formSchema>) {
    const userMessage: Message = { id: Date.now(), role: 'user', text: values.message };
    setMessages(prev => [...prev, userMessage]);
    form.reset();
    setIsLoading(true);

    try {
      const result = await chat({ message: values.message });
      const assistantMessage: Message = { id: Date.now() + 1, role: 'assistant', text: result.response };
      setMessages(prev => [...prev, assistantMessage]);
      onSuggestions(result.relevantCourses);
    } catch (error: any) {
      console.error("AI Chat Error:", error);
      const errorMessage = error.message || '';
      let toastDescription = 'Could not get a response. Please try again.';
      
      if (errorMessage.includes('429')) {
        toastDescription = "Lingu is very popular right now! The AI has reached its request limit. Please check your billing plan (Blaze is recommended) and try again in a moment.";
      } else if (errorMessage.includes('API key not valid')) {
        toastDescription = "The API key is invalid. Please check your configuration in Secret Manager.";
      } else if (errorMessage.includes('503') || errorMessage.includes('overloaded')) {
        toastDescription = "The AI service is currently overloaded. Please try again in a few moments.";
      }

      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: toastDescription,
      });
      
      // Remove the user's message if the AI fails to respond
      setMessages(prev => prev.filter(m => m.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="my-8">
      <Card className="border-2 shadow-lg h-[60vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary"/>
                Tanyakan Pada Lingu!
            </CardTitle>
            <Button variant="outline" size="sm" onClick={handleNewChat}>
                <RefreshCw className="mr-2 h-4 w-4"/>
                Obrolan Baru
            </Button>
        </CardHeader>
        <CardContent className="p-6 flex-grow flex flex-col overflow-hidden">
          <ScrollArea className="flex-grow mb-4 pr-4" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={cn(
                    "flex items-start gap-4",
                    message.role === 'user' ? "justify-end" : "justify-start"
                )}>
                  {message.role === 'assistant' && (
                    <Avatar className="w-10 h-10 border-2 border-primary">
                        <div className="w-full h-full flex items-center justify-center bg-primary">
                          <OwlIcon className="w-6 h-6 text-primary-foreground" />
                        </div>
                    </Avatar>
                  )}
                  <div className={cn(
                      "rounded-lg px-4 py-3 max-w-[80%] text-base",
                      message.role === 'user' ? "bg-primary text-primary-foreground rounded-br-none" : "bg-secondary text-secondary-foreground rounded-bl-none"
                  )}>
                    <p>{message.text}</p>
                  </div>
                  {message.role === 'user' && (
                     <Avatar className="w-10 h-10 border-2 border-muted">
                        <AvatarFallback><User/></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-start gap-4 justify-start">
                    <Avatar className="w-10 h-10 border-2 border-primary">
                         <div className="w-full h-full flex items-center justify-center bg-primary">
                          <OwlIcon className="w-6 h-6 text-primary-foreground" />
                        </div>
                    </Avatar>
                    <div className="rounded-lg px-4 py-3 max-w-[80%] bg-secondary text-secondary-foreground rounded-bl-none">
                        <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                 </div>
              )}
            </div>
          </ScrollArea>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2 pt-4 border-t">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        className="text-base"
                        placeholder="Tanya apa saja ke Lingu..."
                        {...field}
                        autoComplete="off"
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} size="icon" className="h-11 w-11 flex-shrink-0">
                 <Send className="h-5 w-5" />
                 <span className="sr-only">Send</span>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
