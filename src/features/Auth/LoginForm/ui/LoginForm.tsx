"use client";

import {
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Image,
  Input,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import logo from "@/shared/assets/png/logo.png";
import { loginAction } from "@/app/api/auth/login.action";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { DEFAULT_ROUTE } from "@/widgets/AppMenu/hooks/useMenuItems";
import { fetchUsersCount } from "@/entities/User";

const LoginForm = () => {
  const router = useRouter();

  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsersCount()
      .then((response) => response.data)
      .then((usersCount) => {
        if (usersCount === 0) {
          router.push("/register");
        }
      });
  }, [router]);

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    const response = await loginAction(values);

    const session = await getSession();

    if (session?.user) {
      if (session.user.dbRoles?.find((role) => role === "ADMINISTRATOR")) {
        router.push("/clients");
      }

      if (session.user.dbRoles?.find((role) => role === "USER")) {
        router.push(DEFAULT_ROUTE);
      }
    } else {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <Flex
      vertical
      align={"center"}
      justify={"center"}
      gap={16}
      // style={{ marginLeft: "20%", marginRight: "20%", marginTop: "10%" }}
    >
      <Image src={logo.src} alt={"logo"} preview={false} width={250} />
      <Card>
        <Form
          name="login"
          initialValues={{ remember: false }}
          // style={{ maxWidth: 360 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="login"
            rules={[{ required: true, message: "Пожалуйста укажите login" }]}
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
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Запомнить</Checkbox>
              </Form.Item>
              <a href="">Восстановить пароль</a>
            </Flex>
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            {error && (
              <Typography.Text type={"danger"}>{error}</Typography.Text>
            )}
            <Button
              block
              type="primary"
              htmlType="submit"
              onClick={(e) => {
                setError("");
              }}
            >
              Войти
            </Button>
            <Flex
              style={{ paddingTop: 16 }}
              gap={4}
              justify={"center"}
              align={"center"}
            >
              {"или"}
              <a href="/register">зарегистрироваться</a>
            </Flex>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
};

export default LoginForm;
