'use client';

import LabelInput from '@/components/ui/label-input';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import defaultProfile from '@/public/default-profile.jpg';

export default function Edit(){
  const session = useSession();
  const user = session.data?.user;

  return (  
    <>
      <form action="" className='flex flex-col gap-7'>
        <LabelInput label={'이름'} name='name' defaultValue={user?.name ?? ''} />  
        <LabelInput label={'이메일'} name='email' defaultValue={user?.email ?? ''} />
        <div>
          <Image
            width={50}
            height={50}
            src={user?.image ?? defaultProfile}
            alt={`${user?.name} profile image`}
          />
          <LabelInput label={'프로필'} name='image' type="file" />
        </div>
      </form>
    </>
  )
}