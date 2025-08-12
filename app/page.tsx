import { use } from 'react';
import { PlusIcon, FolderCogIcon, LayoutGridIcon } from 'lucide-react';
import { auth } from '@/lib/auth';

export default function Home() {
  const session = use(auth());

  return (
    <div className='flex flex-col h-full border-2 border-red-400 px-2'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>
          {session?.user?.name}&apos;s BookCase
        </h1>
        <div>
          <button className='inline-flex items-center font-medium text-sm rounded-md py-2 px-3'>
            <FolderCogIcon />
            <LayoutGridIcon />
          </button>
        </div>
      </div>

      <div className='flex-1 overflow-x-auto'>
        {/* <div className='inline-flex h-full flex-nowrap gap-3'> */}
        <div className='flex flex-wrap justify-center h-fullx flex-inlinex flex-nowrapx gap-3'>
          <div className='h-full border w-36'>Book1</div>
          <div className='h-full border w-36'>Book2</div>
          <div className='h-full border w-36'>Book3</div>
          <div className='h-full border w-36'>Book4</div>
          <div className='h-full border w-36'>Book4</div>
          <div className='h-full border w-36'>Book4</div>
          <div className='h-full border w-36'>Book4</div>
          <div className='h-full border w-36'>Book4</div>
          <div className='h-full border w-36'>Book4</div>
          <div className='justify-end w-36 mb-1 basis-auto'>
            <button className='flex items-center justify-center bg-black/10 hover:bg-black/20 p-2 text-sm font-medium rounded-md w-full'>
              <PlusIcon className='h-5 w-5' /> Add Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
