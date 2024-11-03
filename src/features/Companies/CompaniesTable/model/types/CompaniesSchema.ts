import { EntityState } from "@reduxjs/toolkit";
import { Company } from "@/entities/Company";

export interface CompaniesSchema extends EntityState<Company, string> {
  isLoading?: boolean;
  error?: string;
  // Pagination
  take: number;
  skip: number;
  search?: string;
  totalCount: number;
  hasMore: boolean;
  // Initialization
  _isInitialized: boolean;
}
