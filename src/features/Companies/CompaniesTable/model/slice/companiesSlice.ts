import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompaniesSchema } from "../types/CompaniesSchema";
import { fetchCompaniesService } from "@/features/Companies/CompaniesTable";
import { companiesAdapter } from "@/features/Companies/CompaniesTable/model/adapter/companiesAdapter";
import {
  createCompanyService,
  deleteCompanyService,
  updateCompanyService,
} from "@/entities/Company";

const initialState: CompaniesSchema = {
  ids: [],
  entities: {},
  isLoading: false,
  error: undefined,
  take: 10,
  skip: 0,
  search: "",
  totalCount: 0,
  _isInitialized: false,
};

export const companiesSlice = createSlice({
  name: "companiesListSlice",
  initialState,
  reducers: {
    setSkip: (state, action: PayloadAction<number>) => {
      state.skip = action.payload;
      state._isInitialized = false;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.skip = 0;
      state._isInitialized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompaniesService.pending, (state, action) => {
        state.isLoading = true;
        state.error = undefined;
        state.totalCount = 0;

        // Если данные заменяются
        if (action.meta.arg.replaceData) {
          // Очищаем старые
          companiesAdapter.removeAll(state);
        }
      })
      .addCase(fetchCompaniesService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;

        // Если данные заменяются
        if (action.meta.arg.replaceData) {
          // Записываем новые данные
          companiesAdapter.setAll(state, action.payload.data);
        } else {
          // Добавляем порцию данных
          companiesAdapter.addMany(state, action.payload.data);
        }

        state.totalCount = action.payload.pagination?.total;
        state._isInitialized = true;
      })
      .addCase(fetchCompaniesService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.totalCount = 0;

        // Если данные заменяются
        if (action.meta.arg.replaceData) {
          // Очищаем старые
          companiesAdapter.removeAll(state);
        }

        // notification.error({
        //   message: action.payload,
        //   closable: false,
        //   placement: "top",
        //   duration: 5,
        // });
      })
      // Добавление компании
      .addCase(createCompanyService.fulfilled, (state, action) => {
        companiesAdapter.upsertOne(state, action.payload.data);
        if (state.totalCount) {
          state.totalCount = state.ids.length;
        } else {
          state.totalCount = 1;
        }

        // notification.success({
        //   message: `Компания "${action.payload.data.name}" создана!`,
        //   closable: false,
        //   placement: "top",
        //   duration: 3,
        // });
      })
      .addCase(createCompanyService.rejected, (state, action) => {
        // notification.error({
        //   message: action.payload,
        //   closable: false,
        //   placement: "top",
        //   duration: 5,
        // });
      })
      // Обновление данных компании
      .addCase(updateCompanyService.fulfilled, (state, action) => {
        companiesAdapter.upsertOne(state, action.payload.data);
        if (state.totalCount) {
          state.totalCount = state.ids.length;
        } else {
          state.totalCount = 1;
        }

        // notification.success({
        //   message: `Данные компании "${action.payload.data.name}" обновлены!`,
        //   closable: false,
        //   placement: "top",
        //   duration: 3,
        // });
      })
      .addCase(updateCompanyService.rejected, (state, action) => {
        // notification.error({
        //   message: action.payload,
        //   closable: false,
        //   placement: "top",
        //   duration: 5,
        // });
      })
      // Удаление компании
      .addCase(deleteCompanyService.fulfilled, (state, action) => {
        companiesAdapter.removeOne(state, action.payload.data.id);
        if (state.totalCount) {
          state.totalCount = state.ids.length;
        } else {
          state.totalCount = 0;
        }
        // notification.success({
        //   message: `Компания "${action.payload.data.name}" удалена!`,
        //   closable: false,
        //   placement: "top",
        //   duration: 3,
        // });
      });
  },
});

export const { actions: companiesActions, reducer: companiesReducer } =
  companiesSlice;
