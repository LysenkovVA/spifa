"use client";

import { Flex, Space } from "antd";
import AppHeaderLogo from "../AppHeaderLogo/AppHeaderLogo";
import AppHeaderAvatar from "../AppHeaderAvatar/AppHeaderAvatar";
import AppHeaderLogoutButton from "../AppHeaderLogoutButton/AppHeaderLogoutButton";

const AppHeader = () => {
  return (
    <Flex align={"center"} justify={"space-between"}>
      <AppHeaderLogo />
      <Space size={"middle"} style={{ paddingRight: 16 }}>
        <AppHeaderAvatar />
        <AppHeaderLogoutButton />
      </Space>
    </Flex>
  );
};

export default AppHeader;
