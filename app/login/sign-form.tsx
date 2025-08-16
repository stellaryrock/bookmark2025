'use client';

import { regist } from '@/actions/sign';
import { Button } from '@/components/ui/button';
import LabelInput from '@/components/ui/label-input';
import { useEffect, useReducer, useRef } from 'react';

type ToggleLoginProps = {
  toggleLogin: () => void;
};

export default function SignForm() {
  const [isLogin, toggleLogin] = useReducer((pre) => !pre, false); // QQQ

  return (
    <>
      {isLogin ? (
        <LoginForm toggleLogin={toggleLogin} />
      ) : (
        <RegistForm toggleLogin={toggleLogin} />
      )}
    </>
  );
}

function RegistForm({ toggleLogin }: ToggleLoginProps) {
  const emailRef = useRef<HTMLInputElement>(null);

  const register = async (formData: FormData) => {
    await regist(formData);
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <form action={register} className=''>
      <LabelInput
        label='email'
        type='email'
        ref={emailRef}
        placeholder='example@gmail.com'
      />
      <LabelInput
        label='password'
        type='password'
        placeholder='Your password...'
      />
      <LabelInput
        label='password confirm'
        type='password'
        placeholder='Confirm Your password...'
      />
      <LabelInput label='nickname' type='text' placeholder='nickname...' />
      <Button type='submit' variant={'primary'} className='w-full mt-3'>
        Sign up
      </Button>

      <div className='mt-3'>
        Already have account?
        <Button
          onClick={toggleLogin}
          variant={'link'}
          className='ml-2 text-blue-500'
        >
          Sign in
        </Button>
      </div>
    </form>
  );
}

function LoginForm({ toggleLogin }: ToggleLoginProps) {
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // console.log('***>>', emailRef.current);
    emailRef.current?.focus();
  }, []);

  return (
    <form className=''>
      <LabelInput
        label='email'
        type='email'
        ref={emailRef}
        placeholder='example@gmail.com'
      />
      <LabelInput
        label='password'
        type='password'
        placeholder='Your password...'
      />
      <div className='flex justify-between my-2'>
        <label className='cursor-pointer hover:text-blue-600'>
          <input type='checkbox' className='mr-1 translate-y-[1px]' />
          Remember me
        </label>
        <a href='#'>Forgot password?</a>
      </div>
      <Button variant={'primary'} className='w-full'>
        Login with your account
      </Button>

      <div className='mt-3'>
        Don&apos;t have account?
        <Button
          onClick={toggleLogin}
          variant={'link'}
          className='ml-2 text-blue-500'
        >
          Sign up
        </Button>
      </div>
    </form>
  );
}
