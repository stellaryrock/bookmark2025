<<<<<<< HEAD
import { ValidationError } from '@/lib/validator/sign';
=======
import { ValidationError } from '@/app/login/sign-form';
>>>>>>> 1ce3363305bc246ab305d91d0a94910c1aa6d120
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
  validationErrors?: ValidationError;
  className?: string;
} & React.HTMLAttributes<HTMLInputElement>;

export default function LabelInput({
  label,
  type,
  name,
  defaultValue,
  ref,
  placeholder,
  validationErrors,
  className,
}: Props) {
  const uniqName = useId();
  return (
    <>
      <label className='text-sm font-semibold capitalize'>
        {label}
        <Input
          name={name || uniqName}
          type={type || 'text'}
          ref={ref}
<<<<<<< HEAD
          defaultValue={defaultValue}
=======
>>>>>>> 1ce3363305bc246ab305d91d0a94910c1aa6d120
          placeholder={placeholder}
          className={cn('bg-gray-100 focus:bg-white font-normal', className)}
        />
        {validationErrors?.errors.map((err, idx) => (
          <p className='text-red-500 font-normal' key={idx}>
            {err}
          </p>
        ))}
      </label>
    </>
  );
}
