import { NextRequest, NextResponse } from "next/server";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import prisma from "../../../../prisma/db";
import { Company } from "@/entities/Company";

export async function GET(request: NextRequest, response: Response) {
  try {
    // Результат
    const [companies, count] = await prisma.$transaction([
      prisma.company.findMany(),
      prisma.company.count(),
    ]);

    return NextResponse.json(
      ServerResponse.Ok(companies as Company[], {
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
        `Неизвестная ошибка при получении списка компаний`,
      ),
    );
  }
}
