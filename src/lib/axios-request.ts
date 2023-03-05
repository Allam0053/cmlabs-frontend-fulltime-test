import axios from 'axios';

import { urlSearchBuilder } from '@/lib/url-builder';

import {
  DETAIL_MEAL_,
  FILTER_INGREDIENTS,
  FILTER_INGREDIENTS_SERVER,
  LIST_INGREDIENTS,
  LIST_INGREDIENTS_SEARCH_PARAMS,
  LIST_INGREDIENTS_SERVER,
  MEAL_COUNT_BY_CATEGORY,
  STATS,
} from '@/services/endpoints';

import {
  ResponseFilterMealType,
  ResponseIngredientsList,
  ResponseMealLookupType,
  ResponseStats,
} from '@/types/responses';

/**
 * axios default config for this project
 * @param url
 * @returns Promise
 */
export function fetcherGet<T>(url: string, abortSignal?: AbortSignal) {
  return axios.get<T>(url, {
    headers: {
      'Content-Type': 'application/json',
      crossdomain: true,
    },
    signal: abortSignal,
    timeout: 1000 * 60 * 5,
  });
}

/**
 * for SERVER API, count all ingredient and send the result to client
 * @returns
 */
export async function fetchAndHandleAllIngredients_() {
  const urlIngredientList = urlSearchBuilder(
    LIST_INGREDIENTS_SERVER,
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

/**
 * for CLIENT, request all available ingredients
 * @returns
 */
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

/**
 * FOR SERVER API
 * @param ingredientName
 * @returns
 */
export async function fetchAndHandleMealCount(ingredientName: string) {
  const urlMealByIngredient = urlSearchBuilder(
    FILTER_INGREDIENTS_SERVER,
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

/**
 * FOR CLIENT, No rewrites, used in home to fetch /api/category-sum
 * @param ingredientName
 * @returns
 */
export async function fetchMealCount(
  ingredientName: string,
  abortSignal?: AbortSignal
) {
  const urlMealByIngredient = `${MEAL_COUNT_BY_CATEGORY}/${ingredientName}`;
  const res = await fetcherGet<ResponseFilterMealType>(
    urlMealByIngredient.toString(),
    abortSignal
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

// for CLIENT, request Meals By Ingredient
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

// for CLIENT, request STATS for server side props on Home page
export async function fetchAndHandleStats() {
  const urlMealByIngredient = STATS;
  const res = await fetcherGet<ResponseStats>(urlMealByIngredient.toString())
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
