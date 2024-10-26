import prisma from "../../../../../prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Prisma } from "@prisma/client";
import { Client, ClientZSchema } from "@/entities/Client";

/**
 * Получение клиента по id
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
    const data = await prisma.client.findFirst({
      where: { id: params.id },
    });

    if (data) {
      // Возвращаем документ
      return NextResponse.json(ServerResponse.Ok<Client>(data as Client));
    } else {
      // Документ не найден
      return NextResponse.json(
        ServerResponse.NotFound(
          undefined,
          `Клиент с id=${params.id} не найден`,
        ),
      );
    }
  } catch (error) {
    return NextResponse.json(
      ServerResponse.ServerError(
        error,
        undefined,
        `Неизвестная ошибка при получении клиента с id=${params.id}`,
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
    const data: Client = await request.json();

    if (!params.id) {
      return NextResponse.json(
        ServerResponse.ServerError(
          "id клиента для обновления не задан",
          undefined,
        ),
      );
    }

    // Валидация данных документа
    const validateClient = ClientZSchema.parse(data);

    const updateClientQuery: Prisma.ClientUpdateArgs = {
      data: {
        name: validateClient.name!,
        phone: validateClient.phone,
        address: validateClient.address,
      },
      where: { id: params.id },
    };

    // Обновление записи в БД
    const updatedClient = await prisma.client.update(updateClientQuery);

    // Возвращаем обновленный документ
    return NextResponse.json(
      ServerResponse.Ok<Client>(updatedClient as Client),
    );
  } catch (error) {
    return NextResponse.json(
      ServerResponse.ServerError(
        error,
        undefined,
        `Неизвестная ошибка при обновлении клиента с id=${params.id}`,
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
    const data = await prisma.client.delete({ where: { id: params.id } });
    return NextResponse.json(
      ServerResponse.Ok<Client>(data as Client, undefined, "Клиент удален"),
    );
  } catch (error) {
    return NextResponse.json(
      ServerResponse.ServerError(
        error,
        undefined,
        `Неизвестная ошибка при удалении клиента с id=${params.id}`,
      ),
    );
  }
}
