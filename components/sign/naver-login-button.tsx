import { Button } from '@/components/ui/button';

export function NaverLoginButton() {
  return (
    <Button
      variant='outline'
      className='w-full gap-2 bg-[#03C75A] hover:bg-[#02b155] text-white h-12'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='w-6 h-6'
        viewBox='0 0 24 24'
        fill='white'
      >
        <path d='M4 4h5.37l5.26 8.28V4H20v16h-5.37l-5.26-8.28V20H4z' />
      </svg>
      <span className='text-sm font-medium'>Naver</span>
    </Button>
  );
}
