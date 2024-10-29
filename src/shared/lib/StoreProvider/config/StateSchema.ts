import { CompanyDetailsSchema } from "@/entities/Company";
import { CompaniesSchema } from "@/features/Companies/CompaniesTable";
import { ClientsSchema } from "@/features/Clients/ClientsTable";
import { ClientDetailsSchema } from "@/entities/Client";

export interface StateSchema {
  // Асинхронные (подключаются динамически по мере надобности)
  companyDetails?: CompanyDetailsSchema;
  companies?: CompaniesSchema;
  clientDetails?: ClientDetailsSchema;
  clients?: ClientsSchema;
}

export type StateSchemaKey = keyof StateSchema;
