import { Company } from "@/entities/Company";

export interface CompanySchema {
  data?: Company;
  formData?: Company;
  isLoading: boolean;
  error: string;
  _isInitialized: boolean;
}
