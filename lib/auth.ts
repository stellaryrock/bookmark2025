import { findMemberByEmail } from '@/actions/sign';
import { compare } from 'bcryptjs';
import NextAuth, { AuthError } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';
<<<<<<< HEAD
import prisma from './db';
import z from 'zod';
=======
<<<<<<< HEAD
import { v4 as uuidv4 } from 'uuid';
import prisma from './db';
=======
import prisma from './db';
import {v4 as uuidv4 } from 'uuid';

>>>>>>> bd3514f (login-button)
>>>>>>> 1de2e63 (login-button)

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
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        passwd: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('🚀 auth.ts - credentials:', credentials);
        if (!credentials || !credentials.email || !credentials.passwd)
          return null;

        const user = {
          email: credentials.email as string,
          password: credentials.passwd as string,
        };

        const validator = z
          .object({
            email: z.email(),
            password: z.string().min(6),
          })
          .safeParse(user);
        if (!validator.success) return null;

        return user;
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
<<<<<<< HEAD
    // SNS(login/regist), credential(login) ==> DB 읽어서 존재하면 로그인
    // 존재하지 않으면 가입(with authKey) => send email
    async signIn({ user, account }) {
      const { name, email, image, password } = user;
      if (!email) return false;

      const isCredential = account?.provider === 'credentials';
      const mbr = await findMemberByEmail(email);

      if (mbr) {
        if (mbr.emailcheck)
          return `/login/error?error=CheckEmail&email=${email}&emailcheck=${mbr.emailcheck}`;
        if (mbr.outdt) return '/login/error?error=WithdrawMember';

        // password check
        if (isCredential) {
          console.log('🚀 ~ mbr.passwd:', mbr.passwd, password, !mbr.passwd);
          if (!mbr.passwd) {
            const err = new AuthError(`You registed SNS Account(${email})`);
            err.type = 'OAuthAccountNotLinked';
            throw err;
          }
          // return '/login/error?error=NeedToSnsLogin&email=' + email;
          return compare(password || '', mbr.passwd);
        }

        return true;
      }

      // password check
      if (isCredential) {
        return '/login/error?error=NotFound';
      }

      // regist by SNS
      const newMbr = await prisma.member.create({
        select: { id: true, nickname: true },
        data: {
          nickname: name || 'guest',
          email,
          image,
        },
      });
      console.log('🚀 ~ newMbr:', newMbr);

      // sendRegistMail

      return false;
=======
    // DB 읽어서 존재하면 로그인
    // 존재하지 않으면 가입(with authKey)
    async signIn({user, account, profile}) {
      const { name, email, image } = user;

      if(!email) return false;
      const mbr = 
      await prisma.member.findUnique({
        select: { id: true, nickname: true },
        where: { email }
      });

      if(!mbr){
        prisma.member.create({
          select: { id: true, },
          data: {
            email,
            image,
            nickname: name || 'guest',  
          }
        });
      }

      const emailcheck = uuidv4();

      const newMbr = prisma.member.create({
        select: { id : true, nickname: true },
        data :{
          nickname: name || 'guest',
          email,
          image,
        }
      });
      
      return true;
>>>>>>> bd3514f (login-button)
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email!;
        session.user.name = token.name;
        session.user.isadmin = !!token.isadmin;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("redirect:", baseUrl, url);
      return baseUrl;
    },
  },
});