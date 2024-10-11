import { PrismaClient } from "@prisma/client";

import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Тестовые данные
 */
async function main() {
  console.log("Seeding test data...");
  console.log("Create DB admin (owner@spifa.ru)...");
  const superAdmin = await prisma.user.create({
    data: {
      email: "owner@spifa.ru",
      password: bcrypt.hashSync("123456", 10),
      dBRole: {
        create: {
          name: "admin",
        },
      },
    },
  });

  console.log("Seeding DB user role...");
  const dbUserRole = await prisma.dBRole.create({
    data: {
      name: "user",
    },
  });

  console.log("Create client...");

  const client = await prisma.client.create({
    data: {
      email: "company@test.ru",
      name: "OZON",
      phone: "+74951234567",
    },
  });

  console.log("Create client users...");
  const clientUserAdmin = await prisma.user.create({
    data: {
      email: "admin@ozon.ru",
      password: bcrypt.hashSync("123456", 10),
      client: { connect: client },
      dBRole: { connect: dbUserRole },
      roles: {
        create: {
          userRole: {
            create: { name: "Администратор", client: { connect: client } },
          },
        },
      },
    },
  });

  const clientUser = await prisma.user.create({
    data: {
      email: "buh@ozon.ru",
      password: bcrypt.hashSync("123456", 10),
      client: { connect: client },
      dBRole: { connect: dbUserRole },
      roles: {
        create: {
          userRole: {
            create: { name: "Бухгалтер", client: { connect: client } },
          },
        },
      },
    },
  });

  console.log("Create companies...");
  const company_1 = await prisma.company.create({
    data: {
      name: "Мобилы и планшеты",
      inn: "111222333",
      client: { connect: client },
    },
  });

  const company_2 = await prisma.company.create({
    data: {
      name: "Стройка и ремонт",
      inn: "444555666",
      client: { connect: client },
    },
  });
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
