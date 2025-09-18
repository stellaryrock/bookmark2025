'use server';

import z from 'zod';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import { validate, ValidError } from '@/lib/validator';

export const updateProfile = async (
  _: ValidError | undefined,
  formData: FormData
) => {
  console.log('>>>>>>>>>>>>updateProfile');
  const ent = Object.fromEntries(formData.entries());
  console.log('🚀 ~ updateProfile ~ ent:', ent);
  const zobj = z.object({
    nickname: z.string(),
    email: z.email(),
    image: z.string(),
    // image: z
    //   .file()
    //   .max(10_000_000, {
    //     error: '10MB 보다 작은 파일만 업로드 할 수 있습니다.',
    //   })
    //   .mime([
    //     'image/gif',
    //     'image/jpeg',
    //     'image/png',
    //     'image/svg+xml',
    //     'image/webp',
    //   ]),
  });
  const validator = validate(zobj, formData);
  console.log('🚀 ~ updateProfile ~ validator:', validator);

  if (!validator.success) {
    return validator;
  }

  const { email, nickname, image } = validator.data;

  const updatedMbr = await prisma.member.update({
    where: { email },
    data: {
      nickname,
      image,
    },
  });

  console.log('🚀 ~ updateProfile ~ updatedMbr:', updatedMbr);

  redirect('/my');
};
