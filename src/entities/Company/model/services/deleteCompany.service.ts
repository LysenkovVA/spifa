import { createAsyncThunk } from "@reduxjs/toolkit";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Company } from "../types/Company";
import { ThunkConfig } from "@/shared/lib/StoreProvider/config/store";
import { deleteCompany } from "../actions/deleteCompany.action";

export interface DeleteCompanyServiceProps {
  companyId: string;
}

export const deleteCompanyService = createAsyncThunk<
  ServerResponse<Company>,
  DeleteCompanyServiceProps,
  ThunkConfig<string>
>("deleteCompanyService", async (props, thunkApi) => {
  const { rejectWithValue, dispatch } = thunkApi;

  try {
    const response = await deleteCompany(props.companyId);

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
      `Произошла неизвестная ошибка при удалении документа c id=${props.companyId}: ${JSON.stringify(e)}`,
    );
  }
});
