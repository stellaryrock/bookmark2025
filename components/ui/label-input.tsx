import { RefObject, useId } from 'react';
import { cn } from '@/lib/utils';
import { ValidError } from '@/lib/validator';
import { Input } from './input';

type Props = {
  label: string;
  type?: string;
  name?: string;
  ref?: RefObject<HTMLInputElement | null>;
  error?: ValidError;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
};

export default function LabelInput({
  label,
  type,
  name,
  ref,
  error,
  defaultValue,
  placeholder,
  className,
}: Props) {
  const uniqName = useId();
  const err = error && name ? error.error[name] : { errors: [], value: '' };
  return (
    <div>
      <label htmlFor={uniqName} className='text-sm font-semibold capitalize'>
        {label}
        <Input
          id={uniqName}
          name={name || uniqName}
          type={type || 'text'}
          ref={ref}
          defaultValue={defaultValue || err?.value?.toString()}
          placeholder={placeholder}
          className={cn('bg-gray-100 focus:bg-white font-normal', className)}
        />
      </label>
      {err?.errors?.map((e) => (
        <div key={e} className='text-red-500 text-sm mb-1'>
          {e}
        </div>
      ))}
    </div>
  );
}
