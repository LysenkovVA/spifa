import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/db";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { User } from "@/entities/User";

/**
 * Получение пользователя по id
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
    const data = await prisma.user.findFirst({
      include: { clients: { include: { client: true } } },
      where: { id: params.id },
    });

    if (data) {
      // Возвращаем пользователя
      return NextResponse.json(ServerResponse.Ok<User>(data as User));
    } else {
      // Документ не найден
      return NextResponse.json(
        ServerResponse.NotFound(
          undefined,
          `Пользователь с id=${params.id} не найден`,
        ),
      );
    }
  } catch (error) {
    return NextResponse.json(
      ServerResponse.ServerError(
        error,
        undefined,
        `Неизвестная ошибка при получении пользователя с id=${params.id}`,
      ),
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Выборка из БД
    const data = await prisma.user.findFirst({
      include: { clients: { include: { client: true } } },
      where: { id: params.id },
    });

    if (data) {
      // Возвращаем пользователя
      return NextResponse.json(ServerResponse.Ok<User>(data as User));
    } else {
      // Документ не найден
      return NextResponse.json(
        ServerResponse.NotFound(
          undefined,
          `Пользователь с id=${params.id} не найден`,
        ),
      );
    }
  } catch (error) {
    return NextResponse.json(
      ServerResponse.ServerError(
        error,
        undefined,
        `Неизвестная ошибка при получении пользователя с id=${params.id}`,
      ),
    );
  }
}
