import { getModel } from './gemini';
import { MealPreferences, MealPlan } from '../types';
import { buildPrompt } from '../utils/promptBuilder';
import { parseResponse } from '../utils/parseResponse';

export async function generateMealPlan(
  preferences: MealPreferences,
  onChunk?: (text: string) => void
): Promise<MealPlan> {
  const model = getModel();
  const prompt = buildPrompt(preferences);

  if (onChunk) {
    // Streaming path
    const result = await model.generateContentStream(prompt);
    let fullText = '';

    for await (const chunk of result.stream) {
      const text = chunk.text();
      fullText += text;
      onChunk(text);
    }

    return parseResponse(fullText, preferences.budget);
  }

  // Non-streaming fallback
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return parseResponse(text, preferences.budget);
}
