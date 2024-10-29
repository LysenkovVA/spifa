"use client";

import { useCallback, useState } from "react";
import {
  Button,
  Drawer,
  Flex,
  Form,
  notification,
  Space,
  Spin,
  TableProps,
  Typography,
} from "antd";
import {
  Client,
  clientDetailsReducer,
  createClientService,
  deleteClientService,
  fetchClientByIdService,
  getClientDetails,
  getClientDetailsIsLoading,
  updateClientService,
} from "@/entities/Client";
import { AppTable } from "@/shared/UI/AppTable";
import { useAppDispatch } from "@/shared/lib/StoreProvider";
import { useSelector } from "react-redux";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import ClientForm from "@/entities/Client/ui/ClientForm/ClientForm";

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
];

const reducers: ReducersList = {
  clientDetails: clientDetailsReducer,
};

export interface ClientsTableProps {
  clients?: Client[];
}

const ClientsTable = (props: ClientsTableProps) => {
  const [notificationApi, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const initialValues = useSelector(getClientDetails);
  const isLoading = useSelector(getClientDetailsIsLoading);

  const onAddClick = useCallback(() => {
    setIsEdit(true);
  }, []);

  const onEditClick = useCallback(
    (id: string) => {
      dispatch(fetchClientByIdService({ id }));
      setIsEdit(true);
    },
    [dispatch],
  );

  const onDeleteClick = useCallback(
    (id: string) => {
      dispatch(deleteClientService({ clientId: id }));
    },
    [dispatch],
  );

  const onFinish = useCallback(
    async (values: Client) => {
      if (initialValues?.id) {
        const request = await dispatch(
          updateClientService({ client: { ...values, id: initialValues?.id } }),
        ).unwrap();
        if (request.isOk) {
          setIsEdit(false);
          notificationApi.success({
            message: `Данные клиента "${request.data.name}" обновлены!`,
            closable: false,
            placement: "top",
            duration: 3,
          });
        } else {
          notificationApi.error({
            message: request.errorMessages,
            closable: false,
            placement: "top",
            duration: 5,
          });
        }
      } else {
        const request = await dispatch(
          createClientService({ client: values }),
        ).unwrap();
        if (request.isOk) {
          setIsEdit(false);
          notificationApi.success({
            message: `Клиент "${request.data.name}" создан!`,
            closable: false,
            placement: "top",
            duration: 3,
          });
        } else {
          notificationApi.error({
            message: request.errorMessages,
            closable: false,
            placement: "top",
            duration: 5,
          });
        }
      }
    },
    [dispatch, initialValues?.id, notificationApi],
  );

  const drawerTitleContent = (
    <Flex align={"center"} justify={"space-between"}>
      <Typography.Text type={"secondary"} style={{ fontSize: 16 }}>
        {initialValues?.name ?? "Клиент"}
      </Typography.Text>
      <Space size={"small"}>
        <Button
          icon={<SaveOutlined />}
          type={"primary"}
          onClick={() => form.submit()}
        >
          {"Сохранить"}
        </Button>
        <Button
          icon={<CloseOutlined />}
          type={"primary"}
          danger
          onClick={() => setIsEdit(false)}
        >
          {"Отмена"}
        </Button>
      </Space>
    </Flex>
  );

  return (
    <>
      {contextHolder}
      <AppTable<Client>
        data={props.clients}
        columns={columns}
        onAddClick={onAddClick}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />
      {isEdit && (
        <Drawer
          styles={{ wrapper: { height: "90%" } }}
          open={isEdit}
          closable={false}
          onClose={() => setIsEdit(false)}
          placement={"bottom"}
          title={drawerTitleContent}
          destroyOnClose
        >
          <Spin spinning={isLoading}>
            <DynamicModuleLoader reducers={reducers}>
              <ClientForm
                form={form}
                initialValues={initialValues}
                onFinish={onFinish}
              />
            </DynamicModuleLoader>
          </Spin>
        </Drawer>
      )}
    </>
  );
};

export default ClientsTable;
