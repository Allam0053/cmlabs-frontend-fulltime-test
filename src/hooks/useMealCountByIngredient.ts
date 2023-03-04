import _ from 'lodash';
import React from 'react';

import { fetchMealCount } from '@/lib/axios-request';
import useMap from '@/hooks/useMap';
import { PaginationType } from '@/hooks/usePagination';

import { Ingredient } from '@/types/models';

/**
 *
 * @param deps
 * @returns `Map()` that contains key:value
 * `key` is string. name of a meal
 * `value` is number. number or count of Meal by Ingredient
 */
export default function useMealCountByIngredient<T>(deps: PaginationType<T>) {
  const pagination = deps;
  const [mealCountByIngredient, setMealCountByIngredient] = useMap<
    string,
    number | string
  >();
  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const promisesToFetchMealCountByCategory: Promise<() => void>[] =
      pagination.currentData?.map((value) => {
        return new Promise(function () {
          // const res = await fetchMealCount(_.get(value, 'ingredient.strIngredient', ''));
          fetchMealCount(
            _.get(value, 'ingredient.strIngredient', '') as string,
            signal
          ).then((res) => {
            if (res.status === 200) {
              setMealCountByIngredient.set(
                (
                  value as unknown as {
                    ingredient: Ingredient;
                    image: string;
                  }
                ).ingredient.idIngredient,
                _.get(res, 'data.mealCount', '--')
              );
              return;
            }
          });
        });
      });
    let result = Promise.resolve();
    promisesToFetchMealCountByCategory.forEach((promise) => {
      result = result.then(async () => (await promise)());
    });
    return function cleanup() {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  return {
    mealCountByIngredient,
    setMealCountByIngredient,
  };
}
