import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/db";
import { CompanyType, Prisma } from "@prisma/client";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Company, CompanyZSchema } from "@/entities/Company";
import dayjs from "dayjs";

/**
 * Создание нового документа
 * @param request
 * @constructor
 */
export async function POST(request: NextRequest) {
  try {
    // Получаем тело из запроса
    const data: Company = await request.json();

    // Валидация данных документа
    const validateCompany = CompanyZSchema.parse(data);

    // Данные запроса к БД
    const createQuery: Prisma.CompanyCreateInput = {
      name: validateCompany.name,
      companyType: validateCompany.companyType as CompanyType,
      management: validateCompany.management,
      fio: validateCompany.fio,
      opf: validateCompany.opf,
      phone: validateCompany.phone,
      address: validateCompany.address,
      status: validateCompany.status,
      inn: validateCompany.inn,
      kpp: validateCompany.kpp,
      ogrn: validateCompany.ogrn,
      ogrnDate: data.ogrnDate ? dayjs(data.ogrnDate).toDate() : null,
      okato: validateCompany.okato,
      okpo: validateCompany.okpo,
      okfs: validateCompany.okfs,
      oktmo: validateCompany.oktmo,
      okogu: validateCompany.okogu,
      okved: validateCompany.okved,
      actualityDate: data.actualityDate
        ? dayjs(data.actualityDate).toDate()
        : null,
      registrationDate: data.registrationDate
        ? dayjs(data.registrationDate).toDate()
        : null,
      liquidationDate: data.liquidationDate
        ? dayjs(data.liquidationDate).toDate()
        : null,
    };

    // Создание новой записи в БД
    const newCompany = await prisma.company.create({
      data: createQuery,
    });

    // Возвращаем созданный документ
    return NextResponse.json(ServerResponse.Ok<Company>(newCompany as Company));
  } catch (error) {
    return NextResponse.json(ServerResponse.ServerError(error));
  }
}
