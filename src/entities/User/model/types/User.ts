import { DBRole } from "@prisma/client";
import { ClientsOnUsers } from "@/entities/ClientsOnUsers";

export interface User {
  id: string;
  email: string;
  password?: string;
  surname?: string;
  name?: string;
  phone?: string;
  avatarUrl?: string;
  clients?: ClientsOnUsers[];
  dbRoles?: Array<DBRole>;
}
