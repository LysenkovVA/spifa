import { Client } from "./model/types/Client";
import { ClientZSchema } from "./model/validation/ClientZSchema";
import { deleteClient } from "./model/actions/deleteClient";
import { fetchClientById } from "./model/actions/fetchClientById";
import { upsertClient } from "./model/actions/upsertClient";
import { deleteClientService } from "./model/services/deleteClientService";
import { fetchClientByIdService } from "./model/services/fetchClientByIdService";
import { upsertClientService } from "./model/services/upsertClientService";
import { ClientDetailsSchema } from "./model/types/ClientDetailsSchema";
import {
  clientDetailsActions,
  clientDetailsReducer,
} from "./model/slice/clientSlice";

export type { Client, ClientDetailsSchema };
export {
  ClientZSchema,
  deleteClient,
  fetchClientById,
  upsertClient,
  deleteClientService,
  fetchClientByIdService,
  upsertClientService,
  clientDetailsActions,
  clientDetailsReducer,
};
export * from "./model/selectors/client.selectors";
