import { useRouter } from 'next/router';
import React from 'react';

import {
  exactMatchSubstring,
  generateCache,
  getInputValueCastToArray,
  searchFunctionForReference,
} from '@/lib/search-string';
import useFetchMeal from '@/hooks/useFetchMeal';

import NextImage from '@/components/atomic/NextImage';
import Seo from '@/components/atomic/Seo';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Layout from '@/components/organism/Layout';

export default function MealsByIngredientPage() {
  const router = useRouter();
  const { ingredientName } = router.query;
  const { data } = useFetchMeal(ingredientName?.toString());

  const [searchMethod, setSearchMethod] = React.useState<
    'fast' | 'detail' | 'exact'
  >('exact');
  const path = React.useMemo(() => 'strMeal', []);

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

  return (
    <Layout>
      <Seo />
      <main>
        <section className='flex flex-col bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <form onSubmit={onSubmitHandler}>
              <input ref={inputRef} type='text' />
              <input
                type='radio'
                name='searchMethod'
                value='fast'
                onChange={() => {
                  setSearchMethod('fast');
                }}
              />
              <input
                type='radio'
                name='searchMethod'
                value='detail'
                onChange={() => {
                  setSearchMethod('detail');
                }}
              />

              <input
                type='radio'
                name='searchMethod'
                value='detail'
                onChange={() => {
                  setSearchMethod('exact');
                }}
              />
              <button type='submit'>search</button>
            </form>
            <ul>
              {processedData &&
                processedData.map((value, index) => (
                  <li
                    key={`${value.idMeal}_${index}`}
                    data-testid={`${value.idMeal}_${index}`}
                  >
                    <p>{value.strMeal}</p>
                    <UnstyledLink href={`/meal/${value.idMeal}`}>
                      <NextImage
                        useSkeleton
                        loading='lazy'
                        className='w-32 md:w-40'
                        src={value.strMealThumb as string}
                        width='180'
                        height='180'
                        alt={value.strMeal ?? 'meal food'}
                      />
                    </UnstyledLink>
                  </li>
                ))}
            </ul>

            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink href='https://allam-taju.vercel.app'>
                Allam Taju Sarof
              </UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
