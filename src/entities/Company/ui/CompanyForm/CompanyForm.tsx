"use client";

import { Form, FormInstance, Input } from "antd";
import { Company } from "@/entities/Company";
import { useEffect } from "react";
import { ValidateErrorEntity } from "rc-field-form/es/interface";

export interface CompanyFormProps {
  form?: FormInstance;
  initialValues?: Company;
  onFinish?: (company: Company) => void;
  onFinishFailed?:
    | ((errorInfo: ValidateErrorEntity<Company>) => void)
    | undefined;
  onValuesChange?: (values: Company) => void;
}

const CompanyForm = (props: CompanyFormProps) => {
  const { form, initialValues, onFinish, onFinishFailed, onValuesChange } =
    props;

  useEffect(() => {
    form?.setFieldsValue(initialValues);
  }, [form, initialValues]);

  return (
    <Form
      id={"companyForm"}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={() => onValuesChange?.(form?.getFieldsValue())}
    >
      <Form.Item
        name={"name"}
        label={"Название"}
        rules={[{ required: true, message: "Не указано название" }]}
      >
        <Input.TextArea rows={3} placeholder={"Укажите название"} />
      </Form.Item>
      <Form.Item
        name={"inn"}
        label={"ИНН"}
        rules={[{ required: true, message: "Не указан ИНН" }]}
      >
        <Input placeholder={"Укажите ИНН"} />
      </Form.Item>
    </Form>
  );
};

export default CompanyForm;
