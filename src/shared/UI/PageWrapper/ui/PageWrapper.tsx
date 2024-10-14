"use client";

import { ReactNode } from "react";
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from "antd/es/breadcrumb/Breadcrumb";
import { Breadcrumb, Flex, Space } from "antd";

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

  return (
    <>
      <Flex
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
      {children}
    </>
  );
};

export default PageWrapper;
