"use client";

import { Flex, Image } from "antd";
import logo from "@/shared/assets/png/logo.png";
import useScreenWidth from "@/shared/hooks/useScreenWidth/useScreenWidth";

const AppHeaderLogo = () => {
  const screenWidth = useScreenWidth();

  return (
    <Flex align={"center"} justify={"center"} gap={4}>
      <Image
        src={logo.src}
        alt={"logo"}
        preview={false}
        width={screenWidth.xs || screenWidth.sm ? 100 : 208}
      />
    </Flex>
  );
};

export default AppHeaderLogo;
