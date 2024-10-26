import { StateSchema } from "@/shared/lib/StoreProvider/config/StateSchema";
import { clientsAdapter } from "../adapter/clientsAdapter";
import { createAppSelector } from "@/shared/lib/StoreProvider";

const getClientsSchema = (state: StateSchema) => {
  return state.clients;
};

export const getClients = clientsAdapter.getSelectors<StateSchema>(
  (state) => state.clients ?? clientsAdapter.getInitialState(),
);

export const getClientsIsLoading = createAppSelector(
  getClientsSchema,
  (schema) => {
    return schema?.isLoading ?? false;
  },
);

export const getClientsError = createAppSelector(getClientsSchema, (schema) => {
  return schema?.error ?? "";
});

export const getClientsIsInitialized = createAppSelector(
  getClientsSchema,
  (schema) => {
    return schema?._isInitialized ?? false;
  },
);

export const getClientsTake = createAppSelector(getClientsSchema, (schema) => {
  return schema?.take ?? 5;
});

export const getClientsSkip = createAppSelector(getClientsSchema, (schema) => {
  return schema?.skip ?? 0;
});

export const getClientsSearch = createAppSelector(
  getClientsSchema,
  (schema) => {
    return schema?.search ?? "";
  },
);

export const getClientsTotalCount = createAppSelector(
  getClientsSchema,
  (schema) => {
    return schema?.totalCount ?? 0;
  },
);
