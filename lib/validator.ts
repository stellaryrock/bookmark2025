import z from 'zod';

export type ValidError = {
  success: false;
  error: Record<string, { errors: string[] }>;
};

export type ValidSuccess<T> = {
  success: true;
  data: T;
};

export const validate = <T extends z.ZodObject>(
  zobj: z.ZodObject,
  formData: FormData
) => {
  const validator = zobj.safeParse(Object.fromEntries(formData.entries()));
  if (!validator.success) {
    return {
      success: false,
      error: z.treeifyError(validator.error).properties,
    } as ValidError;
  }

  const data = validator.data as z.infer<T>;
  return { success: true, data } as ValidSuccess<typeof data>;
};
