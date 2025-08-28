'use client';

import LabelInput from '@/components/ui/label-input';
import defaultProfile from '@/public/default-profile.jpg';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function Edit(){
  const session = useSession();
  const user = session.data?.user;

    const confirmPasswdCheck = () => {
    const chk = confirm('비밀번호를 변경하시겠습니까?');
    if(chk){
      redirect('/my/passwdcheck');
    }
  }
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
      <div className='flex my-4 justify-end'>
        <button onClick={confirmPasswdCheck} className='text-red-500'>비밀번호 변경</button>
      </div>
    </>
  )
}