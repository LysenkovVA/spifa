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
import { useAppDispatch } from "@/shared/lib/StoreProvider";
import { useEffect } from "react";
import { Spin } from "antd";
import { useSelector } from "react-redux";

const reducers: ReducersList = {
  clients: clientsReducer,
};

const ClientsPageUI = () => {
  const dispatch = useAppDispatch();
  const clients = useSelector(getClients.selectAll);
  const isInitialized = useSelector(getClientsIsInitialized);
  const isLoading = useSelector(getClientsIsLoading);

  useEffect(() => {
    if (!isInitialized && !isLoading) {
      dispatch(fetchClientsService({ replaceData: true }));
    }
  }, [dispatch, isInitialized, isLoading]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Spin spinning={isLoading}>
        <ClientsTable clients={clients} />
      </Spin>
    </DynamicModuleLoader>
  );
};

export default ClientsPageUI;
