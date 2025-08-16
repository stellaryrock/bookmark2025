import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dynamicCss = [
  'translate-x-[-20px]',
  'translate-x-[-40px]',
  'translate-x-[-260px]',
  'translate-x-[-100px]',
  'translate-x-[-120px]',
];
