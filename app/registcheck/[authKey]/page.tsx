import { redirect } from 'next/navigation';
import { use } from 'react';

type Props = {
  params: Promise<{ authKey: string }>;
};
export default function RegistCheck({ params }: Props) {
  const authKey = use(params);

  // Todo: check the emailchek from db
  if (authKey) {
    redirect('/login');
  }

  return (
    <>
      <h1 className='text-2xl'>인증 키가 올바르지 않습니다!</h1>
    </>
  );
}
