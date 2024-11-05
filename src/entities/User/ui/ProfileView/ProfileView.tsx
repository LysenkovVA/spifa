"use client";
import { Avatar, Divider, Flex, Space, Tag, Typography } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  SafetyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { User } from "@/entities/User";

export interface ProfileViewProps {
  profile: User;
}

const ProfileView = (props: ProfileViewProps) => {
  const { profile } = props;

  return (
    <>
      <Flex align={"center"} justify={"start"} gap={16}>
        <Avatar size={150} icon={<UserOutlined />} />
        <Flex align={"start"} justify={"center"} vertical>
          <Typography.Title
            type={"secondary"}
            style={{ marginTop: 0 }}
            level={3}
          >
            {profile.surname}
          </Typography.Title>
          <Flex align={"start"} justify={"start"} gap={8}>
            <Typography.Title
              type={"secondary"}
              style={{ marginTop: 0 }}
              level={4}
            >
              {profile.name}
            </Typography.Title>
            <Typography.Title
              type={"secondary"}
              style={{ marginTop: 0 }}
              level={4}
            >
              {profile.patronymic}
            </Typography.Title>
          </Flex>
          <Flex align={"start"} justify={"start"} vertical gap={6}>
            <Space size={"small"}>
              <MailOutlined />
              <Typography.Text style={{ fontSize: 12 }}>
                {profile.email}
              </Typography.Text>
            </Space>
            <Space size={"small"}>
              <PhoneOutlined />
              <Typography.Text style={{ fontSize: 12 }}>
                {profile.phone}
              </Typography.Text>
            </Space>
          </Flex>
        </Flex>
      </Flex>
      {profile.clients?.map((clientOnUser) => (
        <div key={clientOnUser.client?.id}>
          <Divider orientation={"left"}>
            <Space size={"middle"}>
              <SafetyOutlined />
              <Typography.Text type={"secondary"} style={{ fontSize: 16 }}>
                {`Я в ${clientOnUser.client?.name}`}
              </Typography.Text>
            </Space>
          </Divider>
          <Space size={"middle"}>
            <Tag color={"green"}>{clientOnUser.clientUserRole}</Tag>
          </Space>
        </div>
      ))}
      {/*<Divider orientation={"left"}>Роли БД</Divider>*/}
      {/*{profile.dbRoles?.map((role) => <Tag key={role}>{role}</Tag>)}*/}
    </>
  );
};

export default ProfileView;
