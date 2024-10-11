/**
 * Расширение стандартных интерфейсов AuthJS
 */

import { DefaultJWT } from "next-auth/jwt";

/**
 * https://authjs.dev/getting-started/typescript#module-augmentation
 */

export declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
    };
  }

  interface User {
    id: string;
    email: string;
  }
}

export declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    email: string;
  }
}
