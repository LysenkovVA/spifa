/**
 * Расширение стандартных интерфейсов AuthJS
 */

import { User as UserEntity } from "@/entities/User";
import { DefaultJWT } from "next-auth/jwt";

/**
 * https://authjs.dev/getting-started/typescript#module-augmentation
 */

export declare module "next-auth" {
  interface Session {
    user: UserEntity;
  }

  interface User extends UserEntity {}
}

export declare module "next-auth/jwt" {
  interface JWT extends UserEntity, DefaultJWT {}
}
