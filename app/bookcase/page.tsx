import { redirect } from 'next/navigation';
import { use } from 'react';
import { auth } from '@/lib/auth';

export default function BookCaseIndex() {
  const session = use(auth());
  if (!session?.user) redirect('/login');

  redirect(`/bookcase/${encodeURI(session.user.name!)}`);
}
