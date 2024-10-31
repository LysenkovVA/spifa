import prisma from "../../../../../prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Client } from "@/entities/Client";

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
      include: { users: { include: { user: true } } },
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
