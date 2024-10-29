"use client";

import {
  Button,
  ButtonProps,
  Drawer,
  Flex,
  Form,
  notification,
  Space,
  Spin,
  Typography,
} from "antd";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  Company,
  companyDetailsReducer,
  CompanyForm,
  createCompanyService,
  fetchCompanyByIdService,
  getCompanyDetails,
  getCompanyDetailsIsLoading,
  updateCompanyService,
} from "@/entities/Company";
import { useAppDispatch } from "@/shared/lib/StoreProvider";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import useScreenWidth from "@/shared/hooks/useScreenWidth/useScreenWidth";
import { useSelector } from "react-redux";

const reducers: ReducersList = {
  companyDetails: companyDetailsReducer,
};

export interface EditCompanyButtonProps extends ButtonProps {
  title: string;
  icon: ReactNode;
  companyId?: string;
}

/**
 * Кнопка добавления новой компании
 * @param props
 * @constructor
 */
const EditCompanyButton = (props: EditCompanyButtonProps) => {
  const { title = "Кнопка", icon, companyId, ...restProps } = props;

  const [notificationApi, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();
  const screenWidth = useScreenWidth();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const initialValues = useSelector(getCompanyDetails);
  const isLoading = useSelector(getCompanyDetailsIsLoading);

  useEffect(() => {
    if (isEdit && companyId) {
      dispatch(fetchCompanyByIdService({ id: companyId }));
    }
    // else {
    //   dispatch(companyDetailsActions.clearAllData);
    // }
  }, [companyId, dispatch, isEdit]);

  const loadData = useCallback(() => {
    if (companyId) {
      dispatch(fetchCompanyByIdService({ id: companyId })).then((data) => {
        setIsEdit(true);
      });
    }
  }, [companyId, dispatch]);

  const onFinish = useCallback(
    async (values: Company) => {
      if (companyId) {
        const request = await dispatch(
          updateCompanyService({ company: { ...values, id: companyId } }),
        ).unwrap();
        if (request.isOk) {
          setIsEdit(false);
          notificationApi.success({
            message: `Данные компании "${request.data.name}" обновлены!`,
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
          createCompanyService({ company: values }),
        ).unwrap();
        if (request.isOk) {
          setIsEdit(false);
          notificationApi.success({
            message: `Компания "${request.data.name}" создана!`,
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
    [companyId, dispatch, notificationApi],
  );

  const drawerTitleContent = (
    <Flex align={"center"} justify={"space-between"}>
      <Typography.Text type={"secondary"} style={{ fontSize: 16 }}>
        {initialValues?.name ?? "Компания"}
      </Typography.Text>
      <Space size={"small"}>
        <Button
          icon={<SaveOutlined />}
          type={"primary"}
          onClick={() => form.submit()}
        >
          {screenWidth.xl || screenWidth.lg || screenWidth.md
            ? "Сохранить"
            : ""}
        </Button>
        <Button
          icon={<CloseOutlined />}
          type={"primary"}
          danger
          onClick={() => setIsEdit(false)}
        >
          {screenWidth.xl || screenWidth.lg || screenWidth.md ? "Отмена" : ""}
        </Button>
      </Space>
    </Flex>
  );

  return (
    <>
      {contextHolder}
      <Button
        icon={icon}
        type={"default"}
        onClick={() => {
          setIsEdit(true);
          // loadData();
        }}
        {...restProps}
      >
        {screenWidth.xl || screenWidth.lg || screenWidth.md ? title : ""}
      </Button>
      {isEdit && (
        <DynamicModuleLoader reducers={reducers}>
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
              <CompanyForm
                form={form}
                initialValues={initialValues}
                onFinish={onFinish}
              />
            </Spin>
          </Drawer>
        </DynamicModuleLoader>
      )}
    </>
  );
};

export default EditCompanyButton;
