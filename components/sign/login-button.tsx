'use client';

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
            <path key={idx} d={d} fill={fill} />
          ))}
        </svg>
        <span className='text-sm font-medium capitalize'>{provider}</span>
      </Button>
    </>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 1ce3363 (login-button)
