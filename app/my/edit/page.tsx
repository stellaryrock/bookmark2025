'use client';

import { logout } from '@/actions/sign';
import { Button } from '@/components/ui/button';
import LabelInput from '@/components/ui/label-input';
import defaultProfile from '@/public/default-profile.jpg';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useActionState } from 'react';
import { FolderOutputIcon, LogOutIcon, SaveAllIcon } from 'lucide-react';
import { updateProfile } from '../my.action';

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
    <form action={makeUpdate} className='grid grid-cols-3 gap-3'>
      <div className='flex flex-col gap-3 p-6'>
        <div className='relative rounded-full border-4 overflow-hidden border-gray-300'>
          <Image
            width={250}
            height={250}
            src={user?.image || defaultProfile}
            alt={`${user?.name} profile image`}
          />
        </div>
        <LabelInput
          error={validError}
          label={'프로필'}
          name='image'
          defaultValue={''}
        />
      </div>
      <div className='col-span-2 flex flex-col gap-3'>
        <LabelInput
          label={'이름'}
          focus={true}
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
        <LabelInput label={'비밀번호'} name='passwd' error={validError} />
        <LabelInput
          label={'새로운 비밀번호'}
          name='new-passwd'
          error={validError}
        />
        <LabelInput
          label={'새로운 비밀번호 확인'}
          name='new-passwd-confirm'
          error={validError}
        />
        <div className='flex justify-items-end gap-4 w-full'>
          <Button variant={'outline'} disabled={isPending} type='submit'>
            <SaveAllIcon /> Save All
          </Button>
          <Button onClick={logout} variant={'outline'} type='button'>
            <LogOutIcon /> Sign Out
          </Button>
          <Button variant={'outline'} type='button'>
            <FolderOutputIcon /> Withdraw
          </Button>
        </div>
      </div>
    </form>
  );
}
