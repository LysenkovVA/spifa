import { NextRequest, NextResponse } from "next/server";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import prisma from "../../../../prisma/db";
import { Company } from "@/entities/Company";
import { auth } from "../../../../auth";

export async function POST(request: NextRequest, response: Response) {
  const body: { take: number; skip: number } = await request.json();

  const session = await auth();

  // Id клиента, к которому относится пользователь
  const currentClientId = session?.user?.clients?.[0].client?.id;

  try {
    // Результат
    const [companies, count] = await prisma.$transaction([
      prisma.company.findMany({
        take: body.take,
        skip: body.skip,
        where: { client: { id: currentClientId } },
      }),
      prisma.company.count(),
    ]);

    return NextResponse.json(
      ServerResponse.Ok(companies as Company[], {
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
        `Неизвестная ошибка при получении списка компаний`,
      ),
    );
  }
}
