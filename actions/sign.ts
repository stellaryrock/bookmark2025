'use server';

import { AuthError } from 'next-auth';
import { v4 as uuidv4 } from 'uuid';
import z from 'zod';
import { signIn, signOut } from '@/lib/auth';
import prisma from '@/lib/db';
import { validate, ValidError, ValidSuccess } from '@/lib/validator';

// export const runtime = 'nodejs';

type Provider = 'google' | 'github' | 'naver' | 'kakao';

export const login = async (provider: Provider, callback?: string) => {
  await signIn(provider, { redirectTo: callback || '/bookcase' });
};

export const loginNaver = async () => login('naver');

export const regist = async (formData: FormData) => {
  const zobj = z
    .object({
      email: z.email(),
      passwd: z.string().min(6),
      passwd2: z.string().min(6),
      nickname: z.string().min(3),
    })
    .refine(({ passwd, passwd2 }) => passwd === passwd2, {
      path: ['passwd2'],
      error: 'Password check is not matching!',
    });
  const validator = validate<typeof zobj>(zobj, formData);
  if (!validator.success) {
    return validator;
  }

  const emailcheck = uuidv4();
  const { passwd2: _, ...data } = { ...validator.data, emailcheck }; // as z.infer<typeof zobj>;
  await prisma.member.create({ data });

  // await sendRegistCheck('indiflex.corp@gmail.com', authKey); // stream error
  const { NEXT_PUBLIC_URL, INTERNAL_SECRET } = process.env;
  await fetch(`${NEXT_PUBLIC_URL}/api/sendmail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${INTERNAL_SECRET}`,
    },
    body: JSON.stringify({
      email: data.email,
      emailcheck,
    }),
  });
  console.log('Mail has sent.');

  return { success: true, data } as ValidSuccess<typeof data>;
  // return validator; // formdata 그대로 반환 용
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
