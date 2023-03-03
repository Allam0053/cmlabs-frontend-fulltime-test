import _ from 'lodash';

import { IngredientsWithImage } from '@/types/ingredients';

export function getInputValueCastToArray(
  inputRef: React.RefObject<HTMLInputElement>
) {
  return _.get(inputRef, 'current.value', '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

// time complexity too high O(ingredientLen * mealNameSplitted * searchTermSplitted)
// good for searching uncertain reference
export function searchFunctionForReference(
  ingredientWithImages: IngredientsWithImage,
  searchTerm: string[]
) {
  const ingredientScore = ingredientWithImages.map((value) => {
    const mealName = _.get(value, 'ingredient.strIngredient', '|'); // dont include empty names
    // console.log(mealName);
    const score = mealName
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean)
      .filter((value) =>
        searchTerm.some((term) => value.includes(term))
      ).length;
    return {
      ingredientWithImages: value,
      score,
    };
  });
  const sortedIngredient = ingredientScore.sort(
    (valueA, valueB) => valueB.score - valueA.score
  );
  return sortedIngredient
    .filter((value) => value.score > 0)
    .map((value) => value.ingredientWithImages);
}

/**
 *  O(n * k)
 * n = ingredientWithImages.length
 * k = words in mealName; mealName is non-sensitive caps, splitted by other char than alpha numeric
 *
 * meanwhile getCache is O(1) up to O(log n), based on MDN doc about Map() class
 * @param ingredientWithImages
 * @returns
 */
export function generateCache(ingredientWithImages: IngredientsWithImage) {
  const cacheSearch = new Map<string, IngredientsWithImage>();
  for (let i = 0; i < ingredientWithImages.length; i++) {
    const mealName = _.get(
      ingredientWithImages[i],
      'ingredient.strIngredient',
      '|'
    );
    const keyCaches = mealName
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean);
    keyCaches.forEach((keyCache) => {
      if (!cacheSearch.has(keyCache)) {
        cacheSearch.set(keyCache, [ingredientWithImages[i]]);
        return;
      }
      cacheSearch.get(keyCache)?.push(ingredientWithImages[i]);
    });
  }
  return cacheSearch;
}
