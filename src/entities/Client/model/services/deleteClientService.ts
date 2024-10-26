import { createAsyncThunk } from "@reduxjs/toolkit";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Client } from "../types/Client";
import { ThunkConfig } from "@/shared/lib/StoreProvider/config/store";
import { deleteClient } from "../actions/deleteClient";

export interface DeleteClientServiceProps {
  clientId: string;
}

export const deleteClientService = createAsyncThunk<
  ServerResponse<Client>,
  DeleteClientServiceProps,
  ThunkConfig<string>
>("deleteClientService", async (props, thunkApi) => {
  const { rejectWithValue, dispatch } = thunkApi;

  try {
    const response = await deleteClient(props.clientId);

    if (!response.isOk) {
      return rejectWithValue(
        response.errorMessages
          ? response.errorMessages.join(", ")
          : "Ошибка не содержит описания",
      );
    }

    return response;
  } catch (e) {
    return rejectWithValue(
      `Произошла неизвестная ошибка при удалении клиента c id=${props.clientId}: ${JSON.stringify(e)}`,
    );
  }
});
