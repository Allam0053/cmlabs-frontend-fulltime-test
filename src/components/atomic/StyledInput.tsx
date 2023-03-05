import clsx from 'clsx';
import * as React from 'react';

export default function StyledInput({
  className,
  ...rest
}: React.ComponentPropsWithRef<'input'>) {
  return (
    <input
      className={clsx(
        className,
        'w-full rounded-md',
        'border border-gray-300 ',
        'focus:border-primary-300 focus:outline-none focus:ring-0 '
      )}
      {...rest}
    />
  );
}
