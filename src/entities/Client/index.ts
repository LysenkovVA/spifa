import { Client } from "./model/types/Client";
import { ClientZSchema } from "./model/validation/ClientZSchema";
import { createClient } from "./model/actions/createClient";
import { deleteClient } from "./model/actions/deleteClient";
import { fetchClientById } from "./model/actions/fetchClientById";
import { updateClient } from "./model/actions/updateClient";
import { createClientService } from "./model/services/createClientService";
import { deleteClientService } from "./model/services/deleteClientService";
import { fetchClientByIdService } from "./model/services/fetchClientByIdService";
import { updateClientService } from "./model/services/updateClientService";
import { ClientDetailsSchema } from "./model/types/ClientDetailsSchema";
import {
  clientDetailsActions,
  clientDetailsReducer,
} from "./model/slice/clientSlice";

export type { Client, ClientDetailsSchema };
export {
  ClientZSchema,
  createClient,
  deleteClient,
  fetchClientById,
  updateClient,
  createClientService,
  deleteClientService,
  fetchClientByIdService,
  updateClientService,
  clientDetailsActions,
  clientDetailsReducer,
};
export * from "./model/selectors/client.selectors";
