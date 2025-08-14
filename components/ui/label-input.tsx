import { cn } from '@/lib/utils';
import { Input } from './input';

type Props = {
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
};

export default function LabelInput({
  label,
  type,
  placeholder,
  className,
}: Props) {
  return (
    <label className='text-sm font-semibold capitalize'>
      {label}
      <Input
        type={type || 'text'}
        placeholder={placeholder}
        className={cn('bg-gray-100 focus:bg-white font-normal', className)}
      />
    </label>
  );
}
