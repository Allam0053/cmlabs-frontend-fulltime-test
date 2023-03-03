import * as React from 'react';

import {
  generateCache,
  getInputValueCastToArray,
  searchFunctionForReference,
} from '@/lib/search-string';
import useFetchIngredient from '@/hooks/useFetchIngredient';

import NextImage from '@/components/atomic/NextImage';
import Seo from '@/components/atomic/Seo';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Layout from '@/components/organism/Layout';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const { data: ingredientWithImages } = useFetchIngredient();
  const [isFastSearch, setIsFastSearch] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = React.useState<string[]>([]);

  const fastSearchCache = React.useMemo(() => {
    const cacheSearch = generateCache(ingredientWithImages);
    return cacheSearch;
  }, [ingredientWithImages]);

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
  const processedIngredients = React.useMemo(() => {
    if (searchTerm.length === 0) return ingredientWithImages;
    if (isFastSearch) return getCache;
    return searchFunctionForReference(ingredientWithImages, searchTerm);
  }, [getCache, ingredientWithImages, isFastSearch, searchTerm]);

  // React.useEffect(() => {
  //   // eslint-disable-next-line no-console
  //   console.log(processedIngredients);
  // }, [processedIngredients]);

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='flex flex-col bg-white'>
          <form onSubmit={onSubmitHandler}>
            <input ref={inputRef} type='text' />
            <input
              type='radio'
              name='fastSearch'
              value='fast'
              onChange={(e) => {
                setIsFastSearch(e.target.value === 'fast' ? true : false);
              }}
            />
            <input
              type='radio'
              name='fastSearch'
              value='detail'
              onChange={(e) => {
                setIsFastSearch(e.target.value === 'detail' ? true : false);
              }}
            />
            <button type='submit'>search</button>
          </form>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <ul>
              {processedIngredients &&
                processedIngredients.map((value, index) => (
                  <li
                    key={`${value.ingredient.idIngredient}_${index}`}
                    data-testid={`${value.ingredient.idIngredient}_${index}`}
                  >
                    <p>{value.ingredient.idIngredient}</p>
                    <p>{value.ingredient.strIngredient}</p>
                    <p>{value.ingredient.strDescription}</p>
                    <p>{value.ingredient.strType}</p>
                    <UnstyledLink
                      href={`/ingredient/${value.ingredient.strIngredient}`}
                    >
                      <NextImage
                        useSkeleton
                        loading='lazy'
                        className='w-32 md:w-40'
                        src={value.image}
                        width='180'
                        height='180'
                        alt={
                          value.ingredient.strIngredient === null ||
                          value.ingredient.strIngredient === undefined
                            ? value.ingredient.idIngredient
                            : value.ingredient.strIngredient
                        }
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
