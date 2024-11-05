import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/db";
import { ProfileZSchema, User } from "@/entities/User";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const data: User = {
      id: String(formData.get("id")),
      surname: String(formData.get("surname")),
      name: String(formData.get("name")),
      patronymic: String(formData.get("patronymic")),
      phone: String(formData.get("phone")),
      email: String(formData.get("email")),
    };

    // Валидация
    const validatedUser = ProfileZSchema.parse(data);

    // Добавление в БД
    const updatedUser = (await prisma.user.update({
      data: {
        surname: validatedUser.surname,
        name: validatedUser.name,
        patronymic: validatedUser.patronymic,
        phone: validatedUser.phone,
        email: validatedUser.email,
      },
      where: { id: validatedUser.id },
    })) as User;

    return NextResponse.json(ServerResponse.Ok<User>(updatedUser));
  } catch (error) {
    return NextResponse.json(
      ServerResponse.ServerError(
        error,
        undefined,
        `Неизвестная ошибка при обновлении пользователя`,
      ),
    );
  }
}
