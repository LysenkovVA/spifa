import { Company } from "./model/types/Company";
import { CompanyDetailsSchema } from "./model/types/CompanyDetailsSchema";
import CompanyForm from "./ui/CompanyForm/CompanyForm";
import { createCompany } from "./model/actions/createCompany.action";
import { deleteCompany } from "./model/actions/deleteCompany.action";
import { fetchCompanyById } from "./model/actions/fetchCompanyById";
import { updateCompany } from "./model/actions/updateCompany.action";
import {
  companyDetailsActions,
  companyDetailsReducer,
} from "./model/slice/company.slice";
import { CompanyZSchema } from "./model/validation/CompanyZSchema";

export type { Company, CompanyDetailsSchema };
export {
  CompanyForm,
  createCompany,
  deleteCompany,
  fetchCompanyById,
  updateCompany,
};
export * from "./model/selectors/company.selectors";
export { createCompanyService } from "./model/services/createCompany.service";
export { deleteCompanyService } from "./model/services/deleteCompany.service";
export { fetchCompanyByIdService } from "./model/services/fetchCompanyById.service";
export { updateCompanyService } from "./model/services/updateCompany.service";
export { companyDetailsActions, companyDetailsReducer };
export { CompanyZSchema };
