import { AppProps } from 'next/app';

import '@/styles/animation.css';
import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { IngredientStateProvider } from '@/hooks/useIngredient';
import { IngredientPointerStateProvider } from '@/hooks/useIngredientPointer';
import { MealStateProvider } from '@/hooks/useMeal';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IngredientStateProvider>
      <MealStateProvider>
        <IngredientPointerStateProvider>
          <Component {...pageProps} />
        </IngredientPointerStateProvider>
      </MealStateProvider>
    </IngredientStateProvider>
  );
}

export default MyApp;
