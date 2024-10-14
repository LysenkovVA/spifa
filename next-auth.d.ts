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
    // user: {
    //   id: string;
    //   email: string;
    // };
    user: UserEntity;
  }

  interface User extends UserEntity {
    // id: string;
    // email: string;
  }
}

export declare module "next-auth/jwt" {
  interface JWT extends UserEntity, DefaultJWT {
    // id: string;
    // email: string;
  }
}
