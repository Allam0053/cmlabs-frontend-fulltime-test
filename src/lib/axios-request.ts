import axios from 'axios';

import { urlSearchBuilder } from '@/lib/url-builder';

import {
  DETAIL_MEAL_,
  FILTER_INGREDIENTS,
  LIST_INGREDIENTS,
  LIST_INGREDIENTS_SEARCH_PARAMS,
} from '@/services/endpoints';

import {
  ResponseFilterMealType,
  ResponseIngredientsList,
  ResponseMealLookupType,
} from '@/types/responses';

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
  const urlIngredientList = urlSearchBuilder(
    LIST_INGREDIENTS,
    LIST_INGREDIENTS_SEARCH_PARAMS
  );
  const res = await fetcherGet<ResponseIngredientsList>(
    urlIngredientList.toString()
  )
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

export async function fetchAndHandleByIngredient(ingredientName: string) {
  const urlMealByIngredient = urlSearchBuilder(
    FILTER_INGREDIENTS,
    new Map([['i', ingredientName]])
  );
  const res = await fetcherGet<ResponseFilterMealType>(
    urlMealByIngredient.toString()
  )
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

export async function fetchAndHandleMealDetail(mealId: string) {
  const urlMealDetail = urlSearchBuilder(
    DETAIL_MEAL_,
    new Map([['i', mealId]])
  );
  const res = await fetcherGet<ResponseMealLookupType>(urlMealDetail.toString())
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
