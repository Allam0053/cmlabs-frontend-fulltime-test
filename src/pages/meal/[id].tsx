import lodashGet from 'lodash/get';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import React from 'react';
import useSWR from 'swr';

import { fetchAndHandleMealDetail } from '@/lib/axios-request';
import { urlSearchBuilder } from '@/lib/url-builder';

import Seo from '@/components/atomic/Seo';
import Layout from '@/components/organism/Layout';

import { DETAIL_MEAL } from '@/services/endpoints';

import { Meal } from '@/types/models';

export default function MealDetailPage({ meal }: { meal: Meal }) {
  const router = useRouter();
  const { data: dataSWR } = useSWR(
    urlSearchBuilder(
      DETAIL_MEAL,
      new Map([['i', (router.query.id ?? '').toString()]])
    ),
    fetchAndHandleMealDetail
  );
  const processedMeal = React.useMemo(() => {
    return meal ?? dataSWR;
  }, [meal, dataSWR]);

  const strCook = React.useMemo(() => {
    return getStrCook(meal);
  }, [meal]);
  return (
    <Layout>
      <Seo
        templateTitle={
          processedMeal.strMeal === null ? undefined : processedMeal.strMeal
        }
        description={`This recipe is for a ${processedMeal.strMeal}, a dish from the ${processedMeal.strArea} cuisine. It includes ${processedMeal.strIngredient1}, ${processedMeal.strIngredient2}, ${processedMeal.strIngredient3}, ${processedMeal.strIngredient4}, and ${processedMeal.strIngredient5} among other ingredients. The full recipe can be found on ${processedMeal.strSource}, and there is also a video tutorial on YouTube ${processedMeal.strYoutube}.`}
        date={new Date(
          processedMeal.dateModified ?? '01/01/2023'
        ).toISOString()}
      />
      <main>
        <section>
          <h1>{processedMeal.strMeal}</h1>
          <p>{processedMeal.strInstructions}</p>
          <ul>
            {strCook &&
              strCook.map((value, index) => (
                <li
                  key={`stringredient-${index}`}
                >{`${value.strMeasure} ${value.strIngredient}`}</li>
              ))}
          </ul>

          <iframe
            className='h-full w-full'
            src={
              processedMeal.strYoutube === null
                ? undefined
                : processedMeal.strYoutube
            }
            title={
              processedMeal.strMeal === null ? undefined : processedMeal.strMeal
            }
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </section>
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const { params } = context;
  // const { id } = params;
  const id = lodashGet(context, 'params.id', '').toString();

  const res = await fetchAndHandleMealDetail(id);
  const mealRes = res.data.meals[0];

  // use the slug to fetch data from your API or database

  return {
    props: {
      meal: mealRes,
    },
  };
};

function getStrCook(mealRes: Meal) {
  const strCook: { strIngredient: string; strMeasure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    strCook.push({
      strIngredient: lodashGet(mealRes, `strIngredient${i}`, ''),
      strMeasure: lodashGet(mealRes, `strMeasure${i}`, ''),
    });
  }
  return strCook;
}
