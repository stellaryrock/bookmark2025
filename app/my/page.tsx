'use client';

import { logout } from '@/actions/sign';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function My() {
  const signOut = async () => {
    await logout();
  };

  return (
    <div className='flex items-center gap-5'>
      <Button onClick={signOut} variant={'destructive'}>
        Sign Out
      </Button>
      <Link href='/api/auth/signout'>Go LogOut</Link>
    </div>
  );
}
