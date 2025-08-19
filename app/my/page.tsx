'use client';

import { logout } from '@/actions/sign';
import { Button } from '@/components/ui/button';
<<<<<<< HEAD
=======
import LabelInput from '@/components/ui/label-input';
import { useSession } from 'next-auth/react';
>>>>>>> a994fc9 (login-button)

export default function My() {
  const session = useSession();
  const { name, email, image, isadmin } = session.data.user;
  console.log(session);

  const signOut = async () => {
    await logout();
  };

  return (
    <div className='flex items-center gap-5'>
      <Button onClick={signOut} variant={'destructive'}>
        Sign Out
      </Button>
    </div>
    
  );
}
