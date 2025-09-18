'use client';

import LabelInput from '@/components/ui/label-input';
import defaultProfile from '@/public/default-profile.jpg';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useActionState } from 'react';
import { updateProfile } from './my.action';

export default function Edit() {
  const { data, update } = useSession();
  const user = data?.user;

  const [validError, updateAction, isPending] = useActionState(
    updateProfile,
    undefined
  );

  const makeUpdate = async (formData: FormData) => {
    updateAction(formData);
    const formObj = Object.fromEntries(formData.entries());
    const newSession = { ...user, ...formObj };
    await update(newSession);
  };

  return (
    <>
      <form action={makeUpdate} className='flex flex-col gap-7'>
        <LabelInput
          label={'이름'}
          name='nickname'
          error={validError}
          defaultValue={user?.nickname ?? ''}
        />
        <LabelInput
          label={'이메일'}
          name='email'
          error={validError}
          defaultValue={user?.email ?? ''}
        />
        <div>
          <Image
            width={50}
            height={50}
            src={user?.image || defaultProfile}
            alt={`${user?.name} profile image`}
          />
          <LabelInput error={validError} label={'프로필'} name='image' />
        </div>
        <div className='flex justify-end'>
          <button disabled={isPending} type='submit'>
            수정하기
          </button>
        </div>
      </form>
    </>
  );
}
