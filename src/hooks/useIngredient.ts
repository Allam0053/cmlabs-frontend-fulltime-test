import { useContext } from 'react';

import { createStateContext } from '@/hooks/useGlobalState';

import { IngredientsWithImage } from '@/types/models';

type IngredientStateType = IngredientsWithImage;

// usecase: passing the desc to page meal filter by ingredient
// no need useReducer. the state management is not really required
export const {
  Context: IngredientContext,
  DispatchContext: IngredientDispatchContext,
  StateProvider: IngredientStateProvider,
} = createStateContext<IngredientStateType>([]);
export const useIngredientState = () => useContext(IngredientContext);
export const useIngredientDispatch = () =>
  useContext(IngredientDispatchContext);
