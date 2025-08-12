"use client";

import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

type Props = {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
}

export default function LoginInput({ name, type, label, placeholder }: Props){

  return (
    <>
      <div className="">
        <Label className="my-2 font-bold" htmlFor={`input-${name}`}>{label}</Label>
        <Input 
          className="h-10 px-3 border-t-0 border-r-0 border-l-0 border-b-3 rounded-none focus-visible:ring-0"
          name={name} 
          placeholder={placeholder} 
          type={type} 
          id={`input-${name}`}  
        />
      </div>
    </>
  ) 
}