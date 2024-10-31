import { Space } from "antd";
import { BankOutlined, UserOutlined } from "@ant-design/icons";
import { useDBUser } from "@/shared/hooks/useUserRole/useDBUser";

export const DEFAULT_ROUTE = "/companies";

export interface AppMenuItem {
  key: React.Key;
  type?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  targetUrl?: string | undefined;
  isPrivate?: boolean;
  isDBAdmin?: boolean;
  children?: Array<AppMenuItem>;
}

export const useMenuItems = () => {
  const [user, isDBAdmin, isDBUser] = useDBUser();

  const items: AppMenuItem[] = [
    {
      key: "1",
      label: (
        <Space size={"small"}>
          {/*<OrderedListOutlined /> */}
          {"СПИСКИ"}
        </Space>
      ),
      type: "group",
      targetUrl: "",
      isPrivate: true,
      isDBAdmin: false,
      children: [
        {
          key: "2",
          label: `Компании`,
          icon: <BankOutlined />,
          targetUrl: "/companies",
          isPrivate: true,
          isDBAdmin: false,
        },
      ],
    },
    // {
    //   key: "3",
    //   label: `Дашборд`,
    //   icon: <DashboardOutlined />,
    //   targetUrl: "/dashboard",
    //   isPrivate: true,
    //   isDBAdmin: true,
    // },
    {
      key: "4",
      label: `Клиенты`,
      icon: <UserOutlined />,
      targetUrl: "/clients",
      isPrivate: true,
      isDBAdmin: true,
    },
  ];

  return [items.filter((item) => item.isDBAdmin === isDBAdmin)];
};
