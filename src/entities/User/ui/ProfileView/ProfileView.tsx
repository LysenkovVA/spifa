"use client";
import { Divider, Flex, Space, Typography } from "antd";
import { useSession } from "next-auth/react";
import {
  ContactsOutlined,
  MailOutlined,
  PhoneOutlined,
  SafetyOutlined,
} from "@ant-design/icons";

const ProfileView = () => {
  const { data: session } = useSession();

  return (
    <>
      <Flex align={"start"} justify={"center"} vertical>
        <Typography.Title style={{ marginTop: 0 }} level={3}>
          {session?.user.surname}
        </Typography.Title>
        <Typography.Title style={{ marginTop: 0 }} level={4}>
          {session?.user.name}
        </Typography.Title>
      </Flex>
      <Divider orientation={"left"}>
        <Space size={"middle"}>
          <ContactsOutlined />
          <Typography.Text type={"secondary"} style={{ fontSize: 16 }}>
            {"Контакты"}
          </Typography.Text>
        </Space>
      </Divider>
      <Flex align={"start"} justify={"center"} gap={8} vertical>
        <Space size={"middle"}>
          <MailOutlined />
          <Typography.Text style={{ fontSize: 16 }}>
            {session?.user.email}
          </Typography.Text>
        </Space>
        <Space size={"middle"}>
          <PhoneOutlined />
          <Typography.Text style={{ fontSize: 16 }}>
            {session?.user.phone}
          </Typography.Text>
        </Space>
      </Flex>

      <Divider orientation={"left"}>
        <Space size={"middle"}>
          <SafetyOutlined />
          <Typography.Text type={"secondary"} style={{ fontSize: 16 }}>
            {`Я в \"${session?.user.client?.name}\"`}
          </Typography.Text>
        </Space>
      </Divider>
      <Space size={"middle"}>
        {session?.user?.roles?.map((role) => (
          <Typography.Text
            key={role.userRole?.name}
            // type={"success"}
            style={{
              backgroundColor: "lightgreen",
              border: "solid 1px black",
              borderRadius: 12,
              padding: 6,
            }}
          >
            {role.userRole?.name}
          </Typography.Text>
        ))}
      </Space>
    </>
  );
};

export default ProfileView;
