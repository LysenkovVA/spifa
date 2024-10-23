import { Client } from "@/entities/Client";
import { User } from "@/entities/User";
import { ClientUserRole } from "@prisma/client";

export interface ClientsOnUsers {
  client?: Client;
  user?: User;
  clientUserRole?: ClientUserRole;
}
