import { StateSchema } from "@/shared/lib/StoreProvider/config/StateSchema";
import { createSelector } from "@reduxjs/toolkit";

const getClientDetailsSchema = (state: StateSchema) => {
  return state.clientDetails;
};

export const getClientDetails = createSelector(
  getClientDetailsSchema,
  (schema) => {
    return schema?.data ?? undefined;
  },
);

export const getClientDetailsIsLoading = createSelector(
  getClientDetailsSchema,
  (schema) => {
    return schema?.isLoading ?? false;
  },
);

export const getClientDetailsError = createSelector(
  getClientDetailsSchema,
  (schema) => {
    return schema?.error ?? false;
  },
);

export const getClientDetailsIsInitialized = createSelector(
  getClientDetailsSchema,
  (schema) => {
    return schema?._isInitialized ?? false;
  },
);
