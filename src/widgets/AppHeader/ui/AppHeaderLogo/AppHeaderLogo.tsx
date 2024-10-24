"use client";

import { Flex, Image } from "antd";
import logo from "@/shared/assets/png/logo.png";
import useScreenWidth from "@/shared/hooks/useScreenWidth/useScreenWidth";

const AppHeaderLogo = () => {
  const screenWidth = useScreenWidth();

  return (
    <Flex align={"center"} justify={"center"} style={{ width: 208 }}>
      <Image
        src={logo.src}
        alt={"logo"}
        preview={false}
        width={screenWidth.xs || screenWidth.sm ? 100 : 150}
      />
    </Flex>
  );
};

export default AppHeaderLogo;
