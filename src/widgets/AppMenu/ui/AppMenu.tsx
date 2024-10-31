"use client";

import { usePathname, useRouter } from "next/navigation";
import { Menu, MenuProps } from "antd";
import { CSSProperties, memo } from "react";
import { useMenuItems } from "@/widgets/AppMenu/hooks/useMenuItems";

export interface AppMenuProps {
  style?: CSSProperties;
}

type MenuItem = Required<MenuProps>["items"][number];

export const AppMenu = memo((props: AppMenuProps) => {
  const { style } = props;
  const pathname = usePathname();
  const router = useRouter();

  const [menuItems] = useMenuItems();

  return (
    <Menu
      style={style}
      mode="inline"
      defaultSelectedKeys={[
        menuItems
          .find((item) => item.targetUrl === pathname)
          ?.key?.toString() || String(0),
      ]}
      selectedKeys={[
        menuItems
          .find((item) => item.targetUrl === pathname)
          ?.key?.toString() || String(0),
      ]}
      items={menuItems.map((item) => {
        const menuItem: MenuItem = {
          key: String(item.key),
          type: "group",
          label: item.label,
          // icon: item.icon,
          children: item.children?.map((child) => {
            return {
              key: String(child.key),
              label: child.label,
              icon: child.icon,
            };
          }),
        };

        return menuItem;
      })}
      onClick={(menuInfo) => {
        const { targetUrl } =
          menuItems.find((item) => item.key === menuInfo.key) ?? {};
        if (targetUrl) {
          router.push(targetUrl);
        }
      }}
    />
  );
});
