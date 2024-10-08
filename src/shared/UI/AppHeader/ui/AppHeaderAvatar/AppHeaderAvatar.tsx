"use client";

import { Avatar, Flex, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const AppHeaderAvatar = () => {
  return (
    <Flex align={"center"} justify={"center"} gap={4}>
      <Typography.Text
        type={"secondary"}
        style={{ color: "#FFD7C4", fontSize: 14 }}
      >
        {"Иванов И.И."}
      </Typography.Text>
      <Avatar
        size={"large"}
        shape={"circle"}
        style={{ borderColor: "gray", borderWidth: 2, fontWeight: "bold" }}
        icon={<UserOutlined />}
      />
    </Flex>
  );
};

export default AppHeaderAvatar;
