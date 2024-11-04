"use client";
import { configureStore, Reducer } from "@reduxjs/toolkit";
import { createReducerManager, TStore } from "./ReducerManager";
import { StateSchema } from "./StateSchema";
import { companiesReducer } from "@/features/Companies/CompaniesTable";
import { clientsReducer } from "@/features/Clients/ClientsTable";
import { Session } from "next-auth";

export interface ThunkExtraArg {
  session: Session | null;
}

export interface ThunkConfig<T> {
  // Переопределяем стандартные типы конфига
  rejectValue: T;
  state: RootState;
  extra: ThunkExtraArg;
  dispatch: AppDispatch;
}

export const makeStore = (session: Session | null) => {
  // Чтобы не было ошибки при загрузке приложения, о том что не иницилизирован Store,
  // нужно добавить редюсеры
  // Также уходит warning по селекторам
  const reducerManager = createReducerManager({
    companies: companiesReducer,
    clients: clientsReducer,
  });

  const extraArg: ThunkExtraArg = {
    session: session,
  };

  const store = configureStore({
    // работало с as Reducer<StateSchema>
    reducer: reducerManager.reduce as Reducer<StateSchema>,
    devTools: process.env.NODE_ENV === "development",
    preloadedState: {} as StateSchema,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Чтобы даты на форме не выдавали ошибок в консоль
        thunk: { extraArgument: extraArg },
      }),
  }) as TStore;

  // Optional: Put the reducer manager on the store so it is easily accessible
  store.reducerManager = reducerManager;

  return store;
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
