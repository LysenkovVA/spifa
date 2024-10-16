import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "@/shared/lib/StoreProvider/config/StateSchema";
import { companiesAdapter } from "../adapter/companiesAdapter";

const getCompaniesSchema = (state: StateSchema) => {
  return state.companies;
};

export const getCompanies = companiesAdapter.getSelectors<StateSchema>(
  (state) => state.companies ?? companiesAdapter.getInitialState(),
);

export const getCompaniesIsLoading = createSelector(
  getCompaniesSchema,
  (schema) => {
    return schema?.isLoading ?? false;
  },
);

export const getCompaniesError = createSelector(
  getCompaniesSchema,
  (schema) => {
    return schema?.error ?? "";
  },
);

export const getCompaniesIsInitialized = createSelector(
  getCompaniesSchema,
  (schema) => {
    return schema?._isInitialized ?? false;
  },
);

export const getCompaniesTake = createSelector(getCompaniesSchema, (schema) => {
  return schema?.take ?? 5;
});

export const getCompaniesSkip = createSelector(getCompaniesSchema, (schema) => {
  return schema?.skip ?? 0;
});

export const getCompaniesSearch = createSelector(
  getCompaniesSchema,
  (schema) => {
    return schema?.search ?? "";
  },
);

export const getCompaniesTotalCount = createSelector(
  getCompaniesSchema,
  (schema) => {
    return schema?.totalCount ?? 0;
  },
);
