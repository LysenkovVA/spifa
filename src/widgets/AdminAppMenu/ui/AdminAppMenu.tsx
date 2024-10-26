"use client";

import { CSSProperties, memo } from "react";
import { Menu, MenuProps } from "antd";
import { ApiTwoTone } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number] & { target?: string };

const menuItems: MenuItem[] = [
  {
    key: "1",
    label: `Клиенты`,
    icon: <ApiTwoTone />,
    // style: { background: "red" },
    target: "/clients",
  },
];

export interface AdminAppMenuProps {
  style?: CSSProperties;
}

export const AdminAppMenu = memo((props: AdminAppMenuProps) => {
  const { style } = props;

  const pathname = usePathname();
  const router = useRouter();

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[
        menuItems.find((item) => item.target === pathname)?.key?.toString() ||
          String(1),
      ]}
      selectedKeys={[
        menuItems.find((item) => item.target === pathname)?.key?.toString() ||
          String(1),
      ]}
      items={menuItems}
      style={style}
      onClick={(menuInfo) => {
        const { target } =
          menuItems.find((item) => item.key === menuInfo.key) || {};
        if (target) {
          router.push(target);
        }
      }}
    />
  );
});
