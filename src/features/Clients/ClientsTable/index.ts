import { ClientsSchema } from "./model/types/ClientsSchema";
import { fetchClients } from "./model/actions/fetchClients";
import { fetchClientsService } from "./model/services/fetchClients/fetchClientsService";
import { clientsActions, clientsReducer } from "./model/slice/clientsSlice";
import ClientsTable from "./ui/ClientsTable";

export {
  fetchClients,
  fetchClientsService,
  clientsActions,
  clientsReducer,
  ClientsTable,
};
export type { ClientsSchema };
export * from "./model/selectors/clients.selectors";
