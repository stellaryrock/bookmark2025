import { sendPasswordReset, sendRegistCheck } from '@/actions/mailer';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { newToken } from '@/lib/utils';

export type SendEmailReqBody = {
  email: string;
  emailcheck: string;
  oldEmailcheck?: string;
  nickname?: string;
  emailType: 'Regist' | 'ResetPassword';
};

export async function POST(req: Request) {
  const {
    email,
    emailcheck,
    oldEmailcheck,
    nickname,
    emailType = 'Regist',
  }: SendEmailReqBody = await req.json();

  // resend...
  if (oldEmailcheck) {
    const mbr = await prisma.member.findUnique({ where: { email } });
    if (mbr?.emailcheck !== oldEmailcheck) {
      redirect('/login/error?error=InvalidToken'); // abusing
    }
    const newEmailcheck = newToken();
    await prisma.member.update({
      data: { emailcheck: newEmailcheck },
      where: { email },
    });
    await sendRegistCheck(email, newEmailcheck);
  } else {
    const authorization = req.headers.get('authorization');
    if (authorization !== `Bearer ${process.env.INTERNAL_SECRET}`)
      throw new Error('InvalidToken');
    if (emailType === 'ResetPassword') {
      await sendPasswordReset(email, emailcheck, nickname);
    } else {
      await sendRegistCheck(email, emailcheck);
    }
  }

  return NextResponse.json({ email, message: 'Email Resent.' });
}
