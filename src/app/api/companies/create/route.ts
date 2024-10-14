import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/db";
import { Prisma } from "@prisma/client";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Company, CompanyZSchema } from "@/entities/Company";

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
      inn: validateCompany.inn,
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
