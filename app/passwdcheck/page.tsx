'use client';

import { sendEmailToResetPassword } from '@/actions/sign';
import { Button } from '@/components/ui/button';
import LabelInput from '@/components/ui/label-input';
import Link from 'next/link';
import { useActionState } from 'react';

export default function ForgotPassword() {
  const [validError, sendResetPassword, isPending] = useActionState(
    sendEmailToResetPassword,
    undefined
  );

  return (
    <div className='grid place-items-center h-full'>
      <div className='w-96'>
        <h1 className='text-2xl mb-3 font-semibold'>Forgot Password</h1>
        <div className='text-sm text-gray-500 mb-5'>
          Enter your email address when joined, and send to instructions to
          reset password.
        </div>
        <form action={sendResetPassword} className='flex flex-col gap-5'>
          <LabelInput
            label='Email'
            name='email'
            type='email'
            error={validError}
            placeholder='email@bookmark.com'
          />

          <Button
            type='submit'
            variant={'success'}
            className='w-full'
            disabled={isPending}
          >
            {isPending ? 'Sending...' : 'Send Instructions Email'}
          </Button>
        </form>

        <div className='text-center text-sm mt-6'>
          Back to <Link href='/login'>Login</Link>
        </div>
      </div>
    </div>
  );
}
