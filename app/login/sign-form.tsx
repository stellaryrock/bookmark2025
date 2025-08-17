'use client';

import { regist } from '@/actions/sign';
import { Button } from '@/components/ui/button';
import LabelInput from '@/components/ui/label-input';
import z from 'zod';
import { useEffect, useReducer, useRef, useState } from 'react';

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

export type ValidationError = { errors: string[] } | undefined;
type InputType = 'email' | 'password' | 'passwordConfirm' | 'nickname';
type RegistError = Partial<Record<InputType, ValidationError>>;

function RegistForm({ toggleLogin }: ToggleLoginProps) {
  const emailRef = useRef<HTMLInputElement>(null);

  const [errMessages, setErrMessages] = useState<RegistError>();

  const register = async (formData: FormData) => {
    const result = await regist(formData);

    if (result?.error.errors.length) alert(result?.error.errors[0]);

    setErrMessages(result?.error.properties);
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <form action={register} className=''>
      <LabelInput
        name='email'
        label='email'
        type='email'
        ref={emailRef}
        validationErrors={errMessages?.email}
        placeholder='example@gmail.com'
      />
      <LabelInput
        name='password'
        label='password'
        type='password'
        validationErrors={errMessages?.password}
        placeholder='Your password...'
      />
      <LabelInput
        name='passwordConfirm'
        label='password confirm'
        type='password'
        validationErrors={errMessages?.passwordConfirm}
        placeholder='Confirm Your password...'
      />
      <LabelInput
        name='nickname'
        label='nickname'
        type='text'
        validationErrors={errMessages?.nickname}
        placeholder='nickname...'
      />
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
