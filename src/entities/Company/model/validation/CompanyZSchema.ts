import z from "zod";

export const CompanyZSchema = z.object({
  id: z.string().optional(),
  name: z.string({
    required_error: 'Поле "Название" не указано',
    invalid_type_error: 'Поле "Название" не является строкой',
  }),
  companyType: z
    .string({ invalid_type_error: 'Поле "Тип" не является строкой' })
    .optional()
    .nullable(),
  management: z
    .string({ invalid_type_error: 'Поле "Руководитель" не является строкой' })
    .optional()
    .nullable(),
  fio: z
    .string({ invalid_type_error: 'Поле "ФИО ИП" не является строкой' })
    .optional()
    .nullable(),
  opf: z
    .string({
      invalid_type_error: 'Поле "Тип компании (ОПФ)" не является строкой',
    })
    .optional()
    .nullable(),
  phone: z
    .string({ invalid_type_error: 'Поле "Телефон" не является строкой' })
    .optional()
    .nullable(),
  address: z
    .string({ invalid_type_error: 'Поле "Адрес" не является строкой' })
    .optional()
    .nullable(),
  status: z
    .string({ invalid_type_error: 'Поле "Статус" не является строкой' })
    .optional()
    .nullable(),
  inn: z
    .string({ invalid_type_error: 'Поле "ИНН" не является строкой' })
    .optional()
    .nullable(),
  kpp: z
    .string({ invalid_type_error: 'Поле "КПП" не является строкой' })
    .optional()
    .nullable(),
  ogrn: z
    .string({ invalid_type_error: 'Поле "ОГРН" не является строкой' })
    .optional()
    .nullable(),
  // ogrnDate: z
  //   .date({ invalid_type_error: 'Поле "Дата ОГРН" не является датой' })
  //   .optional()
  //   .nullable(),
  okato: z
    .string({ invalid_type_error: 'Поле "ОКАТО" не является строкой' })
    .optional()
    .nullable(),
  okpo: z
    .string({ invalid_type_error: 'Поле "ОКПО" не является строкой' })
    .optional()
    .nullable(),
  okfs: z
    .string({ invalid_type_error: 'Поле "ОКФС" не является строкой' })
    .optional()
    .nullable(),
  oktmo: z
    .string({ invalid_type_error: 'Поле "ОКТМО" не является строкой' })
    .optional()
    .nullable(),
  okogu: z
    .string({ invalid_type_error: 'Поле "ОКОГУ" не является строкой' })
    .optional()
    .nullable(),
  okved: z
    .string({ invalid_type_error: 'Поле "ОКВЭД" не является строкой' })
    .optional()
    .nullable(),
  // actualityDate: z
  //   .date({
  //     invalid_type_error: 'Поле "Дата последних изменений" не является датой',
  //   })
  //   .optional()
  //   .nullable(),
  // registrationDate: z
  //   .date({ invalid_type_error: 'Поле "Дата регистрации" не является датой' })
  //   .optional()
  //   .nullable(),
  // liquidationDate: z
  //   .date({ invalid_type_error: 'Поле "Дата ликвидации" не является датой' })
  //   .optional()
  //   .nullable(),
});
