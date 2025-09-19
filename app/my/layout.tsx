import Link from 'next/link';
import MyNav from './my-nav';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='grid place-items-center h-full'>
      <div className='border rounded-md shadow-md p-10'>
        <h1 className='text-3xl font-semibold mb-4'>
          <Link href='/my'>My Page</Link>
        </h1>
        <MyNav />
        <div className='min-w-96 w-full'>{children}</div>
      </div>
    </div>
  );
}
