import { MenuProps } from "antd";
import {
  MenuDividerType,
  MenuItemType,
  SubMenuType,
} from "antd/es/menu/interface";
import {
  BankOutlined,
  OrderedListOutlined,
  TransactionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useBreakpoint from "@/shared/hooks/useBreakpoints/useBreakPoints";

type MenuItem = Required<MenuProps>["items"][number] & { target?: string };

export const useMenuItems = () => {
  const breakpoints = useBreakpoint();

  const paymentMenuItem: MenuItemType & { target?: string } = {
    key: "1",
    label: `Заявки на оплату`,
    icon: <TransactionOutlined />,
    target: "/payments",
  };

  const companiesMenuItem: MenuItemType & { target?: string } = {
    key: "3",
    label: `Компании`,
    icon: <BankOutlined />,
    target: "/companies",
  };

  const listsMenuSubItem: SubMenuType<MenuItemType> = {
    key: "2",
    label: `Списки`,
    icon: <OrderedListOutlined />,

    children: [companiesMenuItem],
  };

  const menuArray: MenuItem[] = [
    paymentMenuItem,
    listsMenuSubItem,
    companiesMenuItem,
  ];

  const menuItems: MenuItem[] = [paymentMenuItem, listsMenuSubItem];

  if (breakpoints.xs) {
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
