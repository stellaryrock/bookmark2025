'use server';

import { compare, hash, hashSync } from 'bcryptjs';
import { AuthError } from 'next-auth';
import { v4 as uuidv4 } from 'uuid';
import z, { success } from 'zod';
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

  const encPasswd = await hash(validator.data.passwd, 10);
  const emailcheck = uuidv4();
  const { passwd2: _, ...data } = {
    ...validator.data,
    passwd: encPasswd,
    emailcheck,
  }; // as z.infer<typeof zobj>;
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
  prevState: ValidError | undefined,
  formData: FormData
) {
  console.log('*****>>', formData.get('email'));
  const zobj = z.object({
    email: z.email(),
    passwd: z.string().min(6),
  });
  const validator = validate(zobj, formData);
  if (!validator.success) return validator;

  try {
    await signIn('credentials', formData);
    // return validator;
  } catch (error) {
    console.log('🚀 sign.ts - authenticate - error:', error);
    if (error instanceof AuthError) {
      let typeErr;
      switch (error.type) {
        case 'AccessDenied':
          typeErr = 'Invalid Password!';
          break;
        case 'OAuthAccountNotLinked':
          typeErr = `You registed SNS Account(${formData.get('email')})`;
          break;
        case 'EmailSignInError': // email magic link
          typeErr = error.message;
          break;
        case 'CredentialsSignin':
          typeErr = 'Invalid Credentials!';
          break;
        default:
          typeErr = error.message || 'Something went wrong!';
      }
      return {
        success: false,
        error: { email: { errors: [typeErr] } },
      } as ValidError;
    }
    // throw error;
  }
}

export const logout = async () => {
  await signOut({ redirectTo: '/login' }); // QQQ ('/')
};

export const findMemberByEmail = async (email: string) =>
  prisma.member.findUnique({ where: { email } });
