import _ from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import { fetchAndHandleMealCount } from '@/lib/axios-request';

import { Meal } from '@/types/models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const id = lodashGet(context, 'params.id', '').toString();
  const ingredient = _.get(req, 'query.ingredient', '');

  // console.log(ingredient);
  const response = await fetchAndHandleMealCount(ingredient.toString());
  if (response.status !== 200) {
    return res.status(404).json({ mealCount: 0 });
  }
  const meals = _.get(response, 'data.meals', null);
  if (!meals) {
    return res.status(404).json({ mealCount: 0 });
  }

  const mealCount = (meals as Meal[]).length;
  return res.status(200).json({ mealCount });
}
