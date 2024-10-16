import { CompanyDetailsSchema } from "@/entities/Company";
import { CompaniesSchema } from "@/features/Companies/CompaniesTable";

export interface StateSchema {
  // Асинхронные (подключаются динамически по мере надобности)
  companyDetails?: CompanyDetailsSchema;
  companies?: CompaniesSchema;
}

export type StateSchemaKey = keyof StateSchema;
