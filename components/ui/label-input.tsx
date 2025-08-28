import { cn } from '@/lib/utils';
import { ValidError } from '@/lib/validator';
import { RefObject, useId } from 'react';
import { Input } from './input';

type Props = {
  label: string;
  type?: string;
  name?: string;
<<<<<<< HEAD
  error?: ValidError;
=======
>>>>>>> bd3514fc11248c57e9092c77a0ca66e562a6caac
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
  error,
  placeholder,
  className,
}: Props) {
  const uniqName = useId();
  const err = error && name ? error.error[name]
                            : {errors: [], value: ''};
  return (
    <div>
      <label htmlFor={uniqName} className='text-sm font-semibold capitalize'>
        {label}
        <Input
          id={uniqName}
          name={name || uniqName}
          type={type || 'text'}
          ref={ref}
          defaultValue={ defaultValue || err.value?.toString() }
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
