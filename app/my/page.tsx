'use client';

import Link from 'next/link';

export default function My() {
  return (
    <>
      <Link href='/api/auth/signout'>LogOut</Link>
    </>
  );
}
