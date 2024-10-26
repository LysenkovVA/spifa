import { CompanyDetailsSchema } from "@/entities/Company";
import { CompaniesSchema } from "@/features/Companies/CompaniesTable";
import { ClientsSchema } from "@/features/Clients/ClientsTable";

export interface StateSchema {
  // Асинхронные (подключаются динамически по мере надобности)
  companyDetails?: CompanyDetailsSchema;
  companies?: CompaniesSchema;
  clients?: ClientsSchema;
}

export type StateSchemaKey = keyof StateSchema;
