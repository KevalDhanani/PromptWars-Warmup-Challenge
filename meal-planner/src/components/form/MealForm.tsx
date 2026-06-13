import { FormEvent } from 'react';
import { useMealStore } from '../../store/useMealStore';
import { useMealPlan } from '../../hooks/useMealPlan';
import { BudgetSlider } from './BudgetSlider';
import { TimeSlider } from './TimeSlider';
import { ServingsSelector } from './ServingsSelector';
import { DietChips } from './DietChips';
import { CuisineSelector } from './CuisineSelector';
import { GenerateButton } from './GenerateButton';
import { validatePreferences } from '../../utils/validators';
import { toast } from 'react-hot-toast';

export function MealForm() {
  const { preferences, setPreferences, status } = useMealStore();
  const { generate } = useMealPlan();

  const loading = status === 'streaming' || status === 'parsing';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const error = validatePreferences(preferences);
    if (error) {
      toast.error(error);
      return;
    }

    generate();
  };

  return (
    <form onSubmit={handleSubmit} className="card h-fit sticky top-24">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Your preferences</h2>
      
      <BudgetSlider 
        value={preferences.budget} 
        onChange={(v) => setPreferences({ budget: v })} 
        servings={preferences.servings}
      />
      
      <TimeSlider 
        value={preferences.timeAvailable} 
        onChange={(v) => setPreferences({ timeAvailable: v })} 
      />
      
      <ServingsSelector 
        value={preferences.servings} 
        onChange={(v) => setPreferences({ servings: v })} 
      />
      
      <DietChips 
        selected={preferences.restrictions} 
        onChange={(v) => setPreferences({ restrictions: v })} 
      />
      
      <CuisineSelector 
        value={preferences.cuisine} 
        onChange={(v) => setPreferences({ cuisine: v })} 
      />
      
      <GenerateButton loading={loading} disabled={loading} />
    </form>
  );
}
