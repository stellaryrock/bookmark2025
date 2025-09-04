import { findMemberByEmail, logout } from '@/actions/sign';
import { Button } from '@/components/ui/button';
import LabelInput from '@/components/ui/label-input';
import { hash } from 'bcryptjs';
import z from 'zod';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import { validate } from '@/lib/validator';

type Props = {
  params: Promise<{ authKey: string }>;
  searchParams: Promise<{ email: string }>;
};

export default async function PasswdCheck({ params, searchParams }: Props) {
  const { authKey } = await params;
  const { email } = await searchParams;

  const mbr = await findMemberByEmail(email);
  if (authKey !== mbr?.emailcheck) {
    redirect('/login/error?error=InvalidToken');
  }

  const changePasswd = async (formData: FormData) => {
    'use server';
    const zobj = z.object({
      passwd: z.string().min(6, '6자 이상 입력해주세요.'),
      passwd2: z.string().min(6, '6자 이상 입력해주세요.'),
    });

    const validator = validate(zobj, formData);
    if (!validator.success) {
      return;
    }

    const encPassword = await hash(validator.data.passwd, 10);
    await prisma.member.update({
      data: { emailcheck: null, passwd: encPassword },
      where: { email },
    });

    await logout();
  };

  return (
    <div className='grid place-items-center h-full'>
      <div className='w-96'>
        <h1 className='text-2xl mb-5 font-semibold'>Change Password</h1>
        <form action={changePasswd} className='flex flex-col gap-5'>
          <LabelInput
            label='New Password'
            name='passwd'
            type='password'
            placeholder='new password...'
          />
          <LabelInput
            label='Confirm Password'
            name='passwd2'
            type='password'
            placeholder='confirm password...'
          />

          <Button type='submit' variant={'destructive'} className='w-full'>
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
}
