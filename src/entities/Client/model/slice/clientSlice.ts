import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "../types/Client";
import { ClientDetailsSchema } from "../types/ClientDetailsSchema";
import { fetchClientByIdService } from "../services/fetchClientByIdService";

const initialState: ClientDetailsSchema = {
  data: undefined,
  formData: undefined,
  isLoading: false,
  error: undefined,
  _isInitialized: false,
};

export const clientSlice = createSlice({
  name: "clientSlice",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Client>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    clearAllData: (state, action) => {
      state.data = undefined;
      state.formData = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientByIdService.pending, (state, action) => {
        state.isLoading = true;
        state.error = undefined;
        state._isInitialized = false;
      })
      .addCase(fetchClientByIdService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.data = action.payload.data;
        state.formData = action.payload.data;
        state._isInitialized = true;
      })
      .addCase(fetchClientByIdService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.data = undefined;
        state.formData = undefined;
      });
  },
});

export const { actions: clientDetailsActions, reducer: clientDetailsReducer } =
  clientSlice;
