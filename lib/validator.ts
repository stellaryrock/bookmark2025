import z from 'zod';

export type ValidError = {
  success: false;
  error: Record<string, { errors: string[]; value?: FormDataEntryValue }>;
};

export type ValidSuccess<T> = {
  success: true;
  data: T;
};

export const validate = <T extends z.ZodObject>(
  zobj: z.ZodObject,
  formData: FormData
) => {
  const ent = Object.fromEntries(formData.entries());
  return validateObject<T>(zobj, ent);
};

export const validateObject = <T extends z.ZodObject>(
  zobj: z.ZodObject,
  obj: Record<string, FormDataEntryValue | string>
) => {
  const validator = zobj.safeParse(obj);
  if (!validator.success) {
    //  error: {email: {errors: ['xxx']}}
    const error = z.treeifyError(validator.error)
      .properties as ValidError['error'];
    for (const [prop, value] of Object.entries(obj)) {
      if (prop.startsWith('$')) continue;
      if (!error[prop]) error[prop] = { errors: [], value };
      else error[prop].value = value;
    }
    return {
      success: false,
      error,
    } as ValidError;
  }

  const data = validator.data as z.infer<T>;
  return { success: true, data } as ValidSuccess<typeof data>;
};
