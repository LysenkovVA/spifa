"use client";

import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const AppHeaderLogoutButton = () => {
  return (
    <Button
      icon={<LogoutOutlined />}
      type="primary"
      style={{ backgroundColor: "#FFF4B5", color: "black" }}
    >
      {"Выйти"}
    </Button>
  );
};

export default AppHeaderLogoutButton;
