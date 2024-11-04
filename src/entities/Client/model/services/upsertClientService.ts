import { createAsyncThunk } from "@reduxjs/toolkit";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Client } from "../types/Client";
import { ThunkConfig } from "@/shared/lib/StoreProvider/config/store";
import { upsertClient } from "@/entities/Client";

export interface UpsertClientProps {
  client: Client;
}

export const upsertClientService = createAsyncThunk<
  ServerResponse<Client>,
  UpsertClientProps,
  ThunkConfig<string>
>("upsertClientService", async (props, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const response = await upsertClient(props.client);

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
      `Произошла неизвестная ошибка при обновлении клиента с id=${props.client.id}: ${JSON.stringify(e)}`,
    );
  }
});
