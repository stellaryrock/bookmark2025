'use client';

// import { logout } from '@/actions/sign';
import { Button } from '@/components/ui/button';

export default function My() {
  const signOut = async () => {
    // await logout();
  };

  return (
    <div className='flex items-center gap-5'>
      <Button onClick={signOut} variant={'destructive'}>
        Sign Out
      </Button>
    </div>
  );
}
