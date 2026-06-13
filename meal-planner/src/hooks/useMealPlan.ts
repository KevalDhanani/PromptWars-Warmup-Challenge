import { useMealStore } from '../store/useMealStore';
import { generateMealPlan } from '../services/mealService';
import { saveToHistory, generateId, savePreferences } from '../services/storageService';
import { toast } from 'react-hot-toast';
import { isKeyValid } from '../services/gemini';

export function useMealPlan() {
  const { preferences, setPlan, setStatus, setError, appendStreamingText, clearStreamingText } = useMealStore();

  const generate = async () => {
    if (!isKeyValid()) {
      setError('Invalid or missing API key. Please check your .env.local file.');
      return;
    }

    setStatus('streaming');
    setError(null);
    clearStreamingText();
    setPlan(null);

    // Save preferences so next time it defaults to this
    savePreferences(preferences);

    try {
      const plan = await generateMealPlan(preferences, (text) => {
        appendStreamingText(text);
      });

      setPlan(plan);
      setStatus('done');
      
      saveToHistory({
        id: generateId(),
        plan,
        preferences,
        savedAt: new Date().toISOString()
      });
      
      toast.success('Meal plan generated!');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during generation');
      setStatus('error');
    }
  };

  return { generate };
}
