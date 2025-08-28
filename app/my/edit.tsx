'use client';

import LabelInput from '@/components/ui/label-input';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
<<<<<<< HEAD
import defaultProfile from '@/public/default-profile.jpg';
=======
>>>>>>> d0a8150b75c45a1ea5269c7f28c757e076420b99

export default function Edit(){
  const session = useSession();
  const user = session.data?.user;

  return (  
    <>
<<<<<<< HEAD
      <form action="" className='flex flex-col gap-7'>
        <LabelInput label={'이름'} name='name' defaultValue={user?.name ?? ''} />  
        <LabelInput label={'이메일'} name='email' defaultValue={user?.email ?? ''} />
=======
      <div className='flex flex-col gap-5'>
        <LabelInput label={'이름'} defaultValue={user?.name ?? ''} />  
        <LabelInput label={'이메일'} defaultValue={user?.email ?? ''} />
>>>>>>> d0a8150b75c45a1ea5269c7f28c757e076420b99
        <div>
          <Image
            width={50}
            height={50}
<<<<<<< HEAD
            src={user?.image ?? defaultProfile}
            alt={`${user?.name} profile image`}
          />
          <LabelInput label={'프로필'} name='image' type="file" />
        </div>
      </form>
=======
            src={user?.image ?? 'path/to/default/image'}
            alt={`${user?.name} profile image`}
          />
          <LabelInput label={'프로필'} type="file" />
        </div>
      </div>
>>>>>>> d0a8150b75c45a1ea5269c7f28c757e076420b99
    </>
  )
}