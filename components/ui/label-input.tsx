import { RefObject, useId } from 'react';
import { cn } from '@/lib/utils';
import { ValidError } from '@/lib/validator';
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
  return (
    <div>
      <label htmlFor={uniqName} className='text-sm font-semibold capitalize'>
        {label}
        <Input
          id={uniqName}
          name={name || uniqName}
          type={type || 'text'}
          ref={ref}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={cn('bg-gray-100 focus:bg-white font-normal', className)}
        />
      </label>
      {error &&
        name &&
        error.error[name] &&
        error.error[name].errors?.map((err) => (
          <div key={err} className='text-red-500 text-sm mb-1'>
            {err}
          </div>
        ))}
    </div>
  );
}
