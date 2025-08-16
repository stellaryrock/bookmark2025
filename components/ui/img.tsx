/* eslint-disable @next/next/no-img-element */
import { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  src: string;
  alt?: string;
  className?: string;
} & ComponentProps<'img'>;

export default function Img({ src, alt, className, ...props }: Props) {
  return (
    <>
      <img src={src} alt={alt || src} className={cn(className)} {...props} />
    </>
  );
}
