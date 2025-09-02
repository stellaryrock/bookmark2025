'use server';

import { SendEmailReqBody } from '@/app/api/sendmail/route';
import { compare, hash } from 'bcryptjs';
import { AuthError } from 'next-auth';
import z from 'zod';
import { signIn, signOut } from '@/lib/auth';
import prisma from '@/lib/db';
import { newToken } from '@/lib/utils';
import { validate, ValidError, ValidSuccess } from '@/lib/validator';

// export const runtime = 'nodejs';

export type Provider = 'google' | 'github' | 'naver' | 'kakao';

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
  const emailcheck = newToken();
  const { passwd2: _, ...data } = {
    ...validator.data,
    passwd: encPasswd,
    emailcheck,
  }; // as z.infer<typeof zobj>;
  await prisma.member.create({ data });

  // await sendRegistCheck('indiflex.corp@gmail.com', authKey); // stream error
  await sendEmailByFetch({ ...data, emailType: 'Regist' });
  console.log('Mail has sent.');

  return { success: true, data } as ValidSuccess<typeof data>;
  // return validator; // formdata 그대로 반환 용
};

export async function checkPassword(formData: FormData) {
  const zobj = z
    .object({
      email: z.email(),
      nickname: z.string(),
      passwd: z.string().min(6, '6자 이상 입력해주세요.'),
      passwd2: z.string().min(6, '6자 이상 입력해주세요.'),
    })
    .refine(({ passwd, passwd2 }) => passwd === passwd2, {
      path: ['passwd2'],
      error: '비밀번호가 일치하지 않습니다.',
    });

  const validator = validate(zobj, formData);

  if (!validator.success) {
    return validator;
  }

  const emailcheck = newToken();
  const { passwd2: _passwd2, ...data } = {
    ...validator.data,
    emailcheck,
    isValid: false,
  };

  const mbr = await findMemberByEmail(data.email);

  if (mbr && mbr.passwd) {
    const isValid = await compare(data.passwd || '', mbr.passwd);

    if (isValid) {
      data.isValid = isValid;

      await prisma.member.update({
        data: { emailcheck },
        where: { email: validator.data.email },
      });
    }
  }

  sendEmailByFetch({ ...data, emailType: 'ResetPassword' });

  return {
    success: true,
    data,
  } as ValidSuccess<typeof data>;
}

async function sendEmailByFetch({
  email,
  emailcheck,
  nickname,
  emailType,
}: SendEmailReqBody) {
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
      nickname,
      emailType,
    }),
  });
}

// Credential: from login page
export async function authenticate(
  _prevState: ValidError | undefined,
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
          typeErr = error.message;
          break;
        case 'OAuthAccountNotLinked':
          typeErr = `Already registed SNS Account)`;
          break;
        case 'EmailSignInError': // email magic link
          typeErr = error.message;
          break;
        case 'CredentialsSignin':
          typeErr = error.message || 'Not match email or password!';
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

export const withdraw = async (formData: FormData) => {
  const ent = Object.fromEntries(formData.entries());
  console.log('🚀 ~ withdraw ~ ent:', ent);

  // Todo: update db, outdt
  // await prisma.member.update({
  //   where: { email },
  //   data: { outdt: '1' }
  // });
};
