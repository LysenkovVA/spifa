import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Тестовые данные
 */
async function main() {
  console.log("Seeding test data...");
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
