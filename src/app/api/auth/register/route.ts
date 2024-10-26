import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/db";
import { User, UserZSchema } from "@/entities/User";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    // Тело запроса
    const data: User = await request.json();

    // Валидация
    const validatedUser = UserZSchema.parse(data);

    // Проверка существования пользователя
    const candidate = await prisma.user.findFirst({
      where: { login: validatedUser.login },
    });

    if (candidate) {
      throw new Error("Пользователь c таким логином уже зарегистрирован!");
    }

    // const createUserQuery: Prisma.UserCreateInput = {
    //   data: {
    //     email: validatedUser.email,
    //     password: bcrypt.hashSync(validatedUser.password, 10),
    //     surname: validatedUser.s,
    //   },
    // };

    // Добавление в БД
    const registeredUser = (await prisma.user.create({
      data: {
        ...validatedUser,
        dbRoles: data.dbRoles ?? undefined,
        password: bcrypt.hashSync(validatedUser.password, 10),
        clients: {
          create: {
            client: { create: { name: "", address: "", phone: "" } },
            clientUserRole: "ADMINISTRATOR",
          },
        },
      },
    })) as User;

    return NextResponse.json(ServerResponse.Ok<User>(registeredUser));
  } catch (error) {
    return NextResponse.json(
      ServerResponse.ServerError(
        error,
        undefined,
        `Неизвестная ошибка при обновлении создании пользователя`,
      ),
    );
  }
}
