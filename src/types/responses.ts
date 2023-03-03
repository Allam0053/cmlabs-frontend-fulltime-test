import { Ingredient, Meal } from '@/types/models';

export type ResponseIngredientsList = {
  meals: Ingredient[];
};

export type ResponseMealLookupType = {
  meals: Meal[];
};

export type ResponseFilterMealType = {
  meals: Meal[];
};