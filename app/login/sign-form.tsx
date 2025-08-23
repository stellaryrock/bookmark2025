'use client';

import { regist, ValidError } from '@/actions/sign';
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

// QQQ
const mock = {
  email: 'aaa@gmail.com',
  passwd: '111111',
  passwd2: '111112',
  nickname: 'Hongkildong',
};

function RegistForm({ toggleLogin }: ToggleLoginProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const [validError, setValidError] = useState<ValidError>();

  const register = async (formData: FormData) => {
    const rs = await regist(formData);
    console.log('🚀 ~ rs:', rs);
    if (!rs.success) setValidError(rs.error);
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <form action={register} className=''>
      <LabelInput
        label='email'
        name='email'
        type='email'
        defaultValue={mock.email}
        ref={emailRef}
        error={validError}
        placeholder='example@gmail.com'
      />
      <LabelInput
        label='password'
        name='passwd'
        type='password'
        defaultValue={mock.passwd}
        error={validError}
        placeholder='Your password...'
      />
      <LabelInput
        label='password confirm'
        name='passwd2'
        type='password'
        defaultValue={mock.passwd2}
        error={validError}
        placeholder='Confirm Your password...'
      />
      <LabelInput
        label='nickname'
        name='nickname'
        type='text'
        defaultValue={mock.nickname}
        error={validError}
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
