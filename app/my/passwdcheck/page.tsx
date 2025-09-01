'use client';

import { checkPassword } from '@/actions/sign';
import { Button } from '@/components/ui/button';
import LabelInput from '@/components/ui/label-input';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { ValidError } from '@/lib/validator';

export default function PasswdCheck() {
  const { data } = useSession();
  const [validError, setValidError] = useState<ValidError | undefined>(
    undefined
  );

  const checkPasswd = async (formData: FormData) => {
    formData.append('email', data?.user.email ?? '');
    formData.append('nickname', data?.user.nickname ?? '');
    const rs = await checkPassword(formData);
    if (!rs.success) {
      return setValidError(rs);
    }
    console.log(rs);
    const { email, emailcheck } = rs.data;

    redirect(
      `/login/error?error=CheckEmail&email=${email}&emailcheck=${emailcheck}`
    );
  };

  return (
    <>
      <div className='w-1/3 mx-auto'>
        <form action={checkPasswd} className='flex flex-col gap-4'>
          <LabelInput
            label={'현재 비밀번호'}
            name='passwd'
            type='password'
            error={validError}
          />
          <LabelInput
            label={'비밀번호 확인'}
            name='passwd2'
            type='password'
            error={validError}
          />
          <div className='flex justify-end'>
            <Button type='submit'>확인</Button>
          </div>
        </form>
      </div>
    </>
  );
}
