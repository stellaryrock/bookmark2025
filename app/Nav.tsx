import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/lib/auth';

export default async function Nav() {
  const session = await auth();
  const didLogin = !!session?.user;

  return (
    <div className='flex items-center gap-5'>
      <Link href='/'>Home</Link>

      {didLogin ? (
        <Link href='/my'>
          <Image
            src={session.user?.image || ''}
            alt={session.user?.name || ''}
            width={40}
            height={40}
            className='rounded-full'
          />
        </Link>
      ) : (
        <Link href='/api/auth/signin'>Login</Link>
      )}
    </div>
  );
}
