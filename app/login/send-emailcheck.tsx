import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

type Props = {
  email: string;
  emailcheck: string;
};

export default function SendEmailCheck({ email, emailcheck }: Props) {
  const sendMail = async () => {
    'use server';
    const rs = await fetch('http://localhost:3000/api/sendmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        oldEmailcheck: emailcheck,
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
