"use client";

import { CSSProperties, memo, useEffect, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Flex,
  Form,
  Image,
  Input,
  Tag,
  Typography,
} from "antd";
import logo from "@/shared/assets/png/logo.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { registerUser } from "@/entities/User/model/actions/registerUser";
import { useRouter } from "next/navigation";
import { fetchUsersCount, User } from "@/entities/User";
import { loginAction } from "@/app/api/auth/login.action";
import { DEFAULT_ROUTE } from "@/widgets/AppMenu/hooks/useMenuItems";
import { getSession } from "next-auth/react";

export interface RegistrationFormProps {
  style?: CSSProperties;
}

export const RegistrationForm = memo((props: RegistrationFormProps) => {
  const { style } = props;

  const [error, setError] = useState<string | undefined>("");
  const [isRegistering, setIsRegistering] = useState(false);

  // Начальное значение 1, чтобы в интерфейсе при загрузке не показывалось
  const [usersCount, setUsersCount] = useState(1);

  const router = useRouter();

  useEffect(() => {
    fetchUsersCount()
      .then((response) => response.data)
      .then((usersCount) => {
        setUsersCount(usersCount);
      });
  }, [router]);

  const onFinish = async (values: User) => {
    setIsRegistering(true);
    console.log("Registering...");

    const response = await registerUser(
      usersCount > 0 ? values : { ...values, dbRoles: ["ADMINISTRATOR"] },
    );

    if (response.isOk) {
      setIsRegistering(false);

      console.log("Login...");
      await loginAction(values);

      console.log("Getting session...");
      const session = await getSession();

      if (session?.user) {
        console.log("Session user found");
        router.push(DEFAULT_ROUTE);
      } else {
        console.log("Session user not found");
      }
    } else {
      setIsRegistering(false);
      setError(response.errorMessages?.join(", ") ?? "Ошибка при регистрации");
    }
  };

  return (
    <Flex vertical align={"center"} justify={"center"} gap={16}>
      <Image src={logo.src} alt={"logo"} preview={false} width={200} />
      <Card
        style={{
          ...style,
          textAlign: "center",
          width: usersCount === 0 ? 300 : 600,
        }}
        size={"small"}
      >
        {usersCount === 0 ? (
          <Tag color={"tomato"}>{"Регистрация администратора БД!"}</Tag>
        ) : (
          <Tag color={"warning"}>{"Регистрация нового клиента"}</Tag>
        )}
        <Form
          id={"registrationForm"}
          onFinish={onFinish}
          onValuesChange={(changedValues, values) =>
            console.log(JSON.stringify(values))
          }
          style={{ padding: 16 }}
        >
          {usersCount > 0 && <Divider>{"Администратор клиента"}</Divider>}
          <Form.Item
            name="login"
            rules={[{ required: true, message: "Пожалуйста укажите логин" }]}
          >
            <Input
              style={{ width: "100%" }}
              prefix={<UserOutlined />}
              placeholder="Логин"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Пожалуйста укажите пароль" }]}
          >
            <Input
              style={{ width: "100%" }}
              prefix={<LockOutlined />}
              type="password"
              placeholder="Пароль"
            />
          </Form.Item>
          <Form.Item
            name="repeatPassword"
            rules={[{ required: true, message: "Пожалуйста повторите пароль" }]}
          >
            <Input
              style={{ width: "100%" }}
              prefix={<LockOutlined />}
              type="password"
              placeholder="Повторите пароль"
            />
          </Form.Item>
          {usersCount > 0 && (
            <>
              <Form.Item name={["surname"]}>
                <Input style={{ width: "100%" }} placeholder="Фамилия" />
              </Form.Item>
              <Form.Item name={["name"]}>
                <Input style={{ width: "100%" }} placeholder="Имя" />
              </Form.Item>
              <Form.Item name={["email"]}>
                <Input style={{ width: "100%" }} placeholder="E-mail" />
              </Form.Item>
              <Form.Item name={["phone"]}>
                <Input style={{ width: "100%" }} placeholder="Телефон" />
              </Form.Item>
            </>
          )}
          {usersCount > 0 && (
            <>
              <Divider>{"Сведения о клиенте"}</Divider>
              <Form.Item name={["client", "name"]}>
                <Input
                  style={{ width: "100%" }}
                  placeholder={`ООО "Лучшая компания"`}
                />
              </Form.Item>
              <Form.Item name={["client", "address"]}>
                <Input
                  style={{ width: "100%" }}
                  placeholder="101000, Москва, Кремль"
                />
              </Form.Item>
              <Form.Item name={["client", "phone"]}>
                <Input
                  style={{ width: "100%" }}
                  placeholder="+7-495-111-22-33"
                />
              </Form.Item>
            </>
          )}
          <Form.Item style={{ textAlign: "center" }}>
            {error && (
              <Typography.Text type={"danger"}>{error}</Typography.Text>
            )}
            <Button
              block
              loading={isRegistering}
              disabled={isRegistering}
              type="primary"
              htmlType="submit"
              onClick={(e) => {
                setError("");
              }}
            >
              {"Создать"}
            </Button>
            <Flex
              style={{ paddingTop: 16 }}
              gap={4}
              justify={"center"}
              align={"center"}
            >
              {"Уже есть аккаунт?"}
              <a href="/">Войти</a>
            </Flex>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
});
