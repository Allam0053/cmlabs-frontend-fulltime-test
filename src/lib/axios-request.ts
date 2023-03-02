import axios from 'axios';

import { urlSearchBuilder } from '@/lib/url-builder';

import {
  LIST_INGREDIENTS,
  LIST_INGREDIENTS_SEARCH_PARAMS,
} from '@/services/endpoints';

import { ResponseIngredientsList } from '@/types/ingredients';

/**
 * axios default config for this project
 * @param url
 * @returns Promise
 */
export function fetcherGet<T>(url: string) {
  return axios.get<T>(url, {
    headers: {
      'Content-Type': 'application/json',
      crossdomain: true,
    },
    timeout: 1000 * 60 * 5,
  });
}

export async function fetchAndHandleAllIngredients() {
  const urlMealList = urlSearchBuilder(
    LIST_INGREDIENTS,
    LIST_INGREDIENTS_SEARCH_PARAMS
  );
  const res = await fetcherGet<ResponseIngredientsList>(urlMealList.toString())
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
      };
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
      return {
        data: undefined,
        status: 0,
      };
    });
  return res;
}
