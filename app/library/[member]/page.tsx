import { use } from 'react';

type Props = {
  params: Promise<{ member: string }>;
};
export default function Library({ params }: Props) {
  const { member } = use(params);
  return (
    <>
      <h1 className='text-2xl'>@{member}&apos;s BookMark</h1>
    </>
  );
}
