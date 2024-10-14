import { Client } from "@/entities/Client";
import { UsersOnUserRoles } from "@/entities/UsersOnUserRoles";

export interface User {
  id: string;
  email: string;
  password?: string;
  surname?: string;
  name?: string;
  phone?: string;
  avatarUrl?: string;
  clientId?: string;
  client?: Client;
  roles?: UsersOnUserRoles[];
}
