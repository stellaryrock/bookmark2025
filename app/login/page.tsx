import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LabelInput from '@/components/ui/label-input';

export default function Login() {
  return (
    <div className='grid place-items-center h-full'>
      <div className='flex [&>div]:p-4 rounded-lg shadow-md border'>
        <div className='flex-1'>
          <div className='flex'>
            <h1 className='text-xl'>Book & Mark</h1> Login
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Button>Google</Button>
            <Button>Github</Button>
            <Button>Kakao</Button>
            <Button>Naver</Button>
          </div>
          <div>- or - </div>
          <div>
            <form className=''>
              <LabelInput
                label='email'
                type='email'
                placeholder='example@gmail.com'
              />
              <LabelInput
                label='password'
                type='password'
                placeholder='Your password...'
              />
              <div className='flex justify-between my-2'>
                <label className='cursor-pointer hover:text-blue-600'>
                  <input type='checkbox' className='mr-1 translate-y-[1px]' />
                  Remember me
                </label>
                <a href='#'>Forgot password?</a>
              </div>
              <Button variant={'primary'} className='w-full'>
                Login with your account
              </Button>
            </form>
          </div>
        </div>

        <div className='flex-1 bg-green-500 text-white'>
          <h1 className='text-3xl'>Book & Mark</h1>
          <div className='x'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti
            ullam in repudiandae ipsa natus, debitis, laboriosam exercitationem
            incidunt inventore voluptate velit! Libero dolores corrupti minus
            reprehenderit blanditiis suscipit, soluta iusto?
          </div>
        </div>
      </div>
    </div>
  );
}
