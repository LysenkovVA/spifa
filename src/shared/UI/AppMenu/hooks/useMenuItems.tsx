import { MenuProps, Space } from "antd";
import {
  MenuDividerType,
  MenuItemGroupType,
  MenuItemType,
} from "antd/es/menu/interface";
import {
  BankOutlined,
  OrderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useScreenWidth from "@/shared/hooks/useScreenWidth/useScreenWidth";

export const DEFAULT_ROUTE = "/companies";

type MenuItem = Required<MenuProps>["items"][number] & { target?: string };

export const useMenuItems = () => {
  const screenWidth = useScreenWidth();

  // const paymentMenuItem: MenuItemType & { target?: string } = {
  //   key: "1",
  //   label: `Заявки на оплату`,
  //   icon: <TransactionOutlined />,
  //   target: "/payments",
  // };

  const companiesMenuItem: MenuItemType & { target?: string } = {
    key: "3",
    label: `Компании`,
    icon: <BankOutlined />,
    target: "/companies",
  };

  // Подменю
  // const listsMenuSubItem: SubMenuType<MenuItemType> = {
  //   key: "2",
  //   label: `Списки`,
  //   icon: <OrderedListOutlined />,
  //
  //   children: [companiesMenuItem],
  // };

  // Группа
  const listsMenuSubItem: MenuItemGroupType<MenuItemType> = {
    key: "2",
    label: (
      <Space size={"small"}>
        <OrderedListOutlined /> {"Списки"}
      </Space>
    ),
    type: "group",
    // icon: <OrderedListOutlined />,

    children: [companiesMenuItem],
  };

  const menuArray: MenuItem[] = [
    // paymentMenuItem,
    listsMenuSubItem,
    companiesMenuItem,
  ];

  const menuItems: MenuItem[] = [
    // paymentMenuItem,
    listsMenuSubItem,
  ];

  if (screenWidth.xs) {
    const profileMenuItem: MenuItemType & { target?: string } = {
      key: "100",
      label: `Профиль`,
      icon: <UserOutlined />,
      target: "/profile",
    };

    const dividerMenuItem: MenuDividerType = {
      key: "99",
      type: "divider",
    };

    menuItems.push(dividerMenuItem);
    menuItems.push(profileMenuItem);

    menuArray.push(dividerMenuItem);
    menuArray.push(profileMenuItem);
  }

  return [menuItems, menuArray];
};
