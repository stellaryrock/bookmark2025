'use server';

import { AuthError } from 'next-auth';
import { v4 as uuidv4 } from 'uuid';
import { signIn, signOut } from '@/lib/auth';
import prisma from '@/lib/db';

// export const runtime = 'nodejs';

type Provider = 'google' | 'github' | 'naver' | 'kakao';

export const login = async (provider: Provider, callback?: string) => {
  await signIn(provider, { redirectTo: callback || '/' });
};

export const loginNaver = async () => login('naver');

export const regist = async (formData: FormData) => {
  const entries = Object.entries(formData);
  console.log('🚀 ~ entries:', entries);
  const email = formData.get('email');

  // Todo: zod validation checking!

  const emailcheck = uuidv4();
  // await sendRegistCheck('indiflex.corp@gmail.com', authKey); // stream error
  const { NEXT_PUBLIC_URL, INTERNAL_SECRET } = process.env;
  await fetch(`${NEXT_PUBLIC_URL}/api/sendmail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${INTERNAL_SECRET}`,
    },
    body: JSON.stringify({
      email,
      emailcheck,
    }),
  });
  console.log('Mail has sent.');
};

// Credential: from login page
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  const email = formData.get('email');
  const passwd = formData.get('passwd');
  if (!email || !passwd) return 'Input the email & passwd, plz';

  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'EmailSignInError':
          return error.message;
        case 'CredentialsSignin':
          return 'Invalid Credentials!';
        default:
          return 'Something went wrong!';
      }
    }
    throw error;
  }
}

export const logout = async () => {
  await signOut({ redirectTo: '/login' }); // QQQ ('/')
};

export const findMemberByEmail = async (email: string) =>
  prisma.member.findUnique({ where: { email } });
