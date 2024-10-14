import Credentials from "@auth/core/providers/credentials";
import prisma from "../../../../prisma/db";
import type { Adapter } from "next-auth/adapters"; // Нужно это добавить, чтоб не было ошибки в adapter https://stackoverflow.com/questions/76503606/next-auth-error-adapter-is-not-assignable-to-type-adapter-undefined
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthConfig } from "next-auth";

import bcrypt from "bcryptjs";
import { User } from "@/entities/User";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma) as Adapter,
  pages: {
    signIn: "/",
  },
  session: {
    // Для Credentials поддерживается только эта стратегия
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // Set the session max age 1 days
    // maxAge: 10, // 10 secs
  },
  secret: process.env.AUTH_SECRET,
  debug: true,
  providers: [
    Credentials({
      name: "Credentials",
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          label: "E-mail",
          type: "text",
        },
        password: {
          label: "Пароль",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const candidate = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
          include: {
            client: true,
            roles: { include: { userRole: true } },
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

        return userWithoutPass as User;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.id = user.id!;
          token.email = user.email!;
          token.surname = user.surname;
          token.name = user.name;
          token.phone = user.phone;
          token.roles = user.roles;
          token.client = user.client;
          // token.role = user.role;
          // token.profile = user.profile;
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
          session.user.email = token.email!;
          session.user.surname = token.surname;
          session.user.name = token.name!;
          session.user.phone = token.phone!;
          session.user.roles = token.roles;
          session.user.client = token.client;

          // session.user.role = token.role;
          // session.user.profile = token.profile;
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
