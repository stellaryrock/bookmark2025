'use client';

import google from '@/public/google.jpg';
import github from '@/public/github.png';
import kakao from '@/public/kakao.png';
import naver from '@/public/naver.png';
import Image from "next/image";
import { signIn } from "next-auth/react";
import { RoundButton } from "./RoundButton";
import { Button } from "@/components/ui/button";
import LoginInput from "@/app/login/LoginInput";

export default function Login() {
  
  return (
    <>
      <div className="flex flex-col max-w-sm min-w-sm mx-auto gap-8 shadow-lg p-10 rounded-lg">
        <div className="flex flex-col gap-5">
          <LoginInput 
            name={"email"} 
            type={"email"} 
            label={"이메일"} 
            placeholder="example@example.com"  
          />
          <LoginInput 
            name={"password"} 
            type={"password"} 
            label={"비밀번호"}  
          />
        </div>
        <Button className="w-full" onClick={()=>signIn('credentials')}>
          로그인
        </Button>
        <div className="flex gap-2 justify-center">
          <RoundButton  onClick={()=>signIn('google')}>
            <Image src={google} alt={"Sign in with Google"} />
          </RoundButton>
          <RoundButton  onClick={()=>signIn('github')}>
            <Image src={github} alt={"Sign in with Github"} />
          </RoundButton>
          <RoundButton  onClick={()=>signIn('kakao')}>
            <Image src={kakao} alt={"Sign in with Kakao"} />
          </RoundButton>
          <RoundButton  onClick={()=>signIn('naver')}>
            <Image src={naver} alt={"Sign in with Naver"} />
          </RoundButton>
        </div>
      </div>
    </>
  )
}
