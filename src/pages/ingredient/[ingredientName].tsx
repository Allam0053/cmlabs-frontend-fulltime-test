import { useRouter } from 'next/router';
import React from 'react';
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsFillLightningChargeFill,
} from 'react-icons/bs';
import { HiOutlineSearchCircle } from 'react-icons/hi';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { InView } from 'react-intersection-observer';

import clsxm from '@/lib/clsxm';
import useFetchMeal from '@/hooks/useFetchMeal';
import { useIngredientPointerState } from '@/hooks/useIngredientPointer';
import usePagination from '@/hooks/usePagination';
import useSearch from '@/hooks/useSearch';

import BoldText from '@/components/atomic/BoldText';
import Button from '@/components/atomic/buttons/Button';
import ButtonGroup from '@/components/atomic/buttons/ButtonGroup';
import IconButton from '@/components/atomic/buttons/IconButton';
import NextImage from '@/components/atomic/NextImage';
import Seo from '@/components/atomic/Seo';
import StyledInput from '@/components/atomic/StyledInput';
import Typography from '@/components/atomic/Typography';
import UnstyledLink from '@/components/links/UnstyledLink';
import HomeSectionIngredient from '@/components/organism/HomeSectionIngredient';
import HomeSectionSearchWrapper from '@/components/organism/HomeSectionSearchWrapper';
import Layout from '@/components/organism/Layout';
import LayoutFooter from '@/components/organism/LayoutFooter';

export default function MealsByIngredientPage() {
  const router = useRouter();
  const { ingredientName } = router.query;
  const { data } = useFetchMeal(ingredientName?.toString());
  const pointedIngredient = useIngredientPointerState();

  const {
    searchMethod,
    setSearchMethod,
    // path,
    searchTerm,
    // setSearchTerm,
    // fastSearchCache,
    // getCache,
    onSubmitHandler,
    processedData,
  } = useSearch('strMeal', data);

  const { pagination, currentPage, setCurrentPage } =
    usePagination(processedData);

  return (
    <Layout>
      <Seo />
      <main className='flex h-full w-full flex-col items-center pb-12'>
        <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              className={clsxm(
                'layout flex flex-col bg-white py-12',
                inView && 'fade-in-start'
              )}
              id='search-ingredients'
              ref={ref}
            >
              <HomeSectionSearchWrapper>
                <div className='container relative mx-auto flex flex-col items-center xl:flex-row xl:flex-wrap'>
                  <div
                    className={clsxm(
                      'relative w-full px-4 xl:w-4/12',
                      inView ? 'fade-in-start' : ''
                    )}
                  >
                    <div
                      className={clsxm(
                        '-z-10',
                        'lg:[40vw] absolute -top-8 -left-8 h-[2px] w-[80vw] md:w-[30vw]',
                        'bg-[linear-gradient(90deg,rgb(56,189,248)_10%,rgb(129,140,248)_30%,rgb(249,115,22)_80%)]',
                        '[mask-image:radial-gradient(80%_80%_at_left,white,transparent)]',
                        inView && 'moveleft-start'
                      )}
                      data-moveleft
                    />
                    <div
                      className={clsxm(
                        '-z-10',
                        'absolute -top-12 -left-4 h-[80vh] w-[2px] md:h-[30vh]',
                        'bg-[linear-gradient(0deg,rgb(249,115,22)_10%,rgb(129,140,248)_30%,rgb(56,189,248)_50%)]',
                        '[mask-image:radial-gradient(80%_90%_at_top,white,transparent)]',
                        inView && 'moveup-start'
                      )}
                      data-moveup
                    />
                    <div
                      className='mb-6 inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white p-3 text-center text-slate-500 shadow-lg'
                      data-fade='7'
                    >
                      {pointedIngredient &&
                      pointedIngredient.ingredient &&
                      pointedIngredient.ingredient.idIngredient &&
                      pointedIngredient.image ? (
                        <NextImage
                          useSkeleton
                          loading='lazy'
                          className='h-full w-full object-cover object-center'
                          iconFallbackClassName='h-full w-full'
                          width={360}
                          height={360}
                          src={pointedIngredient.image}
                          alt={
                            pointedIngredient.ingredient.strIngredient ===
                              null ||
                            pointedIngredient.ingredient.strIngredient ===
                              undefined
                              ? pointedIngredient.ingredient.idIngredient
                              : pointedIngredient.ingredient.strIngredient
                          }
                        />
                      ) : (
                        <i className='fas fa-burger text-xl'></i>
                      )}
                    </div>
                    <h3
                      className='mb-2 text-3xl font-semibold leading-normal'
                      data-fade='7'
                    >
                      Meals by Ingredient {`(${ingredientName})`}
                    </h3>

                    <p
                      className='mt-4 mb-4 text-sm font-light leading-relaxed text-slate-600'
                      data-fade='8'
                    >
                      {pointedIngredient &&
                        pointedIngredient.ingredient &&
                        pointedIngredient.ingredient.idIngredient &&
                        `${pointedIngredient.ingredient.strDescription} (id:${pointedIngredient.ingredient.idIngredient})`}
                    </p>
                    <p
                      className='mt-4 mb-4 text-sm font-light leading-relaxed text-slate-600'
                      data-fade='8'
                    >
                      do you use routing or clicking your way throught to get
                      here ? never mind let's drink 🍸
                    </p>
                    <form className='flex flex-col gap-4 lg:flex-row'>
                      <StyledInput
                        onChange={(e) => onSubmitHandler(e.target.value)}
                        type='text'
                        placeholder='chicken breast'
                      />
                      <ButtonGroup
                        className={clsxm(
                          'flex items-center justify-center rounded-md p-0',
                          'bg-gradient-to-r',
                          searchMethod === 'fast' &&
                            'from-purple-500 to-indigo-500 active:bg-purple-500',
                          searchMethod === 'detail' &&
                            'from-orange-400 to-pink-600 active:bg-orange-400',
                          searchMethod === 'exact' &&
                            'from-green-400 to-cyan-500 active:bg-green-400'
                        )}
                      >
                        <Button
                          className='h-[36px] w-full rounded-r-none border border-gray-200 bg-transparent text-white sm:h-full'
                          type='submit'
                        >
                          Search
                        </Button>
                        <IconButton
                          className='h-[36px] rounded-l-none border border-gray-200 bg-transparent text-white active:bg-transparent sm:h-full'
                          icon={
                            searchMethod === 'fast'
                              ? BsFillLightningChargeFill
                              : searchMethod === 'detail'
                              ? HiMagnifyingGlass
                              : HiOutlineSearchCircle
                          }
                          iconClassName='h-4 w-4'
                          onClick={() =>
                            setSearchMethod((prev) =>
                              prev === 'fast'
                                ? 'detail'
                                : prev === 'detail'
                                ? 'exact'
                                : 'fast'
                            )
                          }
                        />
                      </ButtonGroup>
                    </form>
                  </div>
                  <div
                    className={clsxm(
                      'isolate flex w-full flex-col items-center px-4 xl:w-8/12 xl:justify-center ',
                      inView ? 'fade-in-start' : ''
                    )}
                  >
                    <HomeSectionIngredient>
                      {pagination.currentData &&
                        pagination.currentData.map((meal) => (
                          <div
                            key={meal.idMeal}
                            className='group relative rounded-md p-2 shadow-md'
                            data-fade='2'
                          >
                            <div className='aspect-w-1 aspect-h-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75'>
                              <NextImage
                                useSkeleton
                                loading='lazy'
                                className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                                iconFallbackClassName='h-full w-full'
                                width={360}
                                height={360}
                                src={meal.strMealThumb ?? ''}
                                alt={
                                  meal.strMeal === null ||
                                  meal.strMeal === undefined
                                    ? meal.idMeal
                                    : meal.strMeal
                                }
                              />
                            </div>
                            <div className='mt-4 flex justify-between'>
                              <div className='fle flex-col text-start'>
                                <Typography variant='h6'>
                                  <UnstyledLink
                                    href={`/meal/${meal.idMeal}`}
                                    className='mt-0 mb-4 font-medium leading-normal text-gray-800'
                                  >
                                    <span
                                      aria-hidden='true'
                                      className='absolute inset-0'
                                    />
                                    <BoldText
                                      text={meal.strMeal ?? ''}
                                      keywords={searchTerm}
                                    ></BoldText>
                                  </UnstyledLink>
                                </Typography>
                              </div>
                              <Typography
                                variant='h6'
                                className='mt-0 mb-4 font-semibold leading-normal text-gray-800'
                              >
                                ❤
                              </Typography>
                            </div>
                          </div>
                        ))}
                    </HomeSectionIngredient>
                    <div
                      className='relative z-10 mt-2 flex flex-col items-end gap-4 text-gray-600'
                      data-fade='4'
                    >
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
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(1, prev - 1))
                          }
                        />
                        {pagination.pagesToRender &&
                          pagination.pagesToRender.map((value, index) => (
                            <Button
                              variant={
                                currentPage === value ? 'outline' : 'ghost'
                              }
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
                    </div>
                  </div>
                </div>
              </HomeSectionSearchWrapper>
            </section>
          )}
        </InView>
        <LayoutFooter />
      </main>
    </Layout>
  );
}
