import z from 'zod';

const regex = /[~!@#$%^&*()_+_.,]/;

export const passwordSchema = z
  .string()
  .min(8, { error: '8자 이상 입력해주세요.' })
  .refine((val) => regex.test(val), {
    error: '특수문자를 하나 이상 포함해주세요.',
  });

export const emailSchema = z.email({ error: '잘못된 이메일 형식입니다.' });

export const usernameSchema = z.string().min(4, { error: '4자 이상 입력해주세요.' });

export const fileSchema = z.custom<File>((val) => val instanceof File, {
        message: "파일 형식을 확인해주세요.",
    }).refine((file) => file.name.endsWith(".png"), "이미지 파일을 등록해주세요.");

export const regist = z.object({
  email: emailSchema,
  password: passwordSchema,
  password2: passwordSchema,
  uname: usernameSchema,
});
