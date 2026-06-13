import { GoogleGenerativeAI } from '@google/generative-ai';

// AI Studio key from VITE_ env var (browser-safe)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;

if (!API_KEY) {
  console.warn(
    '[Gemini] VITE_GEMINI_API_KEY is not set. Generation will fail.'
  );
}

const genAI = new GoogleGenerativeAI(API_KEY || '');

// Use gemini-2.5-flash
export const getModel = () =>
  genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Validate key format
export const isKeyValid = () =>
  typeof API_KEY === 'string' && API_KEY.length > 20;
