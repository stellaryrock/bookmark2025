import { SessionProvider } from 'next-auth/react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { use } from 'react';
import { BookMarkedIcon } from 'lucide-react';
import { auth } from '@/lib/auth';
import Nav from './Nav';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Book & Mark',
  description: 'Social BookMark Service',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = use(auth());

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-2`}
      >
        <SessionProvider session={session}>
          <div className='flex flex-col containerx justify-between mx-auto h-screen'>
            <header className='flex justify-between'>
              <h1 className='text-3xl flex items-center tracking-tight font-bold text-green-500'>
                <BookMarkedIcon /> Book & Mark
              </h1>
              <Nav />
            </header>
            <main className='border flex-1'>{children}</main>
            <footer className='text-center text-green-500'>
              &#169; Indiflex SeniorCoding 2025
            </footer>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
