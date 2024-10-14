import z from "zod";

export const CompanyZSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string({
    required_error: "Название компании не указано",
    invalid_type_error: "Название компании должно быть строкой",
  }),
  inn: z
    .string({
      invalid_type_error: "ИНН должен быть строкой",
    })
    .optional(),
});
