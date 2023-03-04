import { useRouter } from 'next/router';
import React from 'react';
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
} from 'react-icons/bs';

import useFetchMeal from '@/hooks/useFetchMeal';
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

export default function MealsByIngredientPage() {
  const router = useRouter();
  const { ingredientName } = router.query;
  const { data } = useFetchMeal(ingredientName?.toString());

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
                    key={`${value.idMeal}_${index}`}
                    data-testid={`${value.idMeal}_${index}`}
                  >
                    <BoldText
                      text={value.strMeal ?? ''}
                      keywords={searchTerm}
                    ></BoldText>
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
