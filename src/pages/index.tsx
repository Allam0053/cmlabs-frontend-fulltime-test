/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
} from 'react-icons/bs';

import useFetchIngredient from '@/hooks/useFetchIngredient';
import useMealCountByIngredient from '@/hooks/useMealCountByIngredient';
import usePagination from '@/hooks/usePagination';
import useSearch from '@/hooks/useSearch';

import BoldText from '@/components/atomic/BoldText';
import Button from '@/components/atomic/buttons/Button';
import ButtonGroup from '@/components/atomic/buttons/ButtonGroup';
import IconButton from '@/components/atomic/buttons/IconButton';
import NextImage from '@/components/atomic/NextImage';
import Seo from '@/components/atomic/Seo';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Layout from '@/components/organism/Layout';

import { IngredientsWithImage } from '@/types/models';

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

  const {
    // searchMethod,
    setSearchMethod,
    // path,
    inputRef,
    searchTerm,
    // setSearchTerm,
    // fastSearchCache,
    // getCache,
    onSubmitHandler,
    processedData,
  } = useSearch(data);

  const { pagination, currentPage, setCurrentPage } =
    usePagination(processedData);

  const { mealCountByIngredient } = useMealCountByIngredient(pagination);

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
            <div>
              <p>{JSON.stringify(pagination.pagesToRender)}</p>
              <p>{JSON.stringify(pagination.totalData)}</p>
              <p>{JSON.stringify(pagination.totalPage)}</p>
              <p>{JSON.stringify(pagination.dataPerPage)}</p>
              {/* <p>{JSON.stringify(pagination.currentData)}</p> */}
            </div>
            <ButtonGroup className='flex items-center justify-center'>
              <IconButton
                variant='ghost'
                icon={BsChevronDoubleLeft}
                iconClassName='h-4 w-4'
                onClick={() => setCurrentPage(1)}
              />
              <IconButton
                variant='ghost'
                icon={BsArrowLeftShort}
                iconClassName='h-4 w-4'
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              />
              {pagination.pagesToRender &&
                pagination.pagesToRender.map((value, index) => (
                  <Button
                    variant={currentPage === value ? 'outline' : 'ghost'}
                    disabled={currentPage === value}
                    key={`${index}-${value}-pagination`}
                    onClick={() => setCurrentPage(value)}
                  >
                    {value}
                  </Button>
                ))}
              <IconButton
                variant='ghost'
                icon={BsArrowRightShort}
                iconClassName='h-4 w-4'
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(pagination.totalPage ?? 1, prev + 1)
                  )
                }
              />
              <IconButton
                variant='ghost'
                icon={BsChevronDoubleRight}
                iconClassName='h-4 w-4'
                onClick={() => setCurrentPage(pagination.totalPage)}
              />
            </ButtonGroup>
            <ul>
              {pagination.currentData &&
                pagination.currentData.map((value, index) => (
                  <li
                    key={`${value.ingredient.idIngredient}_${index}`}
                    data-testid={`${value.ingredient.idIngredient}_${index}`}
                  >
                    <p>{value.ingredient.idIngredient}</p>
                    <p></p>{' '}
                    {mealCountByIngredient.get(value.ingredient.idIngredient)}
                    <BoldText
                      text={value.ingredient.strIngredient ?? ''}
                      keywords={searchTerm}
                    ></BoldText>
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

function _renderData(processedData: IngredientsWithImage) {
  return (
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
  );
}
