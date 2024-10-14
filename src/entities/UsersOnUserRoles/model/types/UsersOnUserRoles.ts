import { User } from "@/entities/User";
import { UserRole } from "@/entities/Role";

export interface UsersOnUserRoles {
  user?: User;
  userRole?: UserRole;
}
