"use client";

import { ReactNode } from "react";
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from "antd/es/breadcrumb/Breadcrumb";
import { Breadcrumb, Flex, Space, theme } from "antd";

export interface PageWrapperProps {
  children?: ReactNode;
  breadcrumbs?:
    | Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[]
    | undefined;

  actions?: ReactNode[];
}

/**
 * Обертка для основных страниц
 * @param props
 * @constructor
 */
const PageWrapper = (props: PageWrapperProps) => {
  const { children, breadcrumbs, actions } = props;

  const { token } = theme.useToken();

  return (
    <div>
      <Flex
        id={"flexPageWrapper"}
        style={{ margin: 8 }}
        align={"center"}
        justify={
          breadcrumbs && actions
            ? "space-between"
            : breadcrumbs
              ? "start"
              : "end"
        }
        // justify={"space-between"}
      >
        {breadcrumbs && (
          <Breadcrumb
            style={{ paddingBottom: 16 }}
            items={breadcrumbs}
            separator={">"}
          />
        )}
        <Space direction={"horizontal"}>{actions}</Space>
      </Flex>
      <div
        id="scrollableDiv"
        style={{
          height: `calc(100vh - 18px - 2 * ${token.Layout?.headerHeight}px - ${36}px - 16px)`,
          overflow: "auto",
          // padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
          borderRadius: 12,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
