'use client';

import { authenticate, regist } from '@/actions/sign';
import { Button } from '@/components/ui/button';
import LabelInput from '@/components/ui/label-input';
import { redirect, useSearchParams } from 'next/navigation';
import {
  FormEvent,
  useActionState,
  useEffect,
  useReducer,
  useRef,
  useState,
  useTransition,
} from 'react';
import { ValidError } from '@/lib/validator';

type ToggleLoginProps = {
  toggleLogin: () => void;
  email?: string | null;
};

export default function SignForm() {
  const [isLogin, toggleLogin] = useReducer((pre) => !pre, true);
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <>
      {isLogin ? (
        <LoginForm toggleLogin={toggleLogin} email={email} />
      ) : (
        <RegistForm toggleLogin={toggleLogin} />
      )}
    </>
  );
}

// QQQ
const mock = {
  email: 'jeonseongho@naver.com',
  passwd: '111111',
  passwd2: '111111',
  nickname: 'Hongkildong',
};

function RegistForm({ toggleLogin }: ToggleLoginProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const [validError, setValidError] = useState<ValidError>();

  const register = async (formData: FormData) => {
    const rs = await regist(formData);
    console.log('🚀 ~ rs:', rs);
    if (!rs.success) return setValidError(rs);

    const { email, emailcheck } = rs.data;
    redirect(
      `/login/error?error=CheckEmail&email=${email}&emailcheck=${emailcheck}`
    );
  };

  // const [validError, register, isPending] = useActionState(
  //   async (_preValidError: ValidError | undefined, formData: FormData) => {
  //     const rs = await regist(formData);
  //     if (!rs.success) return rs;
  //     const { email, emailcheck } = rs.data;
  //     redirect(
  //       `/login/error?error=CheckEmail&email=${email}&emailcheck=${emailcheck}`
  //     );
  //   },
  //   undefined
  // );

  const [isPending, startTransition] = useTransition();
  const handleSumit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    startTransition(() => {
      register(new FormData(evt.currentTarget));
    });
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    // <form action={register} className=''>
    <form onSubmit={handleSumit} className='flex flex-col gap-3'>
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
      <Button
        type='submit'
        variant={'primary'}
        className='w-full mt-3'
        disabled={isPending}
      >
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

function LoginForm({ toggleLogin, email }: ToggleLoginProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwdRef = useRef<HTMLInputElement>(null);

  const [validError, loginAction, isPending] = useActionState(
    authenticate,
    // async (preValidError: ValidError | undefined, formData: FormData) => {
    //   const rs = await login(formData);
    //   console.log('🚀 ~ rs:', rs);
    //   if (!rs.success) return setValidError(rs);

    //   const { email, emailcheck } = rs.data;
    //   redirect(
    //     `/login/error?error=CheckEmail&email=${email}&emailcheck=${emailcheck}`
    //   );
    // },
    undefined
  );

  useEffect(() => {
    if (email) passwdRef.current?.focus();
    else emailRef.current?.focus();
  }, []);

  return (
    <form action={loginAction} className='flex flex-col gap-3'>
      <LabelInput
        label='email'
        type='email'
        name='email'
        ref={emailRef}
        defaultValue={email || ''}
        error={validError}
        placeholder='example@gmail.com'
      />
      <LabelInput
        label='password'
        type='password'
        name='passwd'
        ref={passwdRef}
        error={validError}
        placeholder='Your password...'
      />
      <div className='flex justify-between my-2'>
        <label className='cursor-pointer hover:text-blue-600'>
          <input type='checkbox' className='mr-1 translate-y-[1px]' />
          Remember me
        </label>
        <a href='#'>Forgot password?</a>
      </div>
      <Button type='submit' variant={'primary'} className='w-full'>
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
