import { createAsyncThunk } from "@reduxjs/toolkit";

import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Company } from "../types/Company";
import { ThunkConfig } from "@/shared/lib/StoreProvider/config/store";
import { fetchCompanyById } from "../actions/fetchCompanyById";

export interface FetchCompanyByIdProps {
  id: string;
}

export const fetchCompanyByIdService = createAsyncThunk<
  ServerResponse<Company>,
  FetchCompanyByIdProps,
  ThunkConfig<string>
>("fetchCompanyByIdService", async (props, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const response = await fetchCompanyById(props.id);

    if (!response.isOk) {
      return rejectWithValue(
        response.errorMessages
          ? response.errorMessages.join(", ")
          : "Ошибка не содержит описания",
      );
    }

    return response;
  } catch (e) {
    return rejectWithValue(`Ошибка при получении компании с id=${props.id}`);
  }
});
