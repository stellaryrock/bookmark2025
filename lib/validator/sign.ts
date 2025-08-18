import z from 'zod';

const passwordSchema = z
  .string()
  .min(6, { error: '6자 이상 입력해주세요.' })
  .regex(/[^a-zA-Z0-9]/, {
    error: '특수문자를 하나 이상 포함해주세요.',
  });

const emailSchema = z.email({ error: '잘못된 이메일 형식입니다.' });

const nicknameSchema = z.string().min(4, { error: '4자 이상 입력해주세요.' });

// file-schema : zod.dev AI Powered by inkeep 참조
const fileSchema = z
  .file()
  .max(10_000_000, { error: '10MB 보다 작은 파일만 업로드 할 수 있습니다.' })
  .mime([
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/webp',
  ]);

const authKey = z.uuidv4();

export const registValidator = z
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

type ValidationError = { errors: string[] } | undefined;
export type Regist = z.infer<typeof registValidator>;
export type RegistError =
  | Partial<Record<keyof Regist, ValidationError>>
  | undefined;
