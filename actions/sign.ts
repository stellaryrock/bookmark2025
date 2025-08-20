'use server';

import { AuthError } from 'next-auth';
import { v4 as uuidv4 } from 'uuid';
import z from 'zod';
import { signIn, signOut } from '@/lib/auth';
import { registValidator } from '@/lib/validator/sign';
import { sendRegistCheck } from './mailer';

export type Provider = 'google' | 'github' | 'naver' | 'kakao';

export const login = async (provider: Provider, callback?: string) => {
  await signIn(provider, { redirectTo: callback || '/' });
};

export const loginKakao = async () => {login('kakao')}
export const loginGoogle = async () => {login('google')}
export const loginGithub = async () => {login('github')}
export const loginNaver = async () => {login('naver')}

export const regist = async (formData: FormData) => {
  const entries = Object.fromEntries(formData.entries());

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
  await signOut();
};
