import lodashGet from 'lodash/get';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import useSWR from 'swr';

import {
  fetchAndHandleMealDetail,
  fetchAndHandleMealDetailClient,
} from '@/lib/axios-request';
import { urlSearchBuilder } from '@/lib/url-builder';

import Seo from '@/components/atomic/Seo';
import BlogLayout from '@/components/organism/LayoutBlog';

import { DETAIL_MEAL } from '@/services/endpoints';

import { Meal } from '@/types/models';

export default function MealDetailPage({ meal }: { meal: Meal }) {
  const router = useRouter();
  const { data: dataSWR } = useSWR(
    urlSearchBuilder(
      DETAIL_MEAL,
      new Map([['i', (router.query.id ?? '').toString()]])
    ),
    fetchAndHandleMealDetailClient
  );
  const processedMeal = React.useMemo(() => {
    return meal ?? dataSWR;
  }, [meal, dataSWR]);

  const strCook = React.useMemo(() => {
    return getStrCook(meal);
  }, [meal]);
  return (
    <BlogLayout>
      <Seo
        templateTitle={
          processedMeal.strMeal === null ? undefined : processedMeal.strMeal
        }
        description={`This recipe is for a ${processedMeal.strMeal}, a dish from the ${processedMeal.strArea} cuisine. It includes ${processedMeal.strIngredient1}, ${processedMeal.strIngredient2}, ${processedMeal.strIngredient3}, ${processedMeal.strIngredient4}, and ${processedMeal.strIngredient5} among other ingredients. The full recipe can be found on ${processedMeal.strSource}, and there is also a video tutorial on YouTube ${processedMeal.strYoutube}.`}
        date={new Date(
          processedMeal.dateModified ?? '01/01/2023'
        ).toISOString()}
      />

      <h1>{processedMeal.strMeal}</h1>
      {/* <div className='not-prose h-full w-full overflow-hidden'>
        <LiteYouTubeEmbed
          id={getYoutubeId(processedMeal.strYoutube) ?? ''}
          poster='maxresdefault'
          title={processedMeal.strMeal ?? 'recipes'}
          style={{ innerHeight: '315px', height: '315px' }}
          noCookie={true}
        />
      </div> */}
      <div
        className='video-responsive min-h-[360px] w-full'
        onClick={() => {
          const element = document.querySelector('.yt-lite');
          if (element instanceof HTMLElement) {
            element.click();
          }
        }}
      >
        {getYoutubeId(processedMeal.strYoutube) && (
          <div className='not-prose h-full w-full overflow-hidden'>
            <LiteYouTubeEmbed
              id={getYoutubeId(processedMeal.strYoutube) ?? ''}
              poster='default'
              title={processedMeal.strMeal ?? 'recipes'}
              noCookie={true}
            />
          </div>
        )}{' '}
      </div>
      <p>{processedMeal.strInstructions}</p>
      <ul>
        {strCook &&
          strCook.map((value, index) => (
            <li
              key={`stringredient-${index}`}
            >{`${value.strMeasure} ${value.strIngredient}`}</li>
          ))}
      </ul>
    </BlogLayout>
  );
}

export function getYoutubeId(url?: string | null) {
  return new URL(url ?? 'https://youtube.com').searchParams.get('v');
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
    if (
      lodashGet(mealRes, `strIngredient${i}`, '') !== '' ||
      lodashGet(mealRes, `strMeasure${i}`, '') !== ''
    )
      strCook.push({
        strIngredient: lodashGet(mealRes, `strIngredient${i}`, ''),
        strMeasure: lodashGet(mealRes, `strMeasure${i}`, ''),
      });
  }
  return strCook;
}
