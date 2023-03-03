import * as React from 'react';

import {
  exactMatchSubstring,
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

// exact = WiLunarEclipse
// fast = BsFillLightningChargeFill
// detail = TbZoomCheckFilled
export default function HomePage() {
  const { data } = useFetchIngredient();
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

  // React.useEffect(() => {
  //   // eslint-disable-next-line no-console
  //   console.log(processedData);
  // }, [processedData]);

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
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <ul>
              {processedData &&
                processedData.map((value, index) => (
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
