import Credentials from "@auth/core/providers/credentials";
import prisma from "../../../../prisma/db";
import type { Adapter } from "next-auth/adapters"; // Нужно это добавить, чтоб не было ошибки в adapter https://stackoverflow.com/questions/76503606/next-auth-error-adapter-is-not-assignable-to-type-adapter-undefined
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthConfig } from "next-auth";

import bcrypt from "bcryptjs";
import { User as UserEntity } from "@/entities/User";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma) as Adapter,
  pages: {
    signIn: "/",
  },
  session: {
    // Для Credentials поддерживается только эта стратегия
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 день
  },
  secret: process.env.AUTH_SECRET,
  debug: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        login: {
          label: "Логин",
          type: "text",
        },
        password: {
          label: "Пароль",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials.login || !credentials.password) {
          return null;
        }

        const candidate = await prisma.user.findFirst({
          where: {
            login: credentials.login,
          },
          include: {
            clients: { include: { client: true } },
          },
        });

        if (!candidate) {
          throw new Error("Пользователь не найден!");
        }

        const match = bcrypt.compareSync(
          String(credentials.password),
          candidate.password,
        );

        if (!match) {
          throw new Error("Неверный пароль!");
        }

        const { password, ...userWithoutPass } = candidate;

        return userWithoutPass as UserEntity;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.id = user.id!;
          token.login = user.login!;
          token.surname = user.surname;
          token.name = user.name;
          token.patronymic = user.patronymic;
          token.email = user.email;
          token.phone = user.phone;
          token.dbRoles = user.dbRoles;
          token.clients = user.clients;
        }
        return token;
      } catch (error) {
        console.log("ERROR JWT Callback (authConfig)", JSON.stringify(error));
        return null;
      }
    },
    // Для использования в клиентских приложениях
    async session({ session, token }) {
      try {
        if (session.user) {
          session.user.id = token.id;
          session.user.login = token.login!;
          session.user.surname = token.surname;
          session.user.name = token.name!;
          session.user.patronymic = token.patronymic;
          session.user.email = token.email!;
          session.user.phone = token.phone!;
          session.user.dbRoles = token.dbRoles;
          session.user.clients = token.clients;
        }

        return session;
      } catch (error) {
        console.log(
          "ERROR Session Callback (authConfig)",
          JSON.stringify(error),
        );
        return session;
      }
    },
  },
};
