"use client";

import { Avatar, Flex, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useScreenWidth from "@/shared/hooks/useScreenWidth/useScreenWidth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AppHeaderAvatar = () => {
  const screenWidth = useScreenWidth();
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Flex
      align={"center"}
      justify={"center"}
      gap={4}
      style={{ cursor: "pointer" }}
      onClick={() => router.push("/profile")}
    >
      {(screenWidth.lg || screenWidth.xl) && (
        <Typography.Text
          type={"secondary"}
          style={{ color: "#FFD7C4", fontSize: 14 }}
        >
          {session?.user?.email}
        </Typography.Text>
      )}
      {(screenWidth.sm ||
        screenWidth.md ||
        screenWidth.lg ||
        screenWidth.xl) && (
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
