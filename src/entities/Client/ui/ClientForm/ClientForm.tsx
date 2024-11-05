"use client";

import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Tabs,
  TabsProps,
  Typography,
} from "antd";
import {
  LockOutlined,
  MinusCircleOutlined,
  PlusCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Client } from "@/entities/Client";
import { ClientUserRole } from "@prisma/client";
import { useEffect, useState } from "react";
import { CompanySvg, UsersSvg } from "@/shared/assets";
import { customizeRequiredMark } from "@/shared/lib/components/customizeRequiredMark";

export interface ClientFormProps {
  form?: FormInstance;
  initialValues?: Client;
  onFinish?: (values: Client, usersToDeleteIds: Array<string>) => void;
}

const ClientForm = (props: ClientFormProps) => {
  const { form, initialValues, onFinish } = props;

  const [usersToDeleteIds, setUsersToDeleteIds] = useState<string[]>([]);

  useEffect(() => {
    form?.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const userProfileContent = (userIndex: number) => (
    <>
      <Row gutter={8} align={"middle"} justify={"start"}>
        <Col span={8}>
          <Form.Item label={"Фамилия"} name={[userIndex, "user", "surname"]}>
            <Input placeholder={"Укажите фамилию"} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={"Имя"} name={[userIndex, "user", "name"]}>
            <Input placeholder={"Укажите имя"} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={"Отчество"}
            name={[userIndex, "user", "patronymic"]}
          >
            <Input placeholder={"Укажите отчество"} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8} align={"middle"} justify={"start"}>
        <Col span={8}>
          <Form.Item label={"E-mail"} name={[userIndex, "user", "email"]}>
            <Input placeholder={"Укажите e-mail"} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={"Телефон"} name={[userIndex, "user", "phone"]}>
            <Input placeholder={"Укажите телефон"} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );

  const clientDetailsContent = (
    <>
      <Form.Item
        label={
          <Flex>
            <Typography.Text>{"Название"}</Typography.Text>
          </Flex>
        }
        name={["name"]}
        rules={[{ required: true, message: "Необходимо указать название" }]}
      >
        <Input style={{ width: "100%" }} placeholder={`Укажите название`} />
      </Form.Item>
      <Form.Item label={"Адрес"} name={["address"]}>
        <Input
          style={{ width: "100%" }}
          placeholder="Укажите адрес организации"
        />
      </Form.Item>
      <Form.Item label={"Телефон"} name={["phone"]}>
        <Input style={{ width: "100%" }} placeholder="Укажите телефон" />
      </Form.Item>
    </>
  );

  const usersContent = (
    <>
      <Form.List name={["users"]}>
        {(fields, { add, remove, move }) => (
          <>
            {fields.map(({ key, name: userIndex, ...restField }) => (
              <Flex
                align={"center"}
                justify={"center"}
                key={userIndex}
                gap={4}
                style={{
                  marginBottom: 8,
                  width: "100%",
                }}
              >
                <Flex align={"center"} justify={"center"} gap={4}>
                  <MinusCircleOutlined
                    style={{ color: "red" }}
                    onClick={() => {
                      // Получаем id удаляемой записи
                      const id = form?.getFieldValue([
                        "users",
                        userIndex,
                        "user",
                        "id",
                      ]);

                      // Если id есть, значит запись необходимо будет удалять из БД
                      if (id) {
                        setUsersToDeleteIds([...usersToDeleteIds, id]);
                      }
                      remove(userIndex);
                    }}
                  />
                </Flex>
                <Card style={{ width: "100%" }}>
                  <Row
                    gutter={8}
                    align={"middle"}
                    justify={"start"}
                    style={{ width: "100%" }}
                  >
                    <Col span={8}>
                      <Form.Item
                        // layout={"horizontal"}
                        label={"Логин"}
                        name={[userIndex, "user", "login"]}
                        rules={[
                          {
                            required: true,
                            message: "Необходимо указать логин",
                          },
                        ]}
                      >
                        <Input
                          prefix={<UserOutlined />}
                          placeholder={"Укажите логин"}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        // layout={"horizontal"}
                        label={"Пароль"}
                        name={[userIndex, "user", "password"]}
                        rules={[
                          {
                            required: true,
                            message: "Необходимо указать пароль",
                          },
                        ]}
                      >
                        <Input
                          prefix={<LockOutlined />}
                          disabled={
                            form?.getFieldValue([
                              "users",
                              userIndex,
                              "user",
                              "id",
                            ]) !== undefined
                          }
                          type={"password"}
                          placeholder={"Укажите пароль..."}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        //layout={"horizontal"}
                        label={"Роль"}
                        name={[userIndex, "clientUserRole"]}
                        rules={[
                          {
                            required: true,
                            message: "Необходимо указать роль",
                          },
                        ]}
                      >
                        <Select
                          placeholder={"Укажите роль..."}
                          options={[
                            {
                              label: "Администратор",
                              value: ClientUserRole.ADMINISTRATOR,
                            },
                            {
                              label: "Работник",
                              value: ClientUserRole.EMPLOYEE,
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  {userProfileContent(userIndex)}
                </Card>
              </Flex>
            ))}
            <Button
              type="dashed"
              onClick={() => {
                add();
              }}
              block
              icon={<PlusCircleFilled style={{ color: "green" }} />}
            >
              {"Добавить"}
            </Button>
          </>
        )}
      </Form.List>
    </>
  );

  const tabsContent: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <Flex align={"center"} gap={4}>
          <CompanySvg width={24} height={24} />
          <Typography.Text style={{ fontSize: 16 }} type={"secondary"}>
            {"Сведения о клиенте"}
          </Typography.Text>
        </Flex>
      ),
      children: clientDetailsContent,
    },
    {
      key: "2",
      label: (
        <Flex align={"center"} gap={4}>
          <UsersSvg width={24} height={24} />
          <Typography.Text style={{ fontSize: 16 }} type={"secondary"}>
            {"Пользователи"}
          </Typography.Text>
        </Flex>
      ),
      children: usersContent,
    },
  ];

  return (
    <Form
      id={"clientForm"}
      layout={"vertical"}
      form={form}
      colon={false}
      requiredMark={customizeRequiredMark}
      onFinish={(values) => onFinish?.(values, usersToDeleteIds)}
      onValuesChange={(changedValues, values) =>
        console.log(JSON.stringify(form?.getFieldsValue(), null, 2))
      }
      style={{ padding: 16 }}
      clearOnDestroy={true}
    >
      <Tabs items={tabsContent} />
    </Form>
  );
};

export default ClientForm;
