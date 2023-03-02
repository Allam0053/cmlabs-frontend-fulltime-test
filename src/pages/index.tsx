import _ from 'lodash';
import * as React from 'react';

import { fetchAndHandleAllIngredients } from '@/lib/axios-request';
import { imageUrlBuilder } from '@/lib/url-builder';

import NextImage from '@/components/atomic/NextImage';
import Seo from '@/components/atomic/Seo';
import UnderlineLink from '@/components/links/UnderlineLink';
import Layout from '@/components/organism/Layout';

import { IngredientsWithImage } from '@/types/ingredients';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage({
  ingredientWithImages,
}: {
  ingredientWithImages: IngredientsWithImage;
}) {
  // const urlMealList = urlSearchBuilder(
  //   LIST_INGREDIENTS,
  //   LIST_INGREDIENTS_SEARCH_PARAMS
  // );
  // const { data, error, loading } = useSWRRecipes(urlMealList.toString());

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            {ingredientWithImages.map((value, index) => (
              <li key={`${value.ingredient.idIngredient}_${index}`}>
                <p>{value.ingredient.idIngredient}</p>
                <p>{value.ingredient.strIngredient}</p>
                <p>{value.ingredient.strDescription}</p>
                <p>{value.ingredient.strType}</p>
                <NextImage
                  // className='w-32'
                  // useSkeleton
                  width={128}
                  height={128}
                  alt={
                    value.ingredient.strDescription ??
                    value.ingredient.idIngredient
                  }
                  src={value.image}
                />
              </li>
            ))}

            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink href='https://allam-taju.vercel.app?ref=tsnextstarter'>
                Theodorus Clarence
              </UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
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
  return { props: { ingredientWithImages }, revalidate: 30 };
  // const imageLinks = ingredients.map() imageUrlBuilder();
}
