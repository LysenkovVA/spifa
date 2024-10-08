"use client";

import { Flex, Image } from "antd";
import logo from "@/shared/assets/png/logo.png";

const AppHeaderLogo = () => {
  return (
    <Flex
      style={{ minWidth: 216, width: 216 }}
      align={"center"}
      justify={"center"}
      gap={4}
    >
      <Image src={logo.src} alt={"logo"} preview={false} />
    </Flex>
  );
};

export default AppHeaderLogo;
