'use client';

import { emailSchema, passwordSchema, usernameSchema } from "@/lib/schema/register";
import FormInput from "./FormInput";
import { Button } from "@/components/ui/button";

export default function Register()
{
  return (
    <>
      <div className="max-w-md mx-auto">
        <form action="">
          <div className="flex flex-col gap-3">
            <FormInput 
              name={"id"} 
              type={"email"} 
              label={"아이디"} 
              schema={emailSchema} 
            />
            <FormInput 
              name={"password"} 
              type={"password"} 
              label={"비밀번호"} 
              schema={passwordSchema} 
            />
            <FormInput 
              name={"username"}
              type={"text"}
              label={"이름"}
              schema={usernameSchema}
            />
            <Button className="my-5" type='submit'>등록하기</Button>
          </div>
        </form>
      </div>
    </>
  )
}