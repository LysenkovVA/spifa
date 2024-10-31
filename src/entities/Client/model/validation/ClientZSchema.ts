import z from "zod";

export const ClientZSchema = z.object({
  id: z.string().optional(),
  name: z.string({
    invalid_type_error: 'Поле "Название" не является строкой',
  }),
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
