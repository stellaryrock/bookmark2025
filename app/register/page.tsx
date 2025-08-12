'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import {
  emailSchema,
  fileSchema,
  passwordSchema,
  usernameSchema,
} from '@/lib/schema/register';
import FormInput from './FormInput';

export default function Register() {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Enter') btnRef.current?.click();
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <>
      <div className='max-w-md mx-auto'>
        <form action=''>
          <div className='flex flex-col gap-3'>
            <FormInput
              name={'id'}
              type={'email'}
              label={'아이디'}
              schema={emailSchema}
            />
            <FormInput
              name={'password'}
              type={'password'}
              label={'비밀번호'}
              schema={passwordSchema}
            />
            <FormInput
              name={'username'}
              type={'text'}
              label={'이름'}
              schema={usernameSchema}
            />
            <FormInput 
              name={'profile'}
              type={'file'}
              label={'프로필 사진'}
              schema={fileSchema}
            />
            <Button ref={btnRef} className='my-5' type='submit'>
              등록하기
            </Button>
            
          </div>
        </form>
      </div>
    </>
  );
}
