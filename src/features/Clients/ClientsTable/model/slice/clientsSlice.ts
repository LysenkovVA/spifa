import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClientsSchema } from "../types/ClientsSchema";
import { fetchClientsService } from "@/features/Clients/ClientsTable";
import {
  createClientService,
  deleteClientService,
  updateClientService,
} from "@/entities/Client";
import { clientsAdapter } from "../adapter/clientsAdapter";

const initialState: ClientsSchema = {
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

export const clientsSlice = createSlice({
  name: "clientsListSlice",
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
      .addCase(fetchClientsService.pending, (state, action) => {
        state.isLoading = true;
        state.error = undefined;
        state.totalCount = 0;

        // Если данные заменяются
        if (action.meta.arg.replaceData) {
          // Очищаем старые
          clientsAdapter.removeAll(state);
        }
      })
      .addCase(fetchClientsService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;

        // Если данные заменяются
        if (action.meta.arg.replaceData) {
          // Записываем новые данные
          clientsAdapter.setAll(state, action.payload.data);
        } else {
          // Добавляем порцию данных
          clientsAdapter.addMany(state, action.payload.data);
        }

        state.totalCount = action.payload.pagination?.total;
        state._isInitialized = true;
      })
      .addCase(fetchClientsService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.totalCount = 0;

        // Если данные заменяются
        if (action.meta.arg.replaceData) {
          // Очищаем старые
          clientsAdapter.removeAll(state);
        }
      })
      // Добавление компании
      .addCase(createClientService.fulfilled, (state, action) => {
        clientsAdapter.upsertOne(state, action.payload.data);
        if (state.totalCount) {
          state.totalCount = state.ids.length;
        } else {
          state.totalCount = 1;
        }
      })
      .addCase(createClientService.rejected, (state, action) => {})
      // Обновление данных компании
      .addCase(updateClientService.fulfilled, (state, action) => {
        clientsAdapter.upsertOne(state, action.payload.data);
        if (state.totalCount) {
          state.totalCount = state.ids.length;
        } else {
          state.totalCount = 1;
        }
      })
      .addCase(updateClientService.rejected, (state, action) => {})
      // Удаление компании
      .addCase(deleteClientService.fulfilled, (state, action) => {
        clientsAdapter.removeOne(state, action.payload.data.id);
        if (state.totalCount) {
          state.totalCount = state.ids.length;
        } else {
          state.totalCount = 0;
        }
      });
  },
});

export const { actions: clientsActions, reducer: clientsReducer } =
  clientsSlice;
