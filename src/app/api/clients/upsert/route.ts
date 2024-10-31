import { NextRequest, NextResponse } from "next/server";
import { Client, ClientZSchema } from "@/entities/Client";
import { UserZSchema } from "@/entities/User";
import prisma from "../../../../../prisma/db";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    // Получаем тело из запроса
    const data: Client = await request.json();

    // Запускаем транзакцию по созданию/обновлению клиента
    const updatedClient = await prisma.$transaction(async (tx) => {
      // 1. Удаление пользователей
      data.usersToDeleteIds?.map(async (deleteUserId) => {
        await tx.user.delete({ where: { id: deleteUserId } });
      });

      // Валидация данных клиента
      const validateClient = ClientZSchema.parse(data);

      // 2. Создание/обновление клиента
      const upsertedClient = await tx.client.upsert({
        create: {
          name: validateClient.name,
          address: validateClient.address,
          phone: validateClient.phone,
          users: {
            create: data.users?.map((clientOnUser) => {
              // Валидация данных пользователя
              const validatedUser = UserZSchema.parse(clientOnUser.user);

              const usr: Prisma.ClientsOnUsersCreateWithoutClientInput = {
                user: {
                  create: {
                    ...validatedUser,
                    password: bcrypt.hashSync(validatedUser.password, 10),
                  },
                },
                clientUserRole: clientOnUser.clientUserRole!,
              };

              return usr;
            }),
          },
        },
        update: {
          name: validateClient.name,
          address: validateClient.address,
          phone: validateClient.phone,
          users: {
            upsert: data.users?.map((clientOnUser) => {
              // Валидация данных пользователя
              const validatedUser = UserZSchema.parse(clientOnUser.user);

              const usr: Prisma.ClientsOnUsersUpsertWithWhereUniqueWithoutClientInput =
                {
                  create: {
                    user: {
                      create: {
                        ...validatedUser,
                        password: bcrypt.hashSync(validatedUser.password, 10),
                      },
                    },
                    clientUserRole: clientOnUser.clientUserRole!,
                  },
                  update: {
                    // TODO Обновление пароля пока не сделано
                    user: { update: { ...validatedUser } },
                    clientUserRole: clientOnUser.clientUserRole!,
                  },
                  where: {
                    clientId_userId: {
                      clientId: validateClient.id! ?? "",
                      userId: validatedUser.id! ?? "",
                    },
                  },
                };

              return usr;
            }),
          },
        },
        where: { id: validateClient.id ?? "" },
        include: { users: { include: { user: true } } },
      });

      return upsertedClient;
    });

    return NextResponse.json(
      ServerResponse.Ok<Client>(updatedClient as Client),
    );
  } catch (error) {
    return NextResponse.json(ServerResponse.ServerError(error));
  }
}
