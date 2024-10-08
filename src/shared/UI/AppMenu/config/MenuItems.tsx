import {
  BankOutlined,
  OrderedListOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { MenuItemType, SubMenuType } from "antd/es/menu/interface";

type MenuItem = Required<MenuProps>["items"][number] & { target?: string };

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

export const menuArray: MenuItem[] = [
  paymentMenuItem,
  listsMenuSubItem,
  companiesMenuItem,
];

export const MenuItems: MenuItem[] = [paymentMenuItem, listsMenuSubItem];
