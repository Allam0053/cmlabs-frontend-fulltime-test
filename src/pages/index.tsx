/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import * as React from 'react';
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsFillLightningChargeFill,
} from 'react-icons/bs';
import { HiOutlineSearchCircle } from 'react-icons/hi';
import { HiMagnifyingGlass } from 'react-icons/hi2';

import {
  fetchAndHandleAllIngredients_,
  fetchAndHandleMealCount,
} from '@/lib/axios-request';
import clsxm from '@/lib/clsxm';
import useFetchIngredient from '@/hooks/useFetchIngredient';
import useIsMounted from '@/hooks/useIsMounted';
import useMealCountByIngredient from '@/hooks/useMealCountByIngredient';
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
import ArrowLink from '@/components/links/ArrowLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import HomeSectionIngredient from '@/components/organism/HomeSectionIngredient';
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
// detail = HiMagnifyingGlass
export default function HomePage({
  ingredients: ingStats,
  meals: meStats,
}: {
  ingredients: number;
  meals: number;
}) {
  const { data } = useFetchIngredient();

  const {
    searchMethod,
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

  const isMounted = useIsMounted(100);

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main className='flex h-full w-screen flex-col items-center'>
        <section id='hero-section' className='w-screen'>
          <HeroSection
            stats={[
              { name: 'Available Ingredients', value: ingStats },
              { name: 'Meal Recipes', value: meStats },
            ]}
            links={[
              { name: 'Search Ingredients', href: '#search-ingredients' },
            ]}
          />
        </section>
        <section
          className={clsxm(
            'layout flex flex-col bg-white py-12',
            isMounted && 'fade-in-start'
          )}
          id='search-ingredients'
        >
          <SearchSection>
            <div className='container relative mx-auto flex flex-col items-center xl:flex-row xl:flex-wrap'>
              <div
                className={clsxm(
                  'relative w-full px-4 xl:w-4/12',
                  isMounted ? 'fade-in-start' : ''
                )}
              >
                <div
                  className={clsxm(
                    '-z-10',
                    'lg:[40vw] absolute -top-8 -left-8 h-[2px] w-[80vw] md:w-[30vw]',
                    'bg-[linear-gradient(90deg,rgb(56,189,248)_10%,rgb(129,140,248)_30%,rgb(249,115,22)_80%)]',
                    '[mask-image:radial-gradient(80%_80%_at_left,white,transparent)]',
                    isMounted && 'moveleft-start'
                  )}
                  data-moveleft
                />
                <div
                  className={clsxm(
                    '-z-10',
                    'absolute -top-12 -left-4 h-[80vh] w-[2px] md:h-[30vh]',
                    'bg-[linear-gradient(0deg,rgb(249,115,22)_10%,rgb(129,140,248)_30%,rgb(56,189,248)_50%)]',
                    '[mask-image:radial-gradient(80%_90%_at_top,white,transparent)]',
                    isMounted && 'moveup-start'
                  )}
                  data-moveup
                />
                <div
                  className='mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center text-slate-500 shadow-lg'
                  data-fade='7'
                >
                  <i className='fas fa-burger text-xl'></i>
                </div>
                <h3
                  className='mb-2 text-3xl font-semibold leading-normal'
                  data-fade='7'
                >
                  Ingredients
                </h3>
                <p
                  className='mt-4 mb-4 text-lg font-light leading-relaxed text-slate-600'
                  data-fade='8'
                >
                  Our website is organized around a comprehensive ingredient
                  database, which allows you to search for recipes based on
                  specific ingredients. Simply enter the ingredient you're
                  looking for, and our platform will provide you with a variety
                  of recipe options that feature that ingredient.
                </p>
                <p
                  className='mt-4 mb-4 text-lg font-light leading-relaxed text-slate-600'
                  data-fade='8'
                >
                  Whether you're looking for a recipe to make for dinner tonight
                  or for a special occasion, our website has you covered. 🍸
                </p>
                <form
                  onSubmit={onSubmitHandler}
                  className='flex flex-col gap-4 lg:flex-row'
                >
                  <StyledInput
                    ref={inputRef}
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
                  isMounted ? 'fade-in-start' : ''
                )}
              >
                <HomeSectionIngredient>
                  {pagination.currentData &&
                    pagination.currentData.map((ingredient) => (
                      <div
                        key={ingredient.ingredient.idIngredient}
                        className='group relative rounded-md p-2 shadow-md'
                      >
                        <div className='aspect-w-1 aspect-h-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75'>
                          <NextImage
                            useSkeleton
                            loading='lazy'
                            className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                            iconFallbackClassName='w-[360px] h-[360px]'
                            width={360}
                            height={360}
                            src={ingredient.image}
                            alt={
                              ingredient.ingredient.strIngredient === null ||
                              ingredient.ingredient.strIngredient === undefined
                                ? ingredient.ingredient.idIngredient
                                : ingredient.ingredient.strIngredient
                            }
                          />
                        </div>
                        <div className='mt-4 flex justify-between'>
                          <div className='fle flex-col text-start'>
                            <Typography variant='h6'>
                              <UnstyledLink
                                href={`/ingredient/${ingredient.ingredient.strIngredient}`}
                                className='mt-0 mb-4 font-medium leading-normal text-gray-800'
                              >
                                <span
                                  aria-hidden='true'
                                  className='absolute inset-0'
                                />
                                <BoldText
                                  text={
                                    ingredient.ingredient.strIngredient ?? ''
                                  }
                                  keywords={searchTerm}
                                ></BoldText>
                              </UnstyledLink>
                            </Typography>
                          </div>
                          <Typography
                            variant='h6'
                            className='mt-0 mb-4 font-semibold leading-normal text-gray-800'
                          >
                            {mealCountByIngredient.get(
                              ingredient.ingredient.idIngredient
                            ) ?? '--'}
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
                  <footer className='pt-12 pb-2 text-gray-700'>
                    © {new Date().getFullYear()} By{' '}
                    <UnderlineLink href='https://allam-taju.vercel.app'>
                      Allam Taju Sarof
                    </UnderlineLink>
                  </footer>
                </div>
              </div>
            </div>
          </SearchSection>
        </section>
      </main>
    </Layout>
  );
}

// const links = [
//   { name: 'Open roles', href: '#search-ingredients' },
// ];
// const stats = [
//   { name: 'Offices worldwide', value: '12' },
//   { name: 'Full-time colleagues', value: '300+' },
//   { name: 'Hours per week', value: '40' },
//   { name: 'Paid time off', value: 'Unlimited' },
// ];

type HeroSectionProps = {
  links: { name: string; href: string }[];
  stats: { name: string; value: string | number }[];
};

export function HeroSection({ links, stats }: HeroSectionProps) {
  return (
    <div className='min:h-screen relative isolate flex h-full flex-col items-start justify-start overflow-hidden bg-gray-900 py-16 sm:h-screen sm:justify-center'>
      <div
        className='min:h-screen absolute top-0 -z-10 h-full w-full bg-cover bg-center sm:h-screen'
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&dl=dan-gold-4_jhDO54BYg-unsplash.jpg&w=2400&q=80&fm=jpg&crop=entropy&cs=tinysrgb')",
        }}
      >
        <span
          id='blackOverlay'
          className='absolute h-full w-full bg-black opacity-80'
        ></span>
      </div>
      <svg
        viewBox='0 0 1097 845'
        aria-hidden='true'
        className='hidden transform-gpu blur-3xl sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:w-[68.5625rem]'
      >
        <path
          fill='url(#10724532-9d81-43d2-bb94-866e98dd6e42)'
          fillOpacity='.2'
          d='M301.174 646.641 193.541 844.786 0 546.172l301.174 100.469 193.845-356.855c1.241 164.891 42.802 431.935 199.124 180.978 195.402-313.696 143.295-588.18 284.729-419.266 113.148 135.13 124.068 367.989 115.378 467.527L811.753 372.553l20.102 451.119-530.681-177.031Z'
        />
        <defs>
          <linearGradient
            id='10724532-9d81-43d2-bb94-866e98dd6e42'
            x1='1097.04'
            x2='-141.165'
            y1='.22'
            y2='363.075'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#776FFF' />
            <stop offset={1} stopColor='#FF4694' />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox='0 0 1097 845'
        aria-hidden='true'
        className='absolute left-1/2 -top-52 -z-10 w-[68.5625rem] -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0'
      >
        <path
          fill='url(#8ddc7edb-8983-4cd7-bccb-79ad21097d70)'
          fillOpacity='.2'
          d='M301.174 646.641 193.541 844.786 0 546.172l301.174 100.469 193.845-356.855c1.241 164.891 42.802 431.935 199.124 180.978 195.402-313.696 143.295-588.18 284.729-419.266 113.148 135.13 124.068 367.989 115.378 467.527L811.753 372.553l20.102 451.119-530.681-177.031Z'
        />
        <defs>
          <linearGradient
            id='8ddc7edb-8983-4cd7-bccb-79ad21097d70'
            x1='1097.04'
            x2='-141.165'
            y1='.22'
            y2='363.075'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#776FFF' />
            <stop offset={1} stopColor='#FF4694' />
          </linearGradient>
        </defs>
      </svg>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
            Explore The Taste
          </h2>
          <p className='mt-6 text-lg leading-8 text-gray-300'>
            Welcome to our recipe database website! Our platform is designed to
            provide you with a wide range of recipes to suit your taste and
            preferences. We have an extensive database of recipes that include
            everything from traditional favorites to modern twists on classic
            dishes.
          </p>
        </div>
        <div className='mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none'>
          <div className='grid grid-cols-1 gap-y-6 gap-x-8 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10'>
            {links.map((link) => (
              <ArrowLink key={link.name} href={link.href}>
                {link.name}
              </ArrowLink>
            ))}
          </div>
          <dl className='mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4'>
            {stats.map((stat) => (
              <div key={stat.name} className='flex flex-col-reverse'>
                <dt className='text-base leading-7 text-gray-300'>
                  {stat.name}
                </dt>
                <dd className='text-2xl font-bold leading-9 tracking-tight text-white'>
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export function SearchSection({ children }: { children: React.ReactNode }) {
  return (
    <div className='header max-h-860-px relative mb-[60px] flex h-screen w-full items-center pt-16'>
      <div className='isolate h-full w-full bg-white'>
        <div className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]'>
          <svg
            className='relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]'
            viewBox='0 0 1155 678'
          >
            <path
              fill='url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)'
              fillOpacity='.3'
              d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
            />
            <defs>
              <linearGradient
                id='45de2b6b-92d5-4d68-a6a0-9b9b2abad533'
                x1='1155.49'
                x2='-78.208'
                y1='.177'
                y2='474.645'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#9089FC' />
                <stop offset={1} stopColor='#FF80B5' />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className='relative flex h-full w-full justify-center px-6 lg:px-8'>
          <div className='absolute inset-0 bg-[url(/images/grid.svg)] bg-right-bottom [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]' />
          {children}
          <div className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'>
            <svg
              className='relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]'
              viewBox='0 0 1155 678'
            >
              <path
                fill='url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)'
                fillOpacity='.3'
                d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
              />
              <defs>
                <linearGradient
                  id='ecb5b0c9-546c-4772-8c71-4d3f06d544bc'
                  x1='1155.49'
                  x2='-78.208'
                  y1='.177'
                  y2='474.645'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#9089FC' />
                  <stop offset={1} stopColor='#FF80B5' />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// run on server
export async function getStaticProps() {
  const responseIngredient = await fetchAndHandleAllIngredients_();
  const responseMeal = await fetchAndHandleMealCount('');

  return {
    props: {
      ingredients: _.get(responseIngredient, 'data.meals.length', 0),
      meals: _.get(responseMeal, 'data.meals.length', 0),
    },
    revalidate: 86400, // revalidate every 1 day (in seconds)
  };
}
