"use client";

import { Avatar, Flex, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useScreenWidth from "@/shared/hooks/useScreenWidth/useScreenWidth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export interface AppHeaderAvatarProps {
  style?: React.CSSProperties;
  avatarSize?: number;
}

const AppHeaderAvatar = (props: AppHeaderAvatarProps) => {
  const screenWidth = useScreenWidth();
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Flex
      align={"center"}
      justify={"center"}
      gap={4}
      vertical
      style={{ ...props.style, cursor: "pointer" }}
      onClick={() => router.push(`/profile/${session?.user?.id}`)}
    >
      <Avatar
        size={props.avatarSize ?? 40}
        shape={"circle"}
        style={{
          borderColor: "darkgrey",
          borderWidth: 2,
          fontWeight: "bold",
          background: "ghostwhite",
        }}
        icon={<UserOutlined style={{ color: "darkgrey" }} />}
      />
      <Typography.Text style={{ color: "gray", fontSize: 14 }}>
        {session?.user?.login}
      </Typography.Text>
    </Flex>
  );
};

export default AppHeaderAvatar;
