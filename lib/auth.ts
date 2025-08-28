import { findMemberByEmail } from '@/actions/sign';
import { compare } from 'bcryptjs';
import NextAuth, { AuthError } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';
import z from 'zod';
import prisma from './db';
import { validateObject } from './validator';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google,
    GitHub,
    Kakao,
    Naver,
    Credentials({
      name: 'Email',
      credentials: {
        email: {},
        passwd: {},
      },
      async authorize(credentials) {
        console.log('🚀 auth.ts - credentials:', credentials);
        if (!credentials || !credentials.email || !credentials.passwd)
          return null;

        const zobj = z.object({
          email: z.email(),
          passwd: z.string().min(6),
        });
        const validator = validateObject(
          zobj,
          credentials as Record<string, string>
        );

        if (!validator.success) {
          console.log(
            '🚀 auth.ts - credential - validator.error:',
            validator.error
          );
          return null;
        }

        return validator.data;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/login/error',
  },
  trustHost: true,
  jwt: { maxAge: 30 * 60 },
  callbacks: {
    // SNS(login/regist), credential(login) ==> DB 읽어서 존재하면 로그인
    // 존재하지 않으면 가입(with authKey) => send email
    async signIn({ user, account }) {
      console.log('🚀 auth.ts > signIn - user:', user);
      const { name, email, image, passwd } = user;
      if (!email) return false;

      const isCredential = account?.provider === 'credentials';
      const mbr = await findMemberByEmail(email);

      if (mbr) {
        if (mbr.emailcheck)
          return `/login/error?error=CheckEmail&email=${email}&emailcheck=${mbr.emailcheck}`;
        if (mbr.outdt) return '/login/error?error=WithdrawMember';

        // password check
        if (isCredential) {
          if (!mbr.passwd) {
            const err = new AuthError(`You registed SNS Account(${email})`);
            err.type = 'OAuthAccountNotLinked';
            throw err;
          }
          // return '/login/error?error=NeedToSnsLogin&email=' + email;

          const pwMatched = await compare(passwd || '', mbr.passwd);
          if (!pwMatched) {
            return false;
          }
        }

        user.id = String(mbr.id);
        user.name = mbr.nickname;
        user.isadmin = mbr.isadmin;
        user.image = mbr.image;
        return true;
      }

      // if not exists ==> regist by SNS
      const newMbr = await prisma.member.create({
        select: { id: true, nickname: true },
        data: {
          nickname: name || 'guest',
          email,
          image,
        },
      });
      console.log('🚀 ~ newMbr:', newMbr);

      return true;
    },

    async jwt({ token, user }) {
      // console.log('🚀 auth.ts > jwt:', token, user, account);
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.isadmin = user.isadmin;
      }
      return token;
    },

    async session({ session, token }) {
      // console.log('🚀 auth.ts > session:', session, token);
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email!;
        session.user.name = token.name;
        session.user.image = token.image?.toString();
        session.user.isadmin = !!token.isadmin;
      }
      return session;
    },
  },
});
