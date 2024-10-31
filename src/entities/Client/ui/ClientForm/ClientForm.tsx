"use client";

import {
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Flex,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import { MinusCircleOutlined, PlusCircleFilled } from "@ant-design/icons";
import { Client } from "@/entities/Client";
import { ClientUserRole } from "@prisma/client";
import { useEffect, useState } from "react";
import { CompanySvg, UsersSvg } from "@/shared/assets";

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
      <Row gutter={8}>
        <Col span={8}>
          <Form.Item
            layout={"horizontal"}
            label={"Фамилия"}
            name={[userIndex, "user", "surname"]}
          >
            <Input placeholder={"Укажите фамилию..."} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            layout={"horizontal"}
            label={"Имя"}
            name={[userIndex, "user", "name"]}
          >
            <Input placeholder={"Укажите имя..."} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            layout={"horizontal"}
            label={"Отчество"}
            name={[userIndex, "user", "patronymic"]}
          >
            <Input placeholder={"Укажите отчество..."} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={8}>
          <Form.Item
            layout={"horizontal"}
            label={"E-mail"}
            name={[userIndex, "user", "email"]}
          >
            <Input placeholder={"Укажите e-mail..."} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            layout={"horizontal"}
            label={"Телефон"}
            name={[userIndex, "user", "phone"]}
          >
            <Input placeholder={"Укажите телефон..."} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );

  return (
    <Form
      id={"clientForm"}
      layout={"vertical"}
      form={form}
      labelCol={{ span: 4 }}
      colon={false}
      onFinish={(values) => onFinish?.(values, usersToDeleteIds)}
      onValuesChange={(changedValues, values) =>
        console.log(JSON.stringify(form?.getFieldsValue(), null, 2))
      }
      style={{ padding: 16 }}
      clearOnDestroy={true}
    >
      <Divider orientation={"left"}>
        <Flex align={"center"} gap={4}>
          <CompanySvg width={24} height={24} />
          <Typography.Text style={{ fontSize: 16 }} type={"secondary"}>
            {"Сведения о клиенте"}
          </Typography.Text>
        </Flex>
      </Divider>
      <Form.Item
        label={"Название организации"}
        name={["name"]}
        rules={[{ required: true, message: "Необходимо указать название" }]}
      >
        <Input
          style={{ width: "100%" }}
          placeholder={`ООО "Лучшая компания"`}
        />
      </Form.Item>
      <Form.Item label={"Адрес организации"} name={["address"]}>
        <Input
          style={{ width: "100%" }}
          placeholder="Укажите адрес организации"
        />
      </Form.Item>
      <Form.Item label={"Телефон организации"} name={["phone"]}>
        <Input style={{ width: "100%" }} placeholder="Укажите телефон" />
      </Form.Item>
      <Divider orientation={"left"}>
        <Flex align={"center"} gap={4}>
          <UsersSvg width={24} height={24} />
          <Typography.Text style={{ fontSize: 16 }} type={"secondary"}>
            {"Пользователи"}
          </Typography.Text>
        </Flex>
      </Divider>
      <Form.List name={["users"]}>
        {(fields, { add, remove, move }) => (
          <>
            {fields.map(({ key, name: userIndex, ...restField }) => (
              <Flex key={userIndex} gap={4}>
                <Card
                  size={"small"}
                  title={
                    <Button
                      type={"link"}
                      icon={<MinusCircleOutlined style={{ color: "red" }} />}
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
                    >
                      {"Удалить"}
                    </Button>
                  }
                  style={{
                    marginBottom: 8,
                    width: "100%",
                  }}
                >
                  <Divider orientation={"left"}>
                    <Typography.Text>{"Учетная запись"}</Typography.Text>
                  </Divider>
                  <Row gutter={8}>
                    <Col span={8}>
                      <Form.Item
                        layout={"horizontal"}
                        label={"Логин"}
                        name={[userIndex, "user", "login"]}
                        rules={[
                          {
                            required: true,
                            message: "Необходимо указать логин",
                          },
                        ]}
                      >
                        <Input placeholder={"Укажите логин"} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        layout={"horizontal"}
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
                          type={"password"}
                          placeholder={"Укажите пароль..."}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        layout={"horizontal"}
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

                  <Collapse
                    ghost={true}
                    items={[
                      {
                        key: "1",
                        label: "Данные профиля",
                        children: userProfileContent(userIndex),
                      },
                    ]}
                    // defaultActiveKey={["1"]}
                  />
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
    </Form>
  );
};

export default ClientForm;
