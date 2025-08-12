import { use } from 'react';
import { auth } from '@/lib/auth';

type Props = {
  params: Promise<{ member: string }>;
};
export default function BookCase({ params }: Props) {
  const { member } = use(params);
  const session = use(auth());
  return (
    <div className='flex flex-col h-full border-2 border-red-400 px-2'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>
          @{decodeURI(member)}&apos;s BookCase
        </h1>
      </div>
    </div>
  );
}
