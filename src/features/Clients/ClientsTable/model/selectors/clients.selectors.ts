import { StateSchema } from "@/shared/lib/StoreProvider/config/StateSchema";
import { clientsAdapter } from "../adapter/clientsAdapter";
import { createSelector } from "@reduxjs/toolkit";

const getClientsSchema = (state: StateSchema) => {
  return state.clients;
};

export const getClients = clientsAdapter.getSelectors<StateSchema>(
  (state) => state.clients ?? clientsAdapter.getInitialState(),
);

export const getClientsIsLoading = createSelector(
  getClientsSchema,
  (schema) => {
    return schema?.isLoading ?? false;
  },
);

export const getClientsError = createSelector(getClientsSchema, (schema) => {
  return schema?.error ?? "";
});

export const getClientsIsInitialized = createSelector(
  getClientsSchema,
  (schema) => {
    return schema?._isInitialized ?? false;
  },
);

export const getClientsTake = createSelector(getClientsSchema, (schema) => {
  return schema?.take ?? 10;
});

export const getClientsSkip = createSelector(getClientsSchema, (schema) => {
  return schema?.skip ?? 0;
});

export const getClientsSearch = createSelector(getClientsSchema, (schema) => {
  return schema?.search ?? "";
});

export const getClientsTotalCount = createSelector(
  getClientsSchema,
  (schema) => {
    return schema?.totalCount ?? 0;
  },
);

export const getClientsHasMore = createSelector(getClientsSchema, (schema) => {
  return schema?.hasMore ?? true;
});
