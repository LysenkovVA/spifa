import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/shared/lib/StoreProvider/config/store";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Company } from "@/entities/Company";
import { fetchCompanies } from "@/features/Companies/CompaniesTable/model/actions/fetchCompanies";

export interface FetchCompaniesServiceProps {
  replaceData?: boolean;
}

export const fetchCompaniesService = createAsyncThunk<
  ServerResponse<Company[]>,
  FetchCompaniesServiceProps,
  ThunkConfig<string>
>("fetchCompaniesService", async (props, thunkApi) => {
  const { rejectWithValue, getState } = thunkApi;

  // БРАТЬ ЗНАЧЕНИЯ ИЗ СТЕЙТА НУЖНО ТОЛЬКО ТАК
  // useSelector будет выдавать ошибку
  const state = getState();

  const take = state.companies?.take;
  const skip = state.companies?.skip;

  try {
    // Отправляем запрос
    const response = await fetchCompanies(take, skip);

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
      `Произошла неизвестная ошибка при получении списка компаний: ${JSON.stringify(e)}`,
    );
  }
});
