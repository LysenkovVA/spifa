import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/shared/lib/StoreProvider/config/store";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Client } from "@/entities/Client";
import { fetchClients } from "@/features/Clients/ClientsTable/model/actions/fetchClients";

export interface FetchClientsServiceProps {
  replaceData?: boolean;
}

export const fetchClientsService = createAsyncThunk<
  ServerResponse<Client[]>,
  FetchClientsServiceProps,
  ThunkConfig<string>
>("fetchClientsService", async (props, thunkApi) => {
  const { rejectWithValue, getState } = thunkApi;

  // БРАТЬ ЗНАЧЕНИЯ ИЗ СТЕЙТА НУЖНО ТОЛЬКО ТАК
  // useSelector будет выдавать ошибку
  const state = getState();

  const take = state.clients?.take;
  const skip = state.clients?.skip;

  try {
    // Отправляем запрос
    const response = await fetchClients(take, skip);

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
      `Произошла неизвестная ошибка при получении списка клиентов: ${JSON.stringify(e)}`,
    );
  }
});
