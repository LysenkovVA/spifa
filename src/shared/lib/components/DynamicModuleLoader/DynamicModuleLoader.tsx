import { ReactNode, useEffect } from "react";
import { useStore } from "react-redux";
import { Reducer } from "@reduxjs/toolkit";
import {
  StateSchema,
  StateSchemaKey,
} from "@/shared/lib/StoreProvider/config/StateSchema";
import { AppStore } from "@/shared/lib/StoreProvider/config/store";
import { useAppDispatch } from "@/shared/lib/StoreProvider";

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicModuleLoaderProps {
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
  children: ReactNode;
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
  const { children, reducers, removeAfterUnmount = true } = props;

  const store = useStore() as AppStore;
  const dispatch = useAppDispatch();

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted =
        store.reducerManager.getReducerMap()[name as unknown as StateSchemaKey];
      // Добавляем новый редюсер только если его нет
      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer);
        dispatch({ type: `@INIT ${name} reducer` });
      }
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name, reducer]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  );
};
