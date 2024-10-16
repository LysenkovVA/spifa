"use client";

import {
  Button,
  ButtonProps,
  Drawer,
  Flex,
  Form,
  Space,
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
  updateCompanyService,
} from "@/entities/Company";
import { useAppDispatch } from "@/shared/lib/StoreProvider";
import { useSelector } from "react-redux";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import useScreenWidth from "@/shared/hooks/useScreenWidth/useScreenWidth";

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

  const [form] = Form.useForm();
  const screenWidth = useScreenWidth();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const initialValues = useSelector(getCompanyDetails);

  useEffect(() => {
    if (isEdit && companyId) {
      dispatch(fetchCompanyByIdService({ id: companyId }));
    }
  }, [companyId, dispatch, isEdit]);

  const onFinish = useCallback(
    async (values: Company) => {
      if (companyId) {
        const request = await dispatch(
          updateCompanyService({ company: { ...values, id: companyId } }),
        ).unwrap();
        if (request.isOk) {
          setIsEdit(false);
        }
      } else {
        const request = await dispatch(
          createCompanyService({ company: values }),
        ).unwrap();
        if (request.isOk) {
          setIsEdit(false);
        }
      }
    },
    [companyId, dispatch],
  );

  const drawerTitleContent = (
    <Flex align={"center"} justify={"space-between"}>
      <Typography.Text type={"secondary"} style={{ fontSize: 16 }}>
        {initialValues?.name}
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
      <Button
        icon={icon}
        type={"default"}
        onClick={() => setIsEdit(true)}
        {...restProps}
      >
        {screenWidth.xl || screenWidth.lg || screenWidth.md ? title : ""}
      </Button>
      {isEdit && (
        <DynamicModuleLoader reducers={reducers}>
          <Drawer
            open={isEdit}
            closable={false}
            onClose={() => setIsEdit(false)}
            placement={"bottom"}
            title={drawerTitleContent}
            destroyOnClose
          >
            <CompanyForm
              form={form}
              initialValues={initialValues}
              onFinish={onFinish}
            />
          </Drawer>
        </DynamicModuleLoader>
      )}
    </>
  );
};

export default EditCompanyButton;
