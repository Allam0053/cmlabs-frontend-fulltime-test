import _ from 'lodash';

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
// 'ingredient.strIngredient'
export function searchFunctionForReference<T>(
  data: T[],
  searchTerm: string[],
  path: string
) {
  const ingredientScore = data.map((value) => {
    const itemToSearch = _.get(value, path, '|'); // dont include empty names
    // console.log(itemToSearch);
    const score = (itemToSearch as string)
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean)
      .filter((value) =>
        searchTerm.some((term) => value.includes(term))
      ).length;
    return {
      data: value,
      score,
    };
  });
  const sortedIngredient = ingredientScore.sort(
    (valueA, valueB) => valueB.score - valueA.score
  );
  return sortedIngredient
    .filter((value) => value.score > 0)
    .map((value) => value.data);
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
// 'ingredient.strIngredient',
export function generateCache<T>(data: T[], path: string) {
  const cacheSearch = new Map<string, T[]>();
  for (let i = 0; i < data.length; i++) {
    const itemToSearch = _.get(data[i], path, '|');
    const keyCaches = (itemToSearch as string)
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean);
    keyCaches.forEach((keyCache) => {
      if (!cacheSearch.has(keyCache)) {
        cacheSearch.set(keyCache, [data[i]]);
        return;
      }
      cacheSearch.get(keyCache)?.push(data[i]);
    });
  }
  return cacheSearch;
}

/**
 * used in page /ingredient/{ingredientName}
 * @param ingredientWithImages
 * @param searchTerm
 * @returns
 */
export function exactMatchSubstring<T>(
  data: T[],
  searchTerm: string[],
  path: string
) {
  const concatSearchTerm = searchTerm.join(' ');
  return data.filter((item) => {
    const itemToFilter = _.get(item, path, '|');
    return (itemToFilter as string).toLowerCase().includes(concatSearchTerm);
  });
}
// export function exactMatchSubstring(
//   ingredientWithImages: IngredientsWithImage,
//   searchTerm: string[]
// ) {
//   const concatSearchTerm = searchTerm.join(' ');
//   return ingredientWithImages.filter((ingredient) => {
//     const mealName = _.get(ingredient, 'ingredient.strIngredient', '|');
//     return mealName.toLowerCase().includes(concatSearchTerm);
//   });
// }
