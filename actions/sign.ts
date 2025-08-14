'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/lib/auth';

type Provider = 'google' | 'github' | 'naver' | 'kakao';

export const login = async (provider: Provider, callback?: string) => {
  signIn(provider, { redirectTo: callback || '/' });
};

// from login page
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
