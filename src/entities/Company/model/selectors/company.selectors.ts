import { StateSchema } from "@/shared/lib/StoreProvider/config/StateSchema";
import { createSelector } from "@reduxjs/toolkit";

const getCompanyDetailsSchema = (state: StateSchema) => {
  return state.companyDetails;
};

export const getCompanyDetails = createSelector(
  getCompanyDetailsSchema,
  (schema) => {
    return schema?.data ?? undefined;
  },
);

export const getCompanyDetailsIsLoading = createSelector(
  getCompanyDetailsSchema,
  (schema) => {
    return schema?.isLoading ?? false;
  },
);

export const getCompanyDetailsError = createSelector(
  getCompanyDetailsSchema,
  (schema) => {
    return schema?.error ?? false;
  },
);

export const getCompanyDetailsIsInitialized = createSelector(
  getCompanyDetailsSchema,
  (schema) => {
    return schema?._isInitialized ?? false;
  },
);
