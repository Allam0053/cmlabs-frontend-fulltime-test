import axios from 'axios';
import _ from 'lodash';
import React from 'react';

import { fetcherGet } from '@/lib/axios-request';
import { imageUrlBuilder, urlSearchBuilder } from '@/lib/url-builder';
import {
  useIngredientDispatch,
  useIngredientState,
} from '@/hooks/useIngredient';

import {
  LIST_INGREDIENTS,
  LIST_INGREDIENTS_SEARCH_PARAMS,
} from '@/services/endpoints';

import { IngredientsWithImage } from '@/types/models';
import { ResponseIngredientsList } from '@/types/responses';

/**
 * For `home page`
 * Fetch and Store to Global Reducer
 * @returns
 */
export default function useFetchIngredient() {
  const [status, setStatus] = React.useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const data = useIngredientState();
  const disptachData = useIngredientDispatch();
  // const [data, setData] = React.useState<IngredientsWithImage>([]);

  const urlIngredientList = urlSearchBuilder(
    LIST_INGREDIENTS,
    LIST_INGREDIENTS_SEARCH_PARAMS
  );

  React.useEffect(() => {
    const source = axios.CancelToken.source();

    fetcherGet<ResponseIngredientsList>(urlIngredientList.toString())
      .then((response) => {
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
        setStatus('success');
        disptachData(ingredientWithImages);
        // setData(ingredientWithImages);
      })
      .catch((err) => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          return {
            data: err.response.data,
            status: err.response.status,
          };
        }
        setStatus('error');
      });
    return () => {
      source.cancel('Component unmounted');
    };
  }, [disptachData, urlIngredientList]);
  return {
    data,
    setData: disptachData,
    status,
    setStatus,
  };
}
