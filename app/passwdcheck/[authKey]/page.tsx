import { findMemberByEmailcheck } from '@/actions/sign';
import Link from 'next/link';
import ChangePassword from './change-pasword';

type Props = {
  params: Promise<{ authKey: string }>;
};

export default async function PasswdCheck({ params }: Props) {
  const { authKey } = await params;

  // Todo: member.emailcheck와 authKey비교
  // 일치하지 않으면 메시지 보이기
  // const mbr = await findMemberByEmailcheck(authKey);
  const mbr = await findMemberByEmailcheck(authKey);
  if (!mbr) {
    return (
      <>
        <div className='grid place-items-center h-full'>
          <div className='border p-5 rounded-md space-y-3 text-center'>
            <h1 className='text-3xl text-red-500'>Not Valid Token</h1>
            <h3 className='text-xl text-red-500'>Check your email again!</h3>
            Goto <Link href='/login'>Login</Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className='grid place-items-center h-full'>
      <div className='w-96'>
        <h1 className='text-2xl mb-5 font-semibold'>Change Password</h1>
        <h3 className='text-3xl'>{mbr?.nickname}</h3>
      </div>
      <ChangePassword email={mbr?.email} />
    </div>
  );
}
