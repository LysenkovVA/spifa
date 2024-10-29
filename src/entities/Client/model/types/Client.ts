import { ClientsOnUsers } from "@/entities/ClientsOnUsers";
import { Company } from "@/entities/Company";

export interface Client {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  users?: Array<ClientsOnUsers>;
  companies?: Array<Company>;
}
