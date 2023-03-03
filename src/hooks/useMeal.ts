import lodashUniqBy from 'lodash/uniqBy';
import { useContext } from 'react';

import { createStateContext } from '@/hooks/useGlobalReducer';

import { Meal } from '@/types/models';

export type MealActionType =
  | // create new, clear all
  {
      type: 'NEW';
      payload: Meal[];
    }
  // push new meal, overwrite existing
  | {
      type: 'PUSH';
      payload: Meal[];
    };
type MealStateType = Meal[];
export function mealReducer(state: MealStateType, action: MealActionType) {
  switch (action.type) {
    case 'NEW': {
      const newMeals = new Array(...action.payload);
      return newMeals;
    }
    case 'PUSH': {
      const Meals = new Array(...state);
      Meals.push(...action.payload);
      const uniqueMeals = lodashUniqBy(Meals, 'idMeal');
      return uniqueMeals;
    }
  }
}

export const {
  Context: MealContext,
  DispatchContext: MealDispatchContext,
  StateProvider: MealStateProvider,
} = createStateContext<MealStateType, MealActionType>([], mealReducer);
export const useMealState = () => useContext(MealContext);
export const useMealDispatch = () => useContext(MealDispatchContext);
