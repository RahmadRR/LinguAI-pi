
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {config} from 'dotenv';
config();

const plugins = [];

const apiKey = process.env.GOOGLE_API_KEY;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;


if (apiKey) {
    plugins.push(googleAI({
        apiKey: apiKey,
        projectId: projectId, 
    }));
} else {
    console.error("CRITICAL: GOOGLE_API_KEY environment variable is not set. Genkit will not function.");
}

export const ai = genkit({
  plugins: plugins,
  model: 'googleai/gemini-1.5-pro-latest',
});
