"use client";

import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import useScreenWidth from "@/shared/hooks/useScreenWidth/useScreenWidth";
import { signOutAction } from "@/app/api/auth/sign-out.action";

const AppHeaderLogoutButton = () => {
  const screenWidth = useScreenWidth();

  // if (screenWidth.xs || screenWidth.sm) {
  //   return (
  //     <Button
  //       icon={<LogoutOutlined />}
  //       type="primary"
  //       style={{ backgroundColor: "#FFF4B5", color: "black" }}
  //       size={"large"}
  //       onClick={async () => {
  //         console.log("Logout...");
  //         await signOutAction();
  //       }}
  //     />
  //   );
  // }

  return (
    <Button
      icon={<LogoutOutlined />}
      type="primary"
      style={{ backgroundColor: "#FFF4B5", color: "black" }}
      onClick={async () => {
        console.log("Logout...");
        await signOutAction();
      }}
    >
      {"Выйти"}
    </Button>
  );
};

export default AppHeaderLogoutButton;
