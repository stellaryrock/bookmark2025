import DummyProfile from '@/public/default-profile.jpg';
import Image from 'next/image';
import { use } from 'react';
import { auth } from '@/lib/auth';

export default function My() {
  const session = use(auth());

  return (
    <div className='grid grid-cols-3 gap-3'>
      <div>
        <Image
          width={120}
          height={120}
          src={DummyProfile}
          alt={session?.user?.nickname ?? 'guest'}
        />
        <p className='text-center'>{session?.user.nickname}</p>
      </div>
      <div>Followers</div>
      <div>Books</div>
    </div>
  );
}
