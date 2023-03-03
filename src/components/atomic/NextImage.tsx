import Image, { ImageProps } from 'next/image';
import * as React from 'react';
import { BsQuestionSquareFill } from 'react-icons/bs';

import clsxm from '@/lib/clsxm';

type NextImageProps = {
  useSkeleton?: boolean;
  imgClassName?: string;
  blurClassName?: string;
  alt: string;
} & (
  | { width: string | number; height: string | number }
  | { layout: 'fill'; width?: string | number; height?: string | number }
) &
  ImageProps;

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export default function NextImage({
  useSkeleton = false,
  src,
  width,
  height,
  alt,
  className,
  imgClassName,
  blurClassName,
  ...rest
}: NextImageProps) {
  const [status, setStatus] = React.useState(
    useSkeleton ? 'loading' : 'complete'
  );
  const widthIsSet = className?.includes('w-') ?? false;

  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={className}
    >
      {!imageError ? (
        <Image
          className={clsxm(
            imgClassName,
            status === 'loading' && clsxm('animate-pulse', blurClassName)
          )}
          src={src}
          width={width}
          height={height}
          alt={alt}
          onLoadingComplete={() => setStatus('complete')}
          onError={handleImageError}
          {...rest}
        />
      ) : (
        <BsQuestionSquareFill
          className={clsxm(imgClassName)}
          width={width}
          height={height}
        />
      )}
    </figure>
  );
}
