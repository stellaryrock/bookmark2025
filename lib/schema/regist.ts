import z from 'zod';

const regex = /[~!@#$%^&*()_+_.,]/;

export const passwordSchema = z
  .string()
  .min(6, { error: '6자 이상 입력해주세요.' })
  .refine((val) => regex.test(val), {
    error: '특수문자를 하나 이상 포함해주세요.',
  });

export const emailSchema = z.email({ error: '잘못된 이메일 형식입니다.' });

export const nicknameSchema = z
  .string()
  .min(4, { error: '4자 이상 입력해주세요.' });

export const fileSchema = z
  .custom<File>((val) => val instanceof File, {
    message: '파일 형식을 확인해주세요.',
  })
  .refine(
    (file) => file.name.endsWith('.png'),
    'PNG 이미지 파일을 등록해주세요.'
  );

export const authKey = z.number();

export const registSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: passwordSchema,
    nickname: nicknameSchema,
  })
  .refine(
    ({ password, passwordConfirm }) => password === passwordConfirm,
    '비밀번호가 일치하지 않습니다.'
  );
