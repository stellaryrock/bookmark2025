'use client';

<<<<<<< HEAD
<<<<<<< HEAD
import { Button } from '../ui/button';
import resource from './sns-login-props.json';
import { login, Provider } from '@/actions/sign';

type Props = {
  provider: Provider;
};

export default function LoginButton({ provider }: Props) {
  const props = resource.data[provider];
  const loginAction = async () => {
    login(provider);
  }
  
  return (
    <>
      <Button onClick={loginAction} variant='outline' {...props["button"]}>
        <svg xmlns='http://www.w3.org/2000/svg' {...props["svg"]}>
          {props["paths"].map(({ d, fill }, idx) => (
=======
=======
>>>>>>> 7cb87a8 (login-button)
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
<<<<<<< HEAD
>>>>>>> 1ce3363 (login-button)
=======
>>>>>>> 7cb87a8 (login-button)
            <path key={idx} d={d} fill={fill} />
          ))}
        </svg>
        <span className='text-sm font-medium capitalize'>{provider}</span>
      </Button>
    </>
  );
}
