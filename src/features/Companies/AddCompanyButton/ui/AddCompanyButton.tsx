"use client";

import { Button, ButtonProps, Drawer } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react";
import { CompanyForm } from "@/entities/Company";

export interface AddCompanyButtonProps extends ButtonProps {}

/**
 * Кнопка добавления новой компании
 * @param props
 * @constructor
 */
const AddCompanyButton = (props: AddCompanyButtonProps) => {
  const { ...restProps } = props;

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const onFinish = useCallback(() => {
    // Сервис сохранения
  }, []);

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type={"primary"}
        onClick={() => setIsEdit(true)}
        {...restProps}
      >
        {"Добавить"}
      </Button>
      {/*// reducer*/}
      <Drawer
        open={isEdit}
        onClose={() => setIsEdit(false)}
        placement={"bottom"}
      >
        <CompanyForm onFinish={onFinish} />
      </Drawer>
    </>
  );
};

export default AddCompanyButton;
