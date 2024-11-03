import { NextRequest, NextResponse } from "next/server";
import { Company, CompanyZSchema } from "@/entities/Company";
import prisma from "../../../../../prisma/db";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { CompanyType } from "@prisma/client";
import dayjs from "dayjs";

export async function POST(request: NextRequest) {
  try {
    // Получаем тело из запроса
    const data: Company = await request.json();

    // Запускаем транзакцию по созданию/обновлению клиента
    const updatedCompany = await prisma.$transaction(async (tx) => {
      // Валидация данных компании
      const validateCompany = CompanyZSchema.parse(data);

      // 1. Создание/обновление клиента
      const upsertedCompany = await tx.company.upsert({
        create: {
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
        },
        update: {
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
        },
        where: { id: validateCompany.id ?? "" },
      });

      return upsertedCompany;
    });

    return NextResponse.json(
      ServerResponse.Ok<Company>(updatedCompany as Company),
    );
  } catch (error) {
    return NextResponse.json(ServerResponse.ServerError(error));
  }
}
