import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';
import prisma from './db';
import {v4 as uuidv4 } from 'uuid';


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
        if (!credentials || !credentials.email || !credentials.passwd)
          return null;

        const user = { id: '1', email: 'aa@gmail.com', name: 'Hong' };
        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  trustHost: true,
  jwt: { maxAge: 30 * 60 },
  callbacks: {
    // DB 읽어서 존재하면 로그인
    // 존재하지 않으면 가입(with authKey)
    async signIn({user, account, profile}) {
      const { name, email, image } = user;

      if(!email) return false;

      const mbr = await prisma.member.findUnique({
        select: { id: true, nickname: true },
        where: { email }
      });

      if(!mbr){
        const newMbr = await prisma.member.create({
          select: { id : true, nickname: true },
          data :{
            nickname: name || 'guest',
            email,
            image,
          }
        });  
        
        console.log('newMbr:', newMbr);
      }

      const emailcheck = uuidv4();

      return true;
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
  },
});
