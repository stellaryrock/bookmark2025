// 'use client';
// import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { use } from 'react';
import SendEmailCheck from '../send-emailcheck';

type Props = {
  searchParams: Promise<{
    error: string;
    email?: string;
    emailcheck?: string;
  }>;
};

const getErrorMessage = (error: string) => {
  if (error === 'CheckEmail') return 'Check your regist email for approve!';
  if (error === 'NotMatchPassword') return 'Your are wrong password!';
  if (error === 'NotFound') return 'Not exists email address!';
  if (error === 'InvalidToken') return 'Invalid aprove token!';
  if (error === 'WithdrawMember') return 'You are already withdraw!';
  return error;
};

export default function LoginError({ searchParams }: Props) {
  // const searchParams = useSearchParams();
  // const error = searchParams.get('error');
  const { error, email, emailcheck } = use(searchParams);
  return (
    <div className='grid place-items-center h-full'>
      <div className='border p-5 text-center rounded-md'>
        <h1 className='text-xl mb-5'>{getErrorMessage(error)}</h1>
        <div className='flex justify-center items-center gap-2'>
          <Button variant={'outline'} asChild={true}>
            {email ? (
              <Link href={`/login?email=${email}`}>Goto Login</Link>
            ) : (
              <Link href='/login'>Goto Login</Link>
            )}
          </Button>
          {email && emailcheck && error === 'CheckEmail' && (
            <SendEmailCheck email={email} emailcheck={emailcheck} />
          )}
        </div>
      </div>
    </div>
  );
}
