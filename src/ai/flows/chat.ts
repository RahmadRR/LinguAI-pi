'use server';
/**
 * @fileOverview A conversational AI agent for course recommendations.
 *
 * - chat - A function that handles the conversational interaction.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import {z} from 'zod';

const ChatInputSchema = z.object({
  message: z.string().describe('The user\'s message to the assistant.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe('The AI assistant\'s response.'),
  relevantCourses: z.array(z.string()).describe('An array of course names relevant to the conversation.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatPrompt',
  input: {schema: ChatInputSchema},
  output: {schema: ChatOutputSchema},
  model: googleAI.model('gemini-1.5-pro-latest'),
  prompt: `Anda adalah Lingu, teman AI yang super ramah dan santai untuk LinguAI, sebuah platform belajar Bahasa Inggris. Tujuan utama Anda adalah mengobrol dengan pengguna untuk mencari tahu apa tujuan belajar mereka, lalu menyarankan kursus yang paling sesuai untuk mereka.

Prioritaskan untuk merespons dalam Bahasa Indonesia. Namun, jika pengguna menyapa atau bertanya dalam Bahasa Inggris, Anda harus merespons dalam Bahasa Inggris. Jaga agar nada bicaramu tetap ringan, memberi semangat, dan menyenangkan.

Kursus yang tersedia adalah: "English Basic Course", "Daily Conversation", "Grammar", dan "Vocabulary".

Berdasarkan pesan pengguna, berikan respons obrolan yang membantu dan santai. Di kolom 'relevantCourses', daftarkan nama kursus yang paling cocok. Jika tidak ada yang benar-benar relevan, biarkan array tersebut kosong.

Pesan Pengguna: {{{message}}}
`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
