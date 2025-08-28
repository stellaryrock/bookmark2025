import { sendPasswordReset } from "@/actions/mailer";
//import { findMemberByEmail } from "@/actions/sign";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
  const { email, passwdcheck } = await req.json();
  
  // const mbr = await findMemberByEmail(email);
  
  const authorization = req.headers.get('authorization');
  if( authorization !== `Bearer ${process.env.INTERNAL_SECRET}` ){
    throw new Error('InvalidToken');
  }

  await sendPasswordReset(email, passwdcheck);

  return NextResponse.json({
    email,
    message: 'Email Sent'
  });
}