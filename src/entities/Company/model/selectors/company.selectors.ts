import { StateSchema } from "@/shared/lib/StoreProvider/config/StateSchema";
import { createAppSelector } from "@/shared/lib/StoreProvider";

const getCompanyDetailsSchema = (state: StateSchema) => {
  return state.companyDetails;
};

export const getCompanyDetails = createAppSelector(
  getCompanyDetailsSchema,
  (schema) => {
    return schema?.data ?? undefined;
  },
);

export const getCompanyDetailsIsLoading = createAppSelector(
  getCompanyDetailsSchema,
  (schema) => {
    return schema?.isLoading ?? false;
  },
);

export const getCompanyDetailsError = createAppSelector(
  getCompanyDetailsSchema,
  (schema) => {
    return schema?.error ?? false;
  },
);

export const getCompanyDetailsIsInitialized = createAppSelector(
  getCompanyDetailsSchema,
  (schema) => {
    return schema?._isInitialized ?? false;
  },
);
