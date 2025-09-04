'use client';

import { changePasswd } from '@/actions/sign';
import { Button } from '@/components/ui/button';
import LabelInput from '@/components/ui/label-input';
import { useActionState } from 'react';

export default function ChangePassword({ email }: { email: string }) {
  const [validError, changePasswdAction, isPending] = useActionState(
    changePasswd,
    undefined
  );

  const makeChange = (formData: FormData) => {
    formData.set('email', email);
    changePasswdAction(formData);
  };

  return (
    <>
      <form action={makeChange} className='flex flex-col gap-5'>
        <LabelInput
          label='New Password'
          name='passwd'
          type='password'
          error={validError}
          placeholder='new password...'
        />
        <LabelInput
          label='Confirm Password'
          name='passwd2'
          type='password'
          error={validError}
          placeholder='confirm password...'
        />
        <input type='hidden' name='email' value={email} />
        <Button
          type='submit'
          variant={'destructive'}
          disabled={isPending}
          className='w-full'
        >
          {isPending ? 'Changing Password...' : 'Change Password'}
        </Button>
      </form>
    </>
  );
}
