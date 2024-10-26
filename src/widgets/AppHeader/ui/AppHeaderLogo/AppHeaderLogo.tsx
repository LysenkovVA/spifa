"use client";

import { Flex, Image, Tag } from "antd";
import logo from "@/shared/assets/png/logo.png";
import useScreenWidth from "@/shared/hooks/useScreenWidth/useScreenWidth";
import { useSession } from "next-auth/react";

const AppHeaderLogo = () => {
  const session = useSession();

  const screenWidth = useScreenWidth();

  return (
    // <Flex align={"center"} justify={"center"} style={{ width: 208 }}>
    <>
      <Flex align={"center"} justify={"center"} style={{ width: 208 }}>
        <Image
          style={{
            position: "relative",
            width: screenWidth.xs || screenWidth.sm ? 100 : 150,
          }}
          src={logo.src}
          alt={"logo"}
          preview={false}
          // width={screenWidth.xs || screenWidth.sm ? 100 : 150}
        />
      </Flex>
      {session.data?.user?.dbRoles?.find(
        (role) => role === "ADMINISTRATOR",
      ) && (
        <Tag
          color={"tomato"}
          style={{ position: "absolute", left: 170, fontSize: 8 }}
        >
          {"ADMIN"}
        </Tag>
      )}
    </>
    // </Flex>
  );
};

export default AppHeaderLogo;
