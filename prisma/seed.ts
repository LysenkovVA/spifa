import { PrismaClient } from "@prisma/client";
import { clientAdminUser, clientUser, dbAdmin } from "./seed-data/usersData";
import bcrypt from "bcryptjs";
import { clientYandexData } from "./seed-data/clientsData";
import {
  companiesListPermission,
  listsPermission,
  paymentsPermission,
} from "./seed-data/clientPermissions";

const prisma = new PrismaClient();

/**
 * Тестовые данные
 */
async function main() {
  console.log("Добавление тестовых данных в БД");

  try {
    console.log(
      `Создание администратора БД с адресом электронной почты "${dbAdmin.email}"...`,
    );

    await prisma.user.create({
      data: {
        surname: dbAdmin.surname,
        name: dbAdmin.name,
        email: dbAdmin.email,
        password: bcrypt.hashSync(dbAdmin.password!, 10),
        dbRoles: dbAdmin.dbRoles,
      },
    });

    console.log(`Создание клиентских разрешений в БД"...`);

    const paymentsPerm = await prisma.clientPermission.create({
      data: {
        name: paymentsPermission.name,
        description: paymentsPermission.description,
      },
    });

    const listsPerm = await prisma.clientPermission.create({
      data: {
        name: listsPermission.name,
        description: listsPermission.description,
      },
    });

    const companiesListPerm = await prisma.clientPermission.create({
      data: {
        name: companiesListPermission.name,
        description: companiesListPermission.description,
      },
    });

    console.log(
      `Добавление администратора клиента "${clientYandexData.name}" c адресом электронной почты "${clientAdminUser.email}"`,
    );

    const clAdmin = await prisma.user.create({
      data: {
        surname: clientAdminUser.surname,
        name: clientAdminUser.name,
        email: clientAdminUser.email,
        password: bcrypt.hashSync(clientAdminUser.password!, 10),
        dbRoles: clientAdminUser.dbRoles,
        phone: clientAdminUser.phone,
      },
    });

    console.log(
      `Добавление пользователя клиента "${clientYandexData.name}" c адресом электронной почты "${clientUser.email}"`,
    );

    const clUser = await prisma.user.create({
      data: {
        surname: clientUser.surname,
        name: clientUser.name,
        email: clientUser.email,
        password: bcrypt.hashSync(clientUser.password!, 10),
        dbRoles: clientUser.dbRoles,
        phone: clientUser.phone,
      },
    });

    console.log(`Добавление клиента "${clientYandexData.name}"...`);
    const client = await prisma.client.create({
      data: {
        name: clientYandexData.name,
        address: clientYandexData.address,
        phone: clientYandexData.phone,
        users: {
          createMany: {
            data: [
              { userId: clAdmin.id, clientUserRole: "ADMINISTRATOR" },
              { userId: clUser.id, clientUserRole: "EMPLOYEE" },
            ],
          },
        },
      },
    });

    console.log("Все тестовые данные добавлены!");
  } catch {
    console.log("Ошибка!");
    return;
  }

  // console.log("Seeding test data...");
  // console.log("Create DB admin (owner@spifa.ru)...");
  // const superAdmin = await prisma.user.create({
  //   data: {
  //     email: "owner@spifa.ru",
  //     password: bcrypt.hashSync("123456", 10),
  //     dBRole: {
  //       create: {
  //         name: "admin",
  //       },
  //     },
  //   },
  // });
  //
  // console.log("Seeding DB user role...");
  // const dbUserRole = await prisma.dBRole.create({
  //   data: {
  //     name: "user",
  //   },
  // });
  //
  // console.log("Create client...");
  //
  // const client = await prisma.client.create({
  //   data: {
  //     email: "company@test.ru",
  //     name: "OZON",
  //     phone: "+74951234567",
  //   },
  // });
  //
  // console.log("Create client users...");
  // const clientUserAdmin = await prisma.user.create({
  //   data: {
  //     email: "admin@ozon.ru",
  //     password: bcrypt.hashSync("123456", 10),
  //     surname: "Анохин",
  //     name: "Сергей Петрович",
  //     phone: "+74951234567",
  //     client: { connect: client },
  //     dBRole: { connect: dbUserRole },
  //     roles: {
  //       create: {
  //         userRole: {
  //           create: { name: "Администратор", client: { connect: client } },
  //         },
  //       },
  //     },
  //   },
  // });
  //
  // const clientUser = await prisma.user.create({
  //   data: {
  //     email: "buh@ozon.ru",
  //     password: bcrypt.hashSync("123456", 10),
  //     client: { connect: client },
  //     dBRole: { connect: dbUserRole },
  //     roles: {
  //       create: {
  //         userRole: {
  //           create: { name: "Бухгалтер", client: { connect: client } },
  //         },
  //       },
  //     },
  //   },
  // });
  //
  // console.log("Create companies...");
  // const company_1 = await prisma.company.create({
  //   data: {
  //     name: "Мобилы и планшеты",
  //     inn: "111222333",
  //     client: { connect: client },
  //   },
  // });
  //
  // const company_2 = await prisma.company.create({
  //   data: {
  //     name: "Стройка и ремонт",
  //     inn: "444555666",
  //     client: { connect: client },
  //   },
  // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
