"use client";

import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  Client,
  clientDetailsReducer,
  fetchClientByIdService,
  getClientDetails,
  getClientDetailsIsInitialized,
  getClientDetailsIsLoading,
  upsertClientService,
} from "@/entities/Client";
import ClientForm from "@/entities/Client/ui/ClientForm/ClientForm";
import { useAppDispatch } from "@/shared/lib/StoreProvider";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { Button, Card, Flex, Form, notification, Spin, Typography } from "antd";
import { useRouter } from "next/navigation";
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";

const reducers: ReducersList = {
  clientDetails: clientDetailsReducer,
};

export interface ClientDetailsWidgetProps {
  id?: string;
}

const ClientDetailsWidget = (props: ClientDetailsWidgetProps) => {
  const [notificationApi, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const initialValues = useSelector(getClientDetails);
  const isLoading = useSelector(getClientDetailsIsLoading);
  const isInitialized = useSelector(getClientDetailsIsInitialized);

  const router = useRouter();

  useEffect(() => {
    if (!isInitialized && props.id) {
      dispatch(fetchClientByIdService({ id: props.id }));
    }
  }, [dispatch, isInitialized, props.id]);

  const onFinish = useCallback(
    async (values: Client, usersToDeleteIds: Array<string>) => {
      try {
        const response = await dispatch(
          upsertClientService({
            client: {
              ...values,
              id: initialValues?.id ?? "",
              usersToDeleteIds,
            },
          }),
        ).unwrap();

        if (response.isOk) {
          notificationApi.success({
            message: `Данные сохранены!`,
            closable: false,
            placement: "top",
            duration: 3,
          });
          router.back();
        } else {
          notificationApi.error({
            message: JSON.stringify(response.errorMessages),
            closable: false,
            placement: "top",
            duration: 5,
          });
        }
      } catch (error) {
        notificationApi.error({
          message: JSON.stringify(error),
          closable: false,
          placement: "top",
          duration: 5,
        });
      }
    },
    [dispatch, initialValues?.id, notificationApi, router],
  );

  const cardTitle = useCallback(
    () => (
      <Flex align={"center"} justify={"space-between"}>
        <Flex align={"center"} justify={"start"} gap={8}>
          <Button icon={<LeftOutlined />} onClick={() => router.back()} />
          <Typography.Text type={"secondary"} style={{ fontSize: 16 }}>
            {initialValues?.name ?? "Новый клиент"}
          </Typography.Text>
        </Flex>
        <Button
          type={"primary"}
          icon={<SaveOutlined />}
          onClick={() => form.submit()}
        >
          {"Сохранить"}
        </Button>
      </Flex>
    ),
    [form, initialValues?.name, router],
  );

  return (
    <DynamicModuleLoader reducers={reducers}>
      {contextHolder}
      <Spin spinning={isLoading} tip={"Загрузка..."}>
        <Card
          title={cardTitle()}
          styles={{
            body: { height: "calc(100vh - 140px - 74px)", overflowY: "auto" },
          }}
        >
          <ClientForm
            form={form}
            initialValues={initialValues}
            onFinish={onFinish}
          />
        </Card>
      </Spin>
    </DynamicModuleLoader>
  );
};

export default ClientDetailsWidget;
