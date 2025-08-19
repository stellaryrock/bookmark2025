'use client';

import LabelInput from '@/components/ui/label-input';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Edit(){
  const session = useSession();
  const user = session.data?.user;

  return (  
    <>
      <div className='flex flex-col gap-5'>
        <LabelInput label={'이름'} defaultValue={user?.name ?? ''} />  
        <LabelInput label={'이메일'} defaultValue={user?.email ?? ''} />
        <div>
          <Image
            width={50}
            height={50}
            src={user?.image ?? 'path/to/default/image'}
            alt={`${user?.name} profile image`}
          />
          <LabelInput label={'프로필'} type="file" />
        </div>
      </div>
    </>
  )
}