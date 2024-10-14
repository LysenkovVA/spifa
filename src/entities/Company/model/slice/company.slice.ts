import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company } from "../types/Company";
import { CompanyDetailsSchema } from "../types/CompanyDetailsSchema";
import { fetchCompanyByIdService } from "../services/fetchCompanyById.service";

const initialState: CompanyDetailsSchema = {
  data: undefined,
  formData: undefined,
  isLoading: false,
  error: undefined,
  _isInitialized: false,
};

export const companySlice = createSlice({
  name: "companySlice",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Company>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    clearAllData: (state, action) => {
      state.data = undefined;
      state.formData = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyByIdService.pending, (state, action) => {
        state.isLoading = true;
        state.error = undefined;
        state._isInitialized = false;
      })
      .addCase(fetchCompanyByIdService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.data = action.payload.data;
        state.formData = action.payload.data;
        state._isInitialized = true;
      })
      .addCase(fetchCompanyByIdService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.data = undefined;
        state.formData = undefined;
      });
  },
});

export const {
  actions: companyDetailsActions,
  reducer: companyDetailsReducer,
} = companySlice;
