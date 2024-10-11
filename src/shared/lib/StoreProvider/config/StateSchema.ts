import { CompanySchema } from "@/entities/Company";

export interface StateSchema {
  // Асинхронные (подключаются динамически по мере надобности)
  companyDetails?: CompanySchema;
}

export type StateSchemaKey = keyof StateSchema;
