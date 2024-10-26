import z from "zod";

export const ClientZSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Поле "Название" не является строкой',
    })
    .optional()
    .nullable(),
  address: z
    .string({
      invalid_type_error: 'Поле "Адрес" не является строкой',
    })
    .optional()
    .nullable(),
  phone: z
    .string({
      invalid_type_error: 'Поле "Телефон" не является строкой',
    })
    .optional()
    .nullable(),
});
