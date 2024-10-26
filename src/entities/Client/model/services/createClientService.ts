import { createAsyncThunk } from "@reduxjs/toolkit";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Client } from "../types/Client";
import { ThunkConfig } from "@/shared/lib/StoreProvider/config/store";
import { createClient } from "../actions/createClient";

export interface CreateClientProps {
  client: Client;
}

export const createClientService = createAsyncThunk<
  ServerResponse<Client>,
  CreateClientProps,
  ThunkConfig<string>
>("createClientService", async (props, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const response = await createClient(props.client);

    if (!response.isOk) {
      return rejectWithValue(
        response.errorMessages
          ? response.errorMessages.join("\n\n")
          : "Ошибка не содержит описания",
      );
    }

    return response;
  } catch (e) {
    return rejectWithValue(
      `Произошла неизвестная ошибка при создании клиента: ${JSON.stringify(e)}`,
    );
  }
});
