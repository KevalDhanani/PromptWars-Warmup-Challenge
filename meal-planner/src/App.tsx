import { Toaster } from 'react-hot-toast';
import { useMealStore } from './store/useMealStore';
import { Header } from './components/layout/Header';
import { PageWrapper } from './components/layout/PageWrapper';
import { MealForm } from './components/form/MealForm';
import { MealPlanDisplay } from './components/plan/MealPlanDisplay';
import { HistoryDrawer } from './components/history/HistoryDrawer';
import { StreamingIndicator } from './components/ui/StreamingIndicator';
import { EmptyState } from './components/ui/EmptyState';
import { ErrorBanner } from './components/ui/ErrorBanner';
import { UtensilsCrossed } from 'lucide-react';
import { useMealPlan } from './hooks/useMealPlan';

function App() {
  const { status, error } = useMealStore();
  const { generate } = useMealPlan();

  return (
    <>
      <Header />
      
      <PageWrapper>
        <aside className="w-full relative">
          <MealForm />
        </aside>
        
        <main className="w-full min-h-[500px]">
          {error && (
            <div className="mb-6">
              <ErrorBanner message={error} onRetry={() => generate()} />
            </div>
          )}

          {status === 'idle' && (
            <EmptyState 
              icon={UtensilsCrossed}
              title="What's cooking?"
              description="Tell me about your day, and I'll plan your meals and grocery list."
            />
          )}

          {(status === 'streaming' || status === 'parsing') && (
            <div className="h-full flex items-center justify-center">
              <StreamingIndicator />
            </div>
          )}

          {status === 'done' && (
            <MealPlanDisplay />
          )}
        </main>
      </PageWrapper>

      <HistoryDrawer />
      
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: 'var(--font-sans)',
          },
          success: {
            iconTheme: {
              primary: '#3B6D11',
              secondary: '#fff',
            },
          },
        }} 
      />
    </>
  );
}

export default App;
