import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/db";
import { Prisma } from "@prisma/client";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Client, ClientZSchema } from "@/entities/Client";

/**
 * Создание нового документа
 * @param request
 * @constructor
 */
export async function POST(request: NextRequest) {
  try {
    // Получаем тело из запроса
    const data: Client = await request.json();

    // Валидация данных документа
    const validateClient = ClientZSchema.parse(data);

    // Данные запроса к БД
    const createQuery: Prisma.ClientCreateInput = {
      name: validateClient.name!,
      phone: validateClient.phone,
      address: validateClient.address,
    };

    // Создание новой записи в БД
    const newClient = await prisma.client.create({
      data: createQuery,
    });

    // Возвращаем созданный документ
    return NextResponse.json(ServerResponse.Ok<Client>(newClient as Client));
  } catch (error) {
    return NextResponse.json(ServerResponse.ServerError(error));
  }
}
