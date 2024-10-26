import { createAsyncThunk } from "@reduxjs/toolkit";

import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Client } from "../types/Client";
import { ThunkConfig } from "@/shared/lib/StoreProvider/config/store";
import { fetchClientById } from "../actions/fetchClientById";

export interface FetchClientByIdProps {
  id: string;
}

export const fetchClientByIdService = createAsyncThunk<
  ServerResponse<Client>,
  FetchClientByIdProps,
  ThunkConfig<string>
>("fetchClientByIdService", async (props, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const response = await fetchClientById(props.id);

    if (!response.isOk) {
      return rejectWithValue(
        response.errorMessages
          ? response.errorMessages.join(", ")
          : "Ошибка не содержит описания",
      );
    }

    return response;
  } catch (e) {
    return rejectWithValue(`Ошибка при получении клиента с id=${props.id}`);
  }
});
