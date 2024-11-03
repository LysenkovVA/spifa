"use client";

import { Client, clientDetailsReducer } from "@/entities/Client";
import { Flex, TableProps, Tag, Typography } from "antd";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/StoreProvider";
import { memo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getClients,
  getClientsHasMore,
  getClientsIsInitialized,
  getClientsSkip,
  getClientsTake,
  getClientsTotalCount,
} from "@/features/Clients/ClientsTable/model/selectors/clients.selectors";
import { fetchClientsService } from "@/features/Clients/ClientsTable/model/services/fetchClients/fetchClientsService";
import { clientsActions } from "@/features/Clients/ClientsTable/model/slice/clientsSlice";
import { InfiniteTable } from "@/features/InfiniteTable";
import { useRouter } from "next/navigation";

const columns: TableProps<Client>["columns"] = [
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
    render: (text, fields) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
    render: (text, fields) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: "Телефон",
    dataIndex: "phone",
    key: "phone",
    render: (text, fields) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: "Пользователи",
    dataIndex: "usersCount",
    key: "usersCount",
    render: (text, fields) => (
      <Flex vertical gap={4}>
        <Tag
          color={"orange"}
        >{`Администраторов: ${fields.users?.filter((user) => user.clientUserRole === "ADMINISTRATOR").length ?? 0}`}</Tag>
        <Tag
          color={"green"}
        >{`Сотрудников: ${fields.users?.filter((user) => user.clientUserRole === "EMPLOYEE").length ?? 0}`}</Tag>
      </Flex>
    ),
  },
];

const reducers: ReducersList = {
  clientDetails: clientDetailsReducer,
};

export interface ClientsInfiniteTableProps {
  height: string | number | undefined;
}

const ClientsTable = memo((props: ClientsInfiniteTableProps) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const clientsData = useSelector(getClients.selectAll);
  const hasMore = useSelector(getClientsHasMore);
  const take = useSelector(getClientsTake);
  const skip = useSelector(getClientsSkip);
  const totalCount = useSelector(getClientsTotalCount);
  const isInitialized = useSelector(getClientsIsInitialized);

  // TODO Сделать useInitialEffect для отработки одного раза
  useEffect(() => {
    if (!isInitialized) {
      dispatch(fetchClientsService({ replaceData: true }));
    }
  }, []);

  const loadNextPart = useCallback(() => {
    if (hasMore) {
      dispatch(clientsActions.setSkip(skip + take));
      dispatch(fetchClientsService({ replaceData: false }));
    }
  }, [dispatch, hasMore, skip, take]);

  const onAddRecord = useCallback(() => {
    router.push("/clients/new");
  }, [router]);

  const onEditClick = useCallback(
    (client: Client) => {
      router.push(`/clients/${client.id}`);
    },
    [router],
  );

  return (
    <DynamicModuleLoader reducers={reducers}>
      <InfiniteTable<Client>
        style={{ width: "100%" }}
        title={"Клиенты"}
        columns={columns}
        data={clientsData}
        scrollHeight={props.height}
        dataLength={totalCount}
        hasMore={hasMore}
        loadNextPartCallback={loadNextPart}
        onAddRecord={onAddRecord}
        onRowClick={onEditClick}
      />
    </DynamicModuleLoader>
  );
});

export default ClientsTable;
