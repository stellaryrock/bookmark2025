import { ValidationError } from '@/app/login/sign-form';
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
  validationErrors?: ValidationError;
  className?: string;
} & React.HTMLAttributes<HTMLInputElement>;

export default function LabelInput({
  label,
  type,
  name,
  ref,
  error,
  defaultValue,
  placeholder,
  validationErrors,
  className,
}: Props) {
  const uniqName = useId();
  return (
<<<<<<< HEAD
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
=======
    <>
      <label className='text-sm font-semibold capitalize'>
        {label}
        <Input
          name={name || uniqName}
          type={type || 'text'}
          ref={ref}
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
>>>>>>> f0f00db (regist form)
  );
}