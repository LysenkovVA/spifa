import z from "zod";

export const ProfileZSchema = z.object({
  id: z.string().cuid(),
  surname: z
    .string({
      invalid_type_error: 'Поле "Фамилия" не является строкой',
    })
    .optional()
    .nullable(),
  name: z
    .string({
      invalid_type_error: 'Поле "Имя" не является строкой',
    })
    .optional()
    .nullable(),
  patronymic: z
    .string({
      invalid_type_error: 'Поле "Отчество" не является строкой',
    })
    .optional()
    .nullable(),
  email: z
    .string({
      invalid_type_error: 'Поле "E-mail" не является строкой',
    })
    .email({ message: 'Поле "E-mail" некорректно' })
    .optional()
    .nullable(),
  phone: z
    .string({
      invalid_type_error: 'Поле "Телефон" не является строкой',
    })
    .optional()
    .nullable(),
  avatarUrl: z
    .string({
      invalid_type_error: 'Поле "Аватар" не является ссылкой',
    })
    .optional()
    .nullable(),
});
