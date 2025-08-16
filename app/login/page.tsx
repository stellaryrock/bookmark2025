import { GithubLoginButton } from '@/components/sign/github-login-button';
import { GoogleLoginButton } from '@/components/sign/google-login-button';
import { KakaoLoginButton } from '@/components/sign/kakao-login-button';
import { NaverLoginButton } from '@/components/sign/naver-login-button';
import { BookImages, MarkImages, PeopleImages } from './images';
import SignForm from './sign-form';
import SoMany from './so-many';

export default function Login() {
  return (
    <div className='grid place-items-center h-full'>
      <div className='flex [&>div]:p-4 rounded-lg shadow-md border overflow-hidden'>
        <div className='flex-1'>
          <div className='flex items-center'>
            <h1 className='text-2xl font-semibold'>Book & Mark</h1>
            <span className='ml-3 text-gray-500'>Sign with</span>
          </div>
          <div className='grid grid-cols-2 gap-2 my-2'>
            <GoogleLoginButton />
            <GithubLoginButton />
            <NaverLoginButton />
            <KakaoLoginButton />
          </div>
          <div className='text-center relative text-gray-600 before:content-[""] before:absolute before:left-0 before:top-[50%] before:bg-gray-200 before:h-[1px] before:w-[45%] after:content-[""] after:absolute after:right-0 after:top-[50%] after:bg-gray-200 after:h-[1px] after:w-[45%]'>
            or
          </div>
          <div>
            <SignForm />
          </div>
        </div>

        <div className='flex-1 bg-green-500 text-white flex items-center'>
          <div>
            <h1 className='text-3xl font-semibold'>
              Social BookMark, <br />
              Record than Remember!
            </h1>
            <div className='my-3'>
              Your go-to hub for sharing and discovering great and useful
              websites. Connect with others, swap your favorite links, and
              explore a world of useful resources — all powered by this
              community
            </div>

            <div className='space-y-3'>
              <SoMany images={BookImages} howMany='50K+' remark='Books' />
              <SoMany images={MarkImages} howMany='500K+' remark='Marks' />
              <SoMany images={PeopleImages} howMany='100K+' remark='Users' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
