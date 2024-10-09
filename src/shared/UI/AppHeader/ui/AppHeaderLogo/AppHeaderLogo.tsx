"use client";

import { Flex, Image } from "antd";
import logo from "@/shared/assets/png/logo.png";
import useBreakpoint from "@/shared/hooks/useBreakpoints/useBreakPoints";

const AppHeaderLogo = () => {
  const breakpoints = useBreakpoint();

  return (
    <Flex align={"center"} justify={"center"} gap={4}>
      <Image
        src={logo.src}
        alt={"logo"}
        preview={false}
        width={breakpoints.xs || breakpoints.sm ? 100 : 208}
      />
    </Flex>
  );
};

export default AppHeaderLogo;
