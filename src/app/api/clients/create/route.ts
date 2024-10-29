import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/db";
import { DBRole, Prisma } from "@prisma/client";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Client, ClientZSchema } from "@/entities/Client";
import { UserZSchema } from "@/entities/User";
import bcrypt from "bcryptjs";

/**
 * Создание нового документа
 * @param request
 * @constructor
 */
export async function POST(request: NextRequest) {
  try {
    // Получаем тело из запроса
    const data: Client = await request.json();

    // Валидация данных документа
    const validateClient = ClientZSchema.parse(data);

    // Данные запроса к БД
    const createQuery: Prisma.ClientCreateInput = {
      name: validateClient.name!,
      phone: validateClient.phone,
      address: validateClient.address,
    };

    const newClientsOnUsers:
      | Prisma.ClientsOnUsersCreateWithoutClientInput[]
      | undefined = data.users?.map((clientOnUser) => {
      const validatedUser = UserZSchema.parse(clientOnUser.user);

      // TODO: Валидация существования пользователя в БД

      const data: Prisma.ClientsOnUsersCreateWithoutClientInput = {
        user: {
          create: {
            login: validatedUser.login,
            password: bcrypt.hashSync(validatedUser.password, 10),
            dbRoles: [DBRole.USER],
          },
        },
        clientUserRole: clientOnUser.clientUserRole!,
      };

      return data;
    });

    createQuery.users = { create: newClientsOnUsers };

    // Создание новой записи в БД
    const newClient = await prisma.client.create({
      data: createQuery,
      include: { users: { include: { user: true } } },
    });

    // Возвращаем созданный документ
    return NextResponse.json(ServerResponse.Ok<Client>(newClient as Client));
  } catch (error) {
    return NextResponse.json(ServerResponse.ServerError(error));
  }
}
