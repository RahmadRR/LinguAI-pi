
'use server';
/**
 * @fileOverview A flow for generating quiz questions.
 *
 * - generateQuiz - A function that creates a quiz based on a course topic.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { QuizQuestionSchema } from '@/lib/lessons';
import { googleAI } from '@genkit-ai/googleai';

const GenerateQuizInputSchema = z.object({
  courseName: z.string().describe('The name of the course to generate a quiz for (e.g., "Daily Conversation", "Grammar", "Vocabulary").'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const GenerateQuizOutputSchema = z.object({
  title: z.string().describe("A relevant title for the quiz. The title should be a concise summary of the topic (e.g., 'Advanced Tenses', 'Conversation Starters') and should NOT include generic prefixes like 'Quiz:'."),
  quiz: z.array(QuizQuestionSchema).length(5).describe("An array of exactly 5 quiz questions."),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizInputSchema},
  output: {schema: GenerateQuizOutputSchema},
  model: googleAI.model('gemini-1.5-pro-latest'),
  prompt: `You are an expert English teacher creating a fun and accessible pop quiz. The user wants a quiz based on the course topic: {{{courseName}}}.

Generate a quiz with a creative, relevant, and concise title, along with exactly 5 multiple-choice questions. The title should be a short phrase summarizing the topic. For example, for "Daily Conversation", a good title is "Social Scenarios". Avoid generic prefixes like "Quiz:".

The questions and answer options should use simple and easy-to-understand language. They should be clear and straightforward, focusing on core concepts of the topic rather than obscure details. Each question must have exactly 3 options. Ensure one of the options is the correct answer.
`,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
