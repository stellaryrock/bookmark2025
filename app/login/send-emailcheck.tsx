import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { SendEmailReqBody } from '../api/sendmail/route';

type Props = SendEmailReqBody;

export default function SendEmailCheck({
  email,
  emailcheck,
  emailType = 'Regist',
}: Props) {
  const sendMail = async () => {
    'use server';
    const rs = await fetch('http://localhost:3000/api/sendmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        oldEmailcheck: emailcheck,
        emailType,
      }),
    });
    if (rs.ok)
      redirect(`/login/error?error=${encodeURI('메일이 발송되었습니다')}`);
  };

  return (
    <>
      <form action={sendMail}>
        <Button type='submit' variant={'outline'}>
          Resend email to {email}
        </Button>
      </form>
    </>
  );
}
