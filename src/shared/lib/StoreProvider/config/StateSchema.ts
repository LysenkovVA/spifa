import { CompanyDetailsSchema } from "@/entities/Company";

export interface StateSchema {
  // Асинхронные (подключаются динамически по мере надобности)
  companyDetails?: CompanyDetailsSchema;
}

export type StateSchemaKey = keyof StateSchema;
