'use client';

import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import resource from './sns-login-props.json';

type Props = {
  provider: 'google' | 'github' | 'kakao' | 'naver';
};

export default function LoginButton({ provider }: Props) {
  const props = resource.data[provider];

  return (
    <>
      <Button onClick={() => signIn(provider)} variant='outline' {...props["button"]}>
        <svg xmlns='http://www.w3.org/2000/svg' {...props["svg"]}>
          {props["paths"].map(({ d, fill }, idx) => (
            <path key={idx} d={d} fill={fill} />
          ))}
        </svg>
        <span className='text-sm font-medium capitalize'>{provider}</span>
      </Button>
    </>
  );
}
