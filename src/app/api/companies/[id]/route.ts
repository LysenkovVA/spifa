import prisma from "../../../../../prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { CompanyType, Prisma } from "@prisma/client";
import { Company, CompanyZSchema } from "@/entities/Company";
import dayjs from "dayjs";

/**
 * Получение документа по id
 * @param request
 * @param params
 * @constructor
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Выборка из БД
    const data = await prisma.company.findFirst({
      where: { id: params.id },
    });

    if (data) {
      // Возвращаем документ
      return NextResponse.json(ServerResponse.Ok<Company>(data as Company));
    } else {
      // Документ не найден
      return NextResponse.json(
        ServerResponse.NotFound(
          undefined,
          `Компания с id=${params.id} не найдена`,
        ),
      );
    }
  } catch (error) {
    return NextResponse.json(
      ServerResponse.ServerError(
        error,
        undefined,
        `Неизвестная ошибка при получении компании с id=${params.id}`,
      ),
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Получаем тело из запроса
    const data: Company = await request.json();

    if (!params.id) {
      return NextResponse.json(
        ServerResponse.ServerError(
          "id компании для обновления не задан",
          undefined,
        ),
      );
    }

    // Валидация данных документа
    const validateCompany = CompanyZSchema.parse(data);

    const updateCompanyQuery: Prisma.CompanyUpdateArgs = {
      data: {
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
      where: { id: params.id },
    };

    // Обновление записи в БД
    const updatedCompany = await prisma.company.update(updateCompanyQuery);

    // Возвращаем обновленный документ
    return NextResponse.json(
      ServerResponse.Ok<Company>(updatedCompany as Company),
    );
  } catch (error) {
    return NextResponse.json(
      ServerResponse.ServerError(
        error,
        undefined,
        `Неизвестная ошибка при обновлении компании с id=${params.id}`,
      ),
    );
  }
}

/**
 * Удаление по id
 * @param request
 * @param params
 * @constructor
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const data = await prisma.company.delete({ where: { id: params.id } });
    return NextResponse.json(
      ServerResponse.Ok<Company>(
        data as Company,
        undefined,
        "Компания удалена",
      ),
    );
  } catch (error) {
    return NextResponse.json(
      ServerResponse.ServerError(
        error,
        undefined,
        `Неизвестная ошибка при удалении компании с id=${params.id}`,
      ),
    );
  }
}
