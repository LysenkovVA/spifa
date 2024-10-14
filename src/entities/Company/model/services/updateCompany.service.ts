import { createAsyncThunk } from "@reduxjs/toolkit";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Company } from "../types/Company";
import { ThunkConfig } from "@/shared/lib/StoreProvider/config/store";
import { updateCompany } from "../actions/updateCompany.action";

export interface UpdateCompanyProps {
  company: Company;
}

export const updateCompanyService = createAsyncThunk<
  ServerResponse<Company>,
  UpdateCompanyProps,
  ThunkConfig<string>
>("updateCompanyService", async (props, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const response = await updateCompany(props.company);

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
