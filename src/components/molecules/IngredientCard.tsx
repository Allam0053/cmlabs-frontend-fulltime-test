import * as React from 'react';
import { GiTechnoHeart } from 'react-icons/gi';

import clsxm from '@/lib/clsxm';

import Accent from '@/components/atomic/Accent';
import BoldText from '@/components/atomic/BoldText';
import NextImage from '@/components/atomic/NextImage';
import UnstyledLink from '@/components/links/UnstyledLink';

import { Ingredient } from '@/types/models';

type IngredientCardProps = {
  snippet: {
    ingredient: Ingredient;
    image: string;
  };
  mealCount?: number | string;
  searchTerm?: string[];
} & React.ComponentPropsWithoutRef<'li'>;

export default function IngredientCard({
  className,
  snippet,
  searchTerm,
  mealCount,
}: IngredientCardProps) {
  return (
    <li
      className={clsxm(
        'ring-vis-0 h-full rounded-md border bg-white',
        'scale-100 hover:scale-[1.04] active:scale-[0.97] motion-safe:transform-gpu',
        'transition duration-100',
        'motion-reduce:hover:scale-100',
        'animate-shadow',
        className
      )}
    >
      <UnstyledLink
        href={`/ingredient/${snippet.ingredient.strIngredient}`}
        className='block h-full rounded-md focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
      >
        <div className='grid grid-cols-3 gap-4 p-4 '>
          <div className='col-span-2'>
            <h4 className='text-gray-800 '>
              <BoldText
                text={snippet.ingredient.strIngredient ?? ''}
                keywords={searchTerm ?? []}
              ></BoldText>
            </h4>

            <div className='mt-1 flex items-center justify-start gap-3 text-sm font-medium text-gray-600 '>
              <div className='flex items-center gap-1'>
                <GiTechnoHeart className='inline-block text-base' />
                <Accent>{mealCount ?? '–––'} Meals</Accent>
              </div>
              <span>•</span>
            </div>

            <p className='mt-4 text-sm text-gray-600 '>
              {snippet.ingredient.strDescription?.substring(0, 50)}
            </p>
          </div>
          <div className='h-full w-full bg-white'>
            <NextImage
              useSkeleton
              loading='lazy'
              className='w-32 md:w-40'
              src={snippet.image}
              width='240'
              height='240'
              alt={
                snippet.ingredient.strIngredient === null ||
                snippet.ingredient.strIngredient === undefined
                  ? snippet.ingredient.idIngredient
                  : snippet.ingredient.strIngredient
              }
            />
          </div>
        </div>
      </UnstyledLink>
    </li>
  );
}
