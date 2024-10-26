import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/db";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";

export async function GET(request: NextRequest, response: Response) {
  try {
    const usersCount = await prisma.user.count();
    return NextResponse.json(ServerResponse.Ok<number>(usersCount));
  } catch (error) {
    return NextResponse.json(
      ServerResponse.ServerError(
        error,
        undefined,
        `Неизвестная ошибка при получении количества пользователей`,
      ),
    );
  }
}
