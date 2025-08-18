'use client';

import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import data from './ctrl+v.json';

type Props = {
  provider: 'google' | 'github' | 'kakao' | 'naver';
};

export default function LoginButton({ provider }: Props) {
  const properties = data[provider];
  const { button, svg, paths } = properties;

  return (
    <>
      <Button onClick={() => signIn(provider)} variant='outline' {...button}>
        <svg xmlns='http://www.w3.org/2000/svg' {...svg}>
          {paths.map(({ d, fill }, idx) => (
            <path key={idx} d={d} fill={fill} />
          ))}
        </svg>
        <span className='text-sm font-medium capitalize'>{provider}</span>
      </Button>
    </>
  );
}
