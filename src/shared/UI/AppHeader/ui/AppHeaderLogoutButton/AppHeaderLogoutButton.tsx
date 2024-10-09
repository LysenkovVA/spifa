"use client";

import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import useBreakpoint from "@/shared/hooks/useBreakpoints/useBreakPoints";

const AppHeaderLogoutButton = () => {
  const breakpoints = useBreakpoint();

  if (breakpoints.xs || breakpoints.sm) {
    return (
      <Button
        icon={<LogoutOutlined />}
        type="primary"
        style={{ backgroundColor: "#FFF4B5", color: "black" }}
        size={"large"}
      />
    );
  }

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
