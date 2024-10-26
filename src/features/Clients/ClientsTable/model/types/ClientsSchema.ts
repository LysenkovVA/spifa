import { EntityState } from "@reduxjs/toolkit";
import { Client } from "@/entities/Client";

export interface ClientsSchema extends EntityState<Client, string> {
  isLoading?: boolean;
  error?: string;
  // Pagination
  take?: number;
  skip?: number;
  search?: string;
  totalCount?: number;
  // Initialization
  _isInitialized: boolean;
}
