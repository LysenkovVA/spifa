"use client";

import { CSSProperties } from "react";
import { theme } from "antd";
import { ClientsTable } from "@/features/Clients/ClientsTable";

export interface ClientsWidgetProps {
  style?: CSSProperties;
}

const ClientsWidget = (props: ClientsWidgetProps) => {
  const { token } = theme.useToken();

  return (
    <div style={props.style}>
      <ClientsTable
        height={`calc(100vh - 2 * ${token.Layout?.headerHeight}px - 16px)`}
      />
    </div>
  );
};

export default ClientsWidget;
