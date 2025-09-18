'use client';

import { logout } from '@/actions/sign';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Edit from './edit';
import Withdrawl from './withdrawl';

export default function My() {
  const session = useSession();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const TABS = [Edit, Withdrawl];
  const ActiveTab = TABS[tabIndex];

  return (
    <div className=''>
      <div className='flex justify-between items-end p-5 border-b-2'>
        <h1 className='text-3xl'>내 정보</h1>
        <button onClick={() => logout()}>로그아웃</button>
      </div>
      <div className='flex justify-center'>
        <div className='grid grid-cols-[1fr_3fr] w-1/2 p-3'>
          <div className='flex flex-col items-center'>
            <div className='p-3'>
              <button onClick={() => setTabIndex(0)}>정보 수정</button>
            </div>
            <div className='p-3'>
              <button onClick={() => setTabIndex(1)}>회원 탈퇴</button>
            </div>
          </div>
          <div>
            <ActiveTab email={session.data?.user.email} />
          </div>
        </div>
      </div>
    </div>
  );
}
