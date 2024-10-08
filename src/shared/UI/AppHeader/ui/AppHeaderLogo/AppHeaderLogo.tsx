"use client";

import { Flex, Image, Typography } from "antd";
import logo from "@/shared/assets/png/logo.png";

const AppHeaderLogo = () => {
  return (
    <Flex
      style={{ minWidth: 216, width: 216, background: "red" }}
      align={"center"}
      justify={"center"}
      gap={4}
    >
      <Image
        style={{ width: 30, height: 30, background: "green" }}
        src={logo.src}
        alt={"logo"}
        preview={false}
      />
      <Typography.Text
        style={{
          color: "#FFD7C4",
          fontSize: 10,
          textAlign: "center",
          background: "gray",
          margin: 0,
        }}
      >
        Система планирования и финансового анализа
      </Typography.Text>
    </Flex>
  );
};

export default AppHeaderLogo;
