"use client";

import { User } from "@/entities/User";
import { Form, FormInstance, Input } from "antd";
import { useEffect } from "react";
import { customizeRequiredMark } from "@/shared/lib/components/customizeRequiredMark";

export interface ProfileFormProps {
  form?: FormInstance;
  initialValues?: User;
  onFinish?: (values: User) => void;
}

const ProfileForm = (props: ProfileFormProps) => {
  const { form, initialValues, onFinish } = props;

  useEffect(() => {
    form?.setFieldsValue(initialValues);
  }, [form, initialValues]);

  return (
    <Form
      id={"profileForm"}
      layout={"vertical"}
      form={form}
      colon={false}
      requiredMark={customizeRequiredMark}
      onFinish={(values) => onFinish?.(values)}
      onValuesChange={(changedValues, values) =>
        console.log(JSON.stringify(form?.getFieldsValue(), null, 2))
      }
      style={{ padding: 16 }}
      clearOnDestroy={true}
    >
      <Form.Item label={"Фамилия"} name={["surname"]}>
        <Input placeholder={"Укажите фамилию"} />
      </Form.Item>
      <Form.Item label={"Имя"} name={["name"]}>
        <Input placeholder={"Укажите имя"} />
      </Form.Item>
      <Form.Item label={"Отчество"} name={["patronymic"]}>
        <Input placeholder={"Укажите отчество"} />
      </Form.Item>
      <Form.Item label={"E-mail"} name={["email"]}>
        <Input placeholder={"Укажите e-mail"} />
      </Form.Item>
      <Form.Item label={"Телефон"} name={["phone"]}>
        <Input placeholder={"Укажите телефон"} />
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
