"use client";

import { CSSProperties } from "react";
import { theme } from "antd";
import { CompaniesTable } from "@/features/Companies/CompaniesTable";

export interface CompaniesWidgetProps {
  style?: CSSProperties;
}

const CompaniesWidget = (props: CompaniesWidgetProps) => {
  const { token } = theme.useToken();

  return (
    <div style={props.style}>
      <CompaniesTable
        height={`calc(100vh - 2 * ${token.Layout?.headerHeight}px - 16px)`}
      />
    </div>
  );
};

export default CompaniesWidget;
