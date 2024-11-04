import { createAsyncThunk } from "@reduxjs/toolkit";

import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Company } from "../types/Company";
import { fetchCompanyById } from "../actions/fetchCompanyById";
import { Session } from "next-auth";

export interface FetchCompanyByIdProps {
  id: string;
}

export const fetchCompanyByIdService = createAsyncThunk<
  ServerResponse<Company>,
  FetchCompanyByIdProps,
  { rejectValue: string; extra: { session: Session | null | undefined } }
  // ThunkConfig<string>
>("fetchCompanyByIdService", async (props, thunkApi) => {
  const { rejectWithValue, extra } = thunkApi;

  try {
    const response = await fetchCompanyById(props.id);

    if (!response.isOk) {
      return rejectWithValue(
        response.errorMessages
          ? response.errorMessages.join(", ")
          : "Ошибка не содержит описания",
      );
    }

    return response;
  } catch (e) {
    return rejectWithValue(`Ошибка при получении компании с id=${props.id}`);
  }
});
