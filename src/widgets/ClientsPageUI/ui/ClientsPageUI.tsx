"use client";

import {
  clientsReducer,
  ClientsTable,
  fetchClientsService,
  getClients,
  getClientsIsInitialized,
  getClientsIsLoading,
} from "@/features/Clients/ClientsTable";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch, useAppSelector } from "@/shared/lib/StoreProvider";
import { useEffect } from "react";
import { Spin } from "antd";

const reducers: ReducersList = {
  clients: clientsReducer,
};

const ClientsPageUI = () => {
  const dispatch = useAppDispatch();
  const clients = useAppSelector(getClients.selectAll);
  const isInitialized = useAppSelector(getClientsIsInitialized);
  const isLoading = useAppSelector(getClientsIsLoading);

  useEffect(() => {
    if (!isInitialized && !isLoading) {
      dispatch(fetchClientsService({ replaceData: true }));
    }
  }, [dispatch, isInitialized, isLoading]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Spin spinning={isLoading}>
        <ClientsTable data={clients} />
      </Spin>
    </DynamicModuleLoader>
  );
};

export default ClientsPageUI;
