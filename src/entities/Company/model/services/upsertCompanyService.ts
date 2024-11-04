import { createAsyncThunk } from "@reduxjs/toolkit";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Company } from "../types/Company";
import { ThunkConfig } from "@/shared/lib/StoreProvider/config/store";
import { upsertCompany } from "@/entities/Company";

export interface UpsertCompanyProps {
  company: Company;
}

export const upsertCompanyService = createAsyncThunk<
  ServerResponse<Company>,
  UpsertCompanyProps,
  ThunkConfig<string>
>("upsertCompanyService", async (props, thunkApi) => {
  const { rejectWithValue, extra } = thunkApi;

  try {
    const response = await upsertCompany(props.company);

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
      `Произошла неизвестная ошибка при обновлении компании с id=${props.company.id}: ${JSON.stringify(e)}`,
    );
  }
});
