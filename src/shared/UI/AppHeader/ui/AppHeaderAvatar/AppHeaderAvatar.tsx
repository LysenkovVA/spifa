"use client";

import { Avatar, Flex, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useBreakpoint from "@/shared/hooks/useBreakpoints/useBreakPoints";

const AppHeaderAvatar = () => {
  const breakpoints = useBreakpoint();

  return (
    <Flex align={"center"} justify={"center"} gap={4}>
      {(breakpoints.lg || breakpoints.xl) && (
        <Typography.Text
          type={"secondary"}
          style={{ color: "#FFD7C4", fontSize: 14 }}
        >
          {"Иванов И.И."}
        </Typography.Text>
      )}
      {(breakpoints.sm ||
        breakpoints.md ||
        breakpoints.lg ||
        breakpoints.xl) && (
        <Avatar
          size={"large"}
          shape={"circle"}
          style={{ borderColor: "gray", borderWidth: 2, fontWeight: "bold" }}
          icon={<UserOutlined />}
        />
      )}
    </Flex>
  );
};

export default AppHeaderAvatar;
