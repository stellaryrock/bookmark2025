'use client';
import { useState } from 'react';
import Withdrawl from './withdrawl';
import { Edit } from 'lucide-react';

export default function My() {

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className=''>
      <div className='flex justify-between items-end p-5 border-b-2'>
        <h1 className='text-3xl'>
          내 정보
        </h1>
        <button>
          로그아웃
        </button>
      </div>
      <div className="grid grid-cols-[1fr_3fr]">
        <div className='flex flex-col items-center'>
          <div className='p-3'>
            <button onClick={()=>setTabIndex(0)}>정보 수정</button>
          </div>
          <div className='p-3'>
            <button onClick={()=>setTabIndex(1)}>회원 탈퇴</button>
          </div>
        </div>
        <div className='my-5'>
          {tabIndex ? <Withdrawl /> : <Edit />}
        </div>
      </div>
    </div>    
  );
}
