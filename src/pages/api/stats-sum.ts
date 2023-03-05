// Ingredient list
// www.themealdb.com/api/json/v1/1/list.php?i=list

// Meal list
// www.themealdb.com/api/json/v1/1/filter.php?i=

import _ from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  fetchAndHandleAllIngredients_,
  fetchAndHandleMealCount,
} from '@/lib/axios-request';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const responseIngredient = await fetchAndHandleAllIngredients_();
  const responseMeal = await fetchAndHandleMealCount('');

  // const responseAll = await Promise.all([
  //   fetchAndHandleAllIngredients_,
  //   fetchAndHandleMealCount,
  // ]);
  // console.log(responseAll);
  res.status(200).json({
    ingredients: _.get(responseIngredient, 'data.meals.length', 0),
    meals: _.get(responseMeal, 'data.meals.length', 0),
  });

  // const mealRes = response.data.meal[0];
  // res.status(200).json(responseAll);
}
