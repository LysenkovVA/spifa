import { Company } from "@/entities/Company";

export interface CompanyDetailsSchema {
  data?: Company;
  formData?: Company;
  isLoading: boolean;
  error?: string;
  _isInitialized: boolean;
}
