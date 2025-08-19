'use client';

import { logout } from '@/actions/sign';
import { Button } from '@/components/ui/button';
import LabelInput from '@/components/ui/label-input';
import { useSession } from 'next-auth/react';

export default function My() {
  const session = useSession();
  const { name, email, image, isadmin } = session.data.user;
  console.log(session);

  const signOut = async () => {
    await logout();
  };

  return (
    <div className=''>
      <div className='flex justify-between items-end p-5 border-b-2'>
        <h1 className='text-3xl'>
          내 정보
        </h1>
        <button onClick={signOut}>
          로그아웃
        </button>
      </div>
      <div className="grid grid-cols-2">
        <div className='left'>
          asdf
        </div>
        <div className='content'>
          asdf
        </div>
      </div>
    </div>
    
  );
}
