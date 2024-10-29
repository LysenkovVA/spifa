import { Client } from "@/entities/Client";

export interface ClientDetailsSchema {
  data?: Client;
  formData?: Client;
  isLoading: boolean;
  error?: string;
  _isInitialized: boolean;
}
