import { User } from "../../src/entities/User";
import { DBRole } from "@prisma/client";

export const dbAdmin: User = {
  id: "",
  surname: "Админов",
  name: "Админ Админыч",
  email: "admin@spifa.ru",
  password: "123456",
  phone: "8-901-123-45-67",
  dbRoles: [DBRole.ADMINISTRATOR],
};

export const clientAdminUser: User = {
  id: "",
  surname: "Иванов",
  name: "Иван Иванович",
  email: "admin@client.ru",
  password: "123456",
  phone: "8-903-234-56-78",
  dbRoles: [DBRole.USER],
};

export const clientUser: User = {
  id: "",
  surname: "Петров",
  name: "Петр Петрович",
  email: "user@client.ru",
  password: "123456",
  phone: "8-905-345-67-89",
  dbRoles: [DBRole.USER],
};
