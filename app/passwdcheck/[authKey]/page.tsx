'use client';

import { Button } from '@/components/ui/button';
import LabelInput from '@/components/ui/label-input';
import z from 'zod';
import { use } from 'react';

type Props = {
  params: Promise<{ authKey: string }>;
};

export default function PasswdCheck({ params }: Props) {
  const { authKey } = use(params);

  // Todo: member.emailcheck와 authKey비교
  // 일치하지 않으면 메시지 보이기

  const changePasswd = async (formData: FormData) => {
    const entries = Object.fromEntries(formData.entries());
    const validator = z
      .object({
        passwd: z.string().min(6, '패스워드는 6글자 이상만 가능합니다!'),
        passwd2: z.string().min(6, '패스워드는 6글자 이상만 가능합니다!'),
      })
      .refine(({ passwd, passwd2 }) => passwd === passwd2, '일치하지 않습니다!')
      .safeParse(entries);

    if (!validator.success) {
      //   if (formData.get('passwd') !== formData.get('passwd2')) {
      //     return alert('패스워드가 일치하지 않습니다!');
      //   }
      // } else {
      const msgs = JSON.parse(validator.error.message);
      return alert(msgs[0].message);
    }

    // Todo: update Member set passwd... & goto login
  };

  return (
    <div className='grid place-items-center h-full'>
      <div>
        <h1 className='text-2xl mb-5 text-center font-semibold'>
          Change Password
        </h1>
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
