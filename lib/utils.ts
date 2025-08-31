import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { v4 } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function newToken() {
  return v4();
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

export function newToken() {
  return v4();
}
