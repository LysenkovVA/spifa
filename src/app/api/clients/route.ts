import { NextRequest, NextResponse } from "next/server";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import prisma from "../../../../prisma/db";
import { Client } from "@/entities/Client";

export async function POST(request: NextRequest, response: Response) {
  const body: { take: number; skip: number } = await request.json();

  try {
    // Результат
    const [clients, count] = await prisma.$transaction([
      prisma.client.findMany({
        take: body.take,
        skip: body.skip,
        include: { users: { include: { user: true } } },
      }),
      prisma.client.count(),
    ]);

    return NextResponse.json(
      ServerResponse.Ok(clients as Client[], {
        take: body.take,
        skip: body.skip,
        search: undefined,
        total: count,
      }),
    );
  } catch (error) {
    return NextResponse.json(
      ServerResponse.ServerError(
        error,
        {
          take: undefined,
          skip: undefined,
          search: undefined,
          total: 0,
        },
        `Неизвестная ошибка при получении списка клиентов`,
      ),
    );
  }
}
