import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dynamicCss = [
  'translate-x-[-20px]',
  'translate-x-[-40px]',
  'translate-x-[-60px]',
  'translate-x-[-80px]',
  'translate-x-[-100px]',
  'translate-x-[-120px]',
  'translate-x-[-140px]',
];
