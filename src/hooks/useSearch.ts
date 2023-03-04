import React from 'react';

import {
  exactMatchSubstring,
  generateCache,
  getInputValueCastToArray,
  searchFunctionForReference,
} from '@/lib/search-string';

/**
 * only receive deps, no args
 * @param deps
 */
export default function useSearch<T>(deps: Array<T>) {
  const data = deps;
  const [searchMethod, setSearchMethod] = React.useState<
    'fast' | 'detail' | 'exact'
  >('exact');
  const path = React.useMemo(() => 'ingredient.strIngredient', []);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = React.useState<string[]>([]);

  const fastSearchCache = React.useMemo(() => {
    const cacheSearch = generateCache(data, path);
    return cacheSearch;
  }, [data, path]);

  const getCache = React.useMemo(() => {
    return fastSearchCache.get(searchTerm[0]);
  }, [fastSearchCache, searchTerm]);

  // collect the search terms
  const onSubmitHandler = React.useCallback<
    React.FormEventHandler<HTMLFormElement>
  >((e) => {
    e.preventDefault();
    const getInputValues = getInputValueCastToArray(inputRef);
    setSearchTerm(getInputValues);
  }, []);

  // filter data
  const processedData = React.useMemo(() => {
    if (searchTerm.length === 0) return data;
    if (searchMethod === 'fast') return getCache;
    if (searchMethod === 'detail')
      return searchFunctionForReference(data, searchTerm, path);
    return exactMatchSubstring(data, searchTerm, path);
  }, [searchTerm, data, searchMethod, getCache, path]);

  return {
    searchMethod,
    setSearchMethod,
    path,
    inputRef,
    searchTerm,
    setSearchTerm,
    fastSearchCache,
    getCache,
    onSubmitHandler,
    processedData,
  };
}
