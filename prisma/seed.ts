import { PrismaClient } from "@prisma/client";
import { dbAdmin } from "./seed-data/usersData";
import bcrypt from "bcryptjs";
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
  console.log(">>> Seeding initial data...");

  try {
    console.log(`Creating database admin with login = "${dbAdmin.login}"...`);

    await prisma.user.create({
      data: {
        surname: dbAdmin.surname,
        name: dbAdmin.name,
        login: dbAdmin.login!,
        email: dbAdmin.email,
        password: bcrypt.hashSync(dbAdmin.password!, 10),
        dbRoles: dbAdmin.dbRoles,
      },
    });

    console.log(`Creating client permissions"...`);

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

    // console.log(
    //   `Добавление администратора клиента "${clientYandexData.name}" c адресом электронной почты "${clientAdminUser.email}"`,
    // );
    //
    // const clAdmin = await prisma.user.create({
    //   data: {
    //     surname: clientAdminUser.surname,
    //     name: clientAdminUser.name,
    //     login: clientAdminUser.login!,
    //     email: clientAdminUser.email,
    //     password: bcrypt.hashSync(clientAdminUser.password!, 10),
    //     dbRoles: clientAdminUser.dbRoles,
    //     phone: clientAdminUser.phone,
    //   },
    // });
    //
    // console.log(
    //   `Добавление пользователя клиента "${clientYandexData.name}" c адресом электронной почты "${clientUser.email}"`,
    // );
    //
    // const clUser = await prisma.user.create({
    //   data: {
    //     surname: clientUser.surname,
    //     name: clientUser.name,
    //     login: clientUser.login!,
    //     email: clientUser.email,
    //     password: bcrypt.hashSync(clientUser.password!, 10),
    //     dbRoles: clientUser.dbRoles,
    //     phone: clientUser.phone,
    //   },
    // });
    //
    // console.log(`Добавление клиента "${clientYandexData.name}"...`);
    // const client = await prisma.client.create({
    //   data: {
    //     name: clientYandexData.name,
    //     address: clientYandexData.address,
    //     phone: clientYandexData.phone,
    //     users: {
    //       createMany: {
    //         data: [
    //           { userId: clAdmin.id, clientUserRole: "ADMINISTRATOR" },
    //           { userId: clUser.id, clientUserRole: "EMPLOYEE" },
    //         ],
    //       },
    //     },
    //   },
    // });

    console.log(">>> Seeding completed!");
  } catch {
    console.log(">>> Seeding error!");
    return;
  }
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
