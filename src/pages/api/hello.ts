// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import _ from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import { fetchAndHandleAllIngredients } from '@/lib/axios-request';
import { imageUrlBuilder } from '@/lib/url-builder';

import { IngredientsWithImage } from '@/types/models';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetchAndHandleAllIngredients();
  const ingredientWithImages: IngredientsWithImage = [];
  if (200 <= response.status && response.status < 300) {
    for (let i = 0; i < response.data.meals.length; i++) {
      ingredientWithImages.push({
        ingredient: response.data?.meals?.[i],
        image: imageUrlBuilder(
          _.get(response, `data.meals[${i}].strIngredient`, '')
        ).toString(),
      });
    }
  }
  res.status(200).json(ingredientWithImages);
  // return { props: { ingredientWithImages }, revalidate: 30 };
  // const imageLinks = ingredients.map() imageUrlBuilder();
  // res.status(200).json(response);
}
