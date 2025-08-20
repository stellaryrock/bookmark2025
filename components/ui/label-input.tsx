import { RefObject, useId } from 'react';
import { cn } from '@/lib/utils';
import { Input } from './input';

type Props = {
  label: string;
  type?: string;
  name?: string;
  defaultValue?: string;
  ref?: RefObject<HTMLInputElement | null>;
  placeholder?: string;
  className?: string;
};

export default function LabelInput({
  label,
  type,
  name,
  defaultValue,
  ref,
  placeholder,
  className,
}: Props) {
  const uniqName = useId();
  return (
    <label className='text-sm font-semibold capitalize'>
      {label}
      <Input
        name={name || uniqName}
        type={type || 'text'}
        ref={ref}
        defaultValue={defaultValue || ''}
        placeholder={placeholder}
        className={cn('bg-gray-100 focus:bg-white font-normal', className)}
      />
    </label>
  );
}
