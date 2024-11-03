"use client";

import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  Company,
  companyDetailsReducer,
  fetchCompanyByIdService,
  getCompanyDetails,
  getCompanyDetailsIsInitialized,
  getCompanyDetailsIsLoading,
  upsertCompanyService,
} from "@/entities/Company";
import CompanyForm from "@/entities/Company/ui/CompanyForm/CompanyForm";
import { useAppDispatch } from "@/shared/lib/StoreProvider";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { Button, Card, Flex, Form, notification, Spin, Typography } from "antd";
import { useRouter } from "next/navigation";
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";

const reducers: ReducersList = {
  companyDetails: companyDetailsReducer,
};

export interface CompanyDetailsWidgetProps {
  id?: string;
}

const CompanyDetailsWidget = (props: CompanyDetailsWidgetProps) => {
  const [notificationApi, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const initialValues = useSelector(getCompanyDetails);
  const isLoading = useSelector(getCompanyDetailsIsLoading);
  const isInitialized = useSelector(getCompanyDetailsIsInitialized);

  const router = useRouter();

  useEffect(() => {
    if (!isInitialized && props.id) {
      dispatch(fetchCompanyByIdService({ id: props.id }));
    }
  }, [dispatch, isInitialized, props.id]);

  const onFinish = useCallback(
    async (values: Company) => {
      try {
        const response = await dispatch(
          upsertCompanyService({
            company: {
              ...values,
              id: initialValues?.id ?? "",
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
            {initialValues?.name ?? "Новая компания"}
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
          <CompanyForm
            form={form}
            initialValues={initialValues}
            onFinish={onFinish}
          />
        </Card>
      </Spin>
    </DynamicModuleLoader>
  );
};

export default CompanyDetailsWidget;
