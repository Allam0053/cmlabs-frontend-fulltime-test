import _ from 'lodash';
import * as React from 'react';

import { getInputValueCastToArray } from '@/lib/search-string';
import useFetchIngredient from '@/hooks/useFetchIngredient';

import NextImage from '@/components/atomic/NextImage';
import Seo from '@/components/atomic/Seo';
import UnderlineLink from '@/components/links/UnderlineLink';
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

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = React.useState<string[]>([]);

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
    return ingredientWithImages.filter((value) => {
      const mealName = _.get(value, 'ingredient.strMeal', '|'); // dont include empty names
      mealName
        .split(/[^a-zA-Z0-9]+/)
        .filter(Boolean)
        .filter((value) => searchTerm.includes(value));
    });
  }, [ingredientWithImages, searchTerm]);

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(processedIngredients);
  }, [processedIngredients]);

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='flex flex-col bg-white'>
          <form onSubmit={onSubmitHandler}>
            <input ref={inputRef} type='text' />
            <button type='submit'>search</button>
          </form>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <ul>
              {processedIngredients.map((value, index) => (
                <li
                  key={`${value.ingredient.idIngredient}_${index}`}
                  data-testid={`${value.ingredient.idIngredient}_${index}`}
                >
                  <p>{value.ingredient.idIngredient}</p>
                  <p>{value.ingredient.strIngredient}</p>
                  <p>{value.ingredient.strDescription}</p>
                  <p>{value.ingredient.strType}</p>
                  <NextImage
                    // className='w-32'
                    imgClassName='hover:scale-[120]'
                    useSkeleton
                    width={128}
                    height={128}
                    alt={value.ingredient.idIngredient}
                    src={value.image}
                  />
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
