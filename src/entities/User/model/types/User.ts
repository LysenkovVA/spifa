import { DBRole } from "@prisma/client";
import { ClientsOnUsers } from "@/entities/ClientsOnUsers";

export interface User {
  id: string;
  login?: string;
  password?: string;
  surname?: string;
  name?: string;
  patronymic?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  clients?: ClientsOnUsers[];
  dbRoles?: Array<DBRole>;
}
