"use client";

import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useState } from "react";
import z from "zod";

type Props = {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  schema: z.ZodType;
}

export default function FormInput({ name, type, label, placeholder, schema }: Props){
  const [validated, setValidated] = useState<boolean>(false); 
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputStr = evt.target.value;

    const { success, error } = schema.safeParse(inputStr);
    
    if( error ){
      const msg = z.treeifyError(error);
      setErrors(msg.errors);
    }
  
    setValidated(success);  
  }

  return (
    <>
      <div className="">
        <Label className="my-2.5" htmlFor={`input-${name}`}>{label}</Label>
        <Input 
          className="h-12 px-5 border-l-0 border-r-0 border-t-0 border-b-3 rounded-none"
          name={name} 
          placeholder={placeholder} 
          type={type} 
          id={`input-${name}`} 
          onChange={handleChange} 
        />
        { !validated && errors.map( (err, idx) => <Label className="text-red-400 m-1.5" key={idx}>{err}</Label> ) }
      </div>
    </>
  ) 
}