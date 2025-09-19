import Link from 'next/link';

export default function MyNav() {
  return (
    <div className='flex gap-3'>
      <Link href='/my/edit'>Edit</Link>
      <Link href='/my/withdrawl'>Withdrawl</Link>
    </div>
  );
}
