import { NextRequest, NextResponse } from "next/server";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import prisma from "../../../../prisma/db";
import { Client } from "@/entities/Client";

export async function GET(request: NextRequest, response: Response) {
  try {
    // Результат
    const [clients, count] = await prisma.$transaction([
      prisma.client.findMany({
        include: { users: { include: { user: true } } },
      }),
      prisma.client.count(),
    ]);

    return NextResponse.json(
      ServerResponse.Ok(clients as Client[], {
        take: undefined,
        skip: undefined,
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
