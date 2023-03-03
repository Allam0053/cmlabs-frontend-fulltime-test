import axios from 'axios';
import React from 'react';

import { fetcherGet } from '@/lib/axios-request';
import { urlSearchBuilder } from '@/lib/url-builder';
import { useMealDispatch, useMealState } from '@/hooks/useMeal';

import { FILTER_INGREDIENTS } from '@/services/endpoints';

import { ResponseFilterMealType } from '@/types/responses';

/**
 * Fetch and Store to Global Reducer
 * @returns
 */
export default function useFetchMeal(ingredientNameInit?: string) {
  const [status, setStatus] = React.useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [ingredientName, setIngredientName] = React.useState(
    ingredientNameInit ?? ''
  );
  const data = useMealState();
  const disptachData = useMealDispatch();

  React.useEffect(() => {
    const source = axios.CancelToken.source();

    const urlMealByIngredient = urlSearchBuilder(
      FILTER_INGREDIENTS,
      new Map([['i', ingredientName]])
    );

    fetcherGet<ResponseFilterMealType>(urlMealByIngredient.toString())
      .then((res) => {
        if (data.length === 0) {
          disptachData({
            type: 'NEW',
            payload: res.data.meals,
          });
        }
        disptachData({
          type: 'PUSH',
          payload: res.data.meals,
        });
        setStatus('success');
      })
      .catch((err) => {
        setStatus('error');
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          return {
            data: err.response.data,
            status: err.response.status,
          };
        }
        return {
          data: undefined,
          status: 0,
        };
      });

    return () => {
      source.cancel('Component unmounted');
    };
  }, [data, disptachData, ingredientName]);

  return {
    data,
    disptachData,
    status,
    setStatus,
    ingredientName,
    setIngredientName,
  };
}
