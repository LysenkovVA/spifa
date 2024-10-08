"use client";

import { usePathname, useRouter } from "next/navigation";
import { Menu, theme } from "antd";
import { MenuItems } from "../config/MenuItems";

const AppMenu = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { token } = theme.useToken();

  return (
    <Menu
      mode="vertical"
      defaultSelectedKeys={[
        MenuItems.find((item) => item.target === pathname)?.key || "1",
      ]}
      selectedKeys={[
        MenuItems.find((item) => item.target === pathname)?.key || "1",
      ]}
      items={MenuItems}
      style={{
        background: "none",
        flex: 1,
        borderRadius: token.borderRadius,
        //borderWidth: 1,
        borderColor: token.colorBorder,
        margin: "1px 0px 1px 1px",
        height: `calc(100vh - 2 * ${token.Layout?.headerHeight}px - 16px)`,
      }}
      onClick={(menuInfo) => {
        const { target } =
          MenuItems.find((item) => item.key === menuInfo.key) || {};
        if (target) {
          router.push(target);
        }
      }}
    />
  );
};

export default AppMenu;
