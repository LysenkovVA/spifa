import { createAsyncThunk } from "@reduxjs/toolkit";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Company } from "../types/Company";
import { ThunkConfig } from "@/shared/lib/StoreProvider/config/store";
import { createCompany } from "../actions/createCompany.action";

export interface CreateCompanyProps {
  company: Company;
}

export const createCompanyService = createAsyncThunk<
  ServerResponse<Company>,
  CreateCompanyProps,
  ThunkConfig<string>
>("createCompanyService", async (props, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const response = await createCompany(props.company);

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
      `Произошла неизвестная ошибка при создании компании: ${JSON.stringify(e)}`,
    );
  }
});
