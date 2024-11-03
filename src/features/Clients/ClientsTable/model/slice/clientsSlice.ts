import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClientsSchema } from "../types/ClientsSchema";
import { fetchClientsService } from "@/features/Clients/ClientsTable";
import { deleteClientService, upsertClientService } from "@/entities/Client";
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
  hasMore: true,
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
      state.hasMore = true;
      state._isInitialized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientsService.pending, (state, action) => {
        state.isLoading = true;
        state.error = undefined;
        state.totalCount = 0;
        state.hasMore = true;

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

        state.totalCount = action.payload.pagination?.total ?? 0;
        state.hasMore = state.totalCount > state.skip + state.take;
        state._isInitialized = true;
      })
      .addCase(fetchClientsService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.hasMore = true;
        state.totalCount = 0;

        // Если данные заменяются
        if (action.meta.arg.replaceData) {
          // Очищаем старые
          clientsAdapter.removeAll(state);
        }
      })
      // Обновление данных клиента
      .addCase(upsertClientService.pending, (state, action) => {
        state.error = undefined;
      })
      .addCase(upsertClientService.fulfilled, (state, action) => {
        clientsAdapter.upsertOne(state, action.payload.data);
        if (state.totalCount) {
          state.totalCount = state.ids.length;
        } else {
          state.totalCount = 1;
        }
      })
      .addCase(upsertClientService.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Удаление клиента
      .addCase(deleteClientService.pending, (state, action) => {
        state.error = undefined;
      })
      .addCase(deleteClientService.fulfilled, (state, action) => {
        clientsAdapter.removeOne(state, action.payload.data.id);
        if (state.totalCount) {
          state.totalCount = state.ids.length;
        } else {
          state.totalCount = 0;
        }
      })
      .addCase(deleteClientService.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { actions: clientsActions, reducer: clientsReducer } =
  clientsSlice;
