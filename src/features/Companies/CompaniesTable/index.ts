import CompaniesTable from "./ui/CompaniesTable";
import { CompaniesSchema } from "./model/types/CompaniesSchema";
import { fetchCompanies } from "./model/actions/fetchCompanies";
import { fetchCompaniesService } from "./model/services/fetchCompanies/fetchCompanies.service";
import {
  companiesActions,
  companiesReducer,
} from "./model/slice/companiesSlice";

export {
  CompaniesTable,
  fetchCompanies,
  fetchCompaniesService,
  companiesActions,
  companiesReducer,
};
export type { CompaniesSchema };
export * from "./model/selectors/companies.selectors";
