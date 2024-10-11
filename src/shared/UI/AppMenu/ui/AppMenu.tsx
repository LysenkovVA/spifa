"use client";

import { usePathname, useRouter } from "next/navigation";
import { Menu, theme } from "antd";
import { useMenuItems } from "@/shared/UI/AppMenu/hooks/useMenuItems";

const AppMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { token } = theme.useToken();

  const [menuItems, menuArray] = useMenuItems();

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[
        menuArray.find((item) => item.target === pathname)?.key?.toString() ||
          String(1),
      ]}
      selectedKeys={[
        menuArray.find((item) => item.target === pathname)?.key?.toString() ||
          String(1),
      ]}
      items={menuItems}
      style={{
        background: "whitesmoke",
        flex: 1,
        borderRadius: token.borderRadius,
        borderColor: token.colorBorder,
        margin: "1px 0px 1px 1px",
        width: "calc(100% - 2px)",
        height: `calc(100vh - 2 * ${token.Layout?.headerHeight}px - 18px)`,
      }}
      onClick={(menuInfo) => {
        const { target } =
          menuArray.find((item) => item.key === menuInfo.key) || {};
        if (target) {
          router.push(target);
        }
      }}
    />
  );
};

export default AppMenu;
