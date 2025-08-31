'use client';

import { RefObject, useEffect, useId, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ValidError } from '@/lib/validator';
import { Input } from './input';

type Props = {
  label: string;
  type?: string;
  name?: string;
  defaultValue?: string;
  ref?: RefObject<HTMLInputElement | null>;
  error?: ValidError;
  focus?: boolean;
  placeholder?: string;
  className?: string;
};

export default function LabelInput({
  label,
  type,
  name,
  defaultValue,
  ref,
  error,
  focus,
  placeholder,
  className,
}: Props) {
  const uniqName = useId();
  const inpRef = useRef<HTMLInputElement>(null);
  const err = error && name ? error.error[name] : { errors: [], value: '' };

  useEffect(() => {
    if (focus || err.errors.length) {
      if (ref) ref.current?.focus();
      else inpRef.current?.focus();
    }
  }, [ref, focus, err.errors]);

  return (
    <div>
      <label htmlFor={uniqName} className='text-sm font-semibold capitalize'>
        {label}
        <Input
          id={uniqName}
          name={name || uniqName}
          type={type || 'text'}
          ref={ref || inpRef}
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
