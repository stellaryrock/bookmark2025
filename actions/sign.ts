'use server';

import { signIn, signOut } from '@/lib/auth';
import prisma from '@/lib/db';
import { validate, ValidError, ValidSuccess } from '@/lib/validator';
import { hash } from 'bcryptjs';
import { AuthError } from 'next-auth';
import { v4 as uuidv4 } from 'uuid';
import z from 'zod';
<<<<<<< HEAD
=======
import { signIn, signOut } from '@/lib/auth';
<<<<<<< HEAD
import prisma from '@/lib/db';
import { validate, ValidError, ValidSuccess } from '@/lib/validator';
=======
<<<<<<< HEAD
<<<<<<< HEAD
import prisma from '@/lib/db';
=======
import { registSchema } from '@/lib/schema/regist';
=======
import { registValidator } from '@/lib/validator/sign';
>>>>>>> a09034f (regist validation)
import { sendRegistCheck } from './mailer';
>>>>>>> f0f00db (regist form)
>>>>>>> cce9c54 (regist validation)
>>>>>>> 127be09 (regist validation)

// export const runtime = 'nodejs';

type Provider = 'google' | 'github' | 'naver' | 'kakao';

export const login = async (provider: Provider, callback?: string) => {
  await signIn(provider, { redirectTo: callback || '/bookcase' });
};

<<<<<<< HEAD
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
=======
<<<<<<< HEAD
<<<<<<< HEAD
export const loginNaver = async () => login('naver');
=======
=======
>>>>>>> c0867b2 (login)
export const loginKakao = async () => {login('kakao')}
export const loginGoogle = async () => {login('google')}
export const loginGithub = async () => {login('github')}
export const loginNaver = async () => {login('naver')}
>>>>>>> 5754cf0 (login-button)

export const regist = async (formData: FormData) => {
<<<<<<< HEAD
  const entries = Object.entries(formData);
  console.log('🚀 ~ entries:', entries);
  const email = formData.get('email');

<<<<<<< HEAD
  const result = registValidator.safeParse(entries);
>>>>>>> a842f0c (login)

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

<<<<<<< HEAD
<<<<<<< HEAD
  return { success: true, data } as ValidSuccess<typeof data>;
  // return validator; // formdata 그대로 반환 용
=======
=======
=======
>>>>>>> c0867b2 (login)
>>>>>>> a842f0c (login)
  const result = registValidator.safeParse(entries);

  if (result.success) {
    const authKey = uuidv4();
    await sendRegistCheck(process.env.google_user!, authKey);

    console.log('Mail has sent.');
  } else {
    return {
      success: false,
      error: z.treeifyError(result.error),
    };
  }
>>>>>>> f0f00db (regist form)
>>>>>>> cce9c54 (regist validation)
};

// Credential: from login page
export async function authenticate(
  prevState: ValidError | undefined,
  formData: FormData
) {
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
          typeErr = `Already SNS Account(${formData.get('email')})`;
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
        error: {
          email: { errors: [typeErr], value: validator.data.email },
          passwd: { errors: [], value: validator.data.passwd },
        },
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
