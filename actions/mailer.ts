'use server';

import { createTransport } from 'nodemailer';

type Attachments = {
  filename: string;
  path: string;
}[];

const { google_user: user, google_app_password: pass } = process.env;

const TRANS = createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: { user, pass },
});

const FROM = `"BookMark" <${user}>`;

export const sendRegistCheck = async (to: string, authKey: string) => {
  const subject = '[북마크] 가입 인증 메일';
  const html = `
    <div style="display: grid; place-items: center; height: 200px;">
      <h1>북마크 가입을 환영합니다</h1>
      <h3 style="margin: 10px 0;">가입을 완료하시려면 아래 링크를 클릭해 주세요</h3>
      <a href="${process.env.NEXT_PUBLIC_URL}/registcheck/${authKey}?email=${to}">가입 인증</a>
    </div>
  `;

  sendMail(to, subject, html);
};

export const sendPasswordReset = async (
  to: string,
  authKey: string,
  nickname?: string
) => {
<<<<<<< HEAD
  const subject = '[Bookmark] Reset Password';
  const html = `
    <div style="display: grid; place-items: center; height: 200px;">
      <h1>Reset Password</h1>
      <h2>Hello, ${nickname}</h2>
      <h3 style="margin: 10px 0;">Click the link below to reset your password.</h3>
      <a href="${process.env.NEXT_PUBLIC_URL}/passwdcheck/${authKey}">Reset Password</a>
=======
  const subject = '[북마크] 패스워드 찾기';
  const html = `
    <div style="display: grid; place-items: center; height: 200px;">
      <h1>패스워드 찾기</h1>
      <h2>Hello, ${nickname}</h2>
      <h3 style="margin: 10px 0;">아래 링크를 클릭하면 암호를 설정할 수 있습니다.</h3>
      <a href="${process.env.NEXT_PUBLIC_URL}/passwdcheck/${authKey}">암호 변경</a>
>>>>>>> e324e1e (passwdcheck)
    </div>
  `;

  sendMail(to, subject, html);
};

const sendMail = async (
  to: string,
  subject: string,
  html: string,
  attachments?: Attachments
) => {
  TRANS.sendMail({
    from: FROM,
    to,
    bcc: user,
    subject,
    html,
    attachments,
  });
};
