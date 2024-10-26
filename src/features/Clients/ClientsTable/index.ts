import { ClientsTable } from "./ui/ClientsTable";
import { ClientsSchema } from "./model/types/ClientsSchema";
import { fetchClients } from "./model/actions/fetchClients";
import { fetchClientsService } from "./model/services/fetchClients/fetchClientsService";
import { clientsActions, clientsReducer } from "./model/slice/clientsSlice";

export {
  ClientsTable,
  fetchClients,
  fetchClientsService,
  clientsActions,
  clientsReducer,
};
export type { ClientsSchema };
export * from "./model/selectors/clients.selectors";
