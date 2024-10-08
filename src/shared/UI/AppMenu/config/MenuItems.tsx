import { BankOutlined, TransactionOutlined } from "@ant-design/icons";

export const MenuItems = [
  {
    key: "1",
    label: `Заявки на оплату`,
    icon: <TransactionOutlined />,
    target: "/payments",
  },
  {
    key: "2",
    label: `Компании`,
    icon: <BankOutlined />,
    target: "/companies",
  },
];
