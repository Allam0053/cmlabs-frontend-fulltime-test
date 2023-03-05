import { useContext } from 'react';

import { createStateContext } from '@/hooks/useGlobalState';

import { IngredientUnit } from '@/types/models';

type IngredientPointerStateType = IngredientUnit;

export const {
  Context: IngredientContext,
  DispatchContext: IngredientDispatchContext,
  StateProvider: IngredientPointerStateProvider,
} = createStateContext<IngredientPointerStateType>({
  ingredient: {},
  image: undefined,
} as IngredientUnit);
export const useIngredientPointerState = () => useContext(IngredientContext);
export const useIngredientPointerDispatch = () =>
  useContext(IngredientDispatchContext);
