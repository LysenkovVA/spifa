import { CompanyType } from "@prisma/client";
import { Status } from "@/entities/Company/model/types/DaDataCompanyInterfaces";

export interface Company {
  id: string;
  name?: string;
  companyType?: CompanyType;
  management?: string;
  fio?: string;
  opf?: string;
  phone?: string;
  address?: string;
  status?: Status;
  inn?: string;
  kpp?: string;
  ogrn?: string;
  ogrnDate?: Date;
  okato?: string;
  okpo?: string;
  okfs?: string;
  oktmo?: string;
  okogu?: string;
  okved?: string;
  actualityDate?: Date;
  registrationDate?: Date;
  liquidationDate?: Date;
}
