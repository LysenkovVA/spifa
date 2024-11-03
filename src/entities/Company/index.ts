import { Company } from "./model/types/Company";
import { CompanyDetailsSchema } from "./model/types/CompanyDetailsSchema";
import CompanyForm from "./ui/CompanyForm/CompanyForm";
import { upsertCompany } from "./model/actions/upsertCompany";
import { deleteCompany } from "./model/actions/deleteCompany.action";
import { fetchCompanyById } from "./model/actions/fetchCompanyById";
import {
  companyDetailsActions,
  companyDetailsReducer,
} from "./model/slice/company.slice";
import { CompanyZSchema } from "./model/validation/CompanyZSchema";
import { DaDataCompanyResponse } from "./model/types/DaDataCompanyInterfaces";

export type { Company, CompanyDetailsSchema, DaDataCompanyResponse };
export { CompanyForm, deleteCompany, fetchCompanyById, upsertCompany };
export * from "./model/selectors/company.selectors";
export { deleteCompanyService } from "./model/services/deleteCompany.service";
export { fetchCompanyByIdService } from "./model/services/fetchCompanyById.service";
export { upsertCompanyService } from "./model/services/upsertCompanyService";
export { companyDetailsActions, companyDetailsReducer };
export { CompanyZSchema };
