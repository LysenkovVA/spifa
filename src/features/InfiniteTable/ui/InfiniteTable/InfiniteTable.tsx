"use client";

import {
  InfiniteFixedHeaderTable,
  InfiniteFixedHeaderTableProps,
} from "../InfiniteFixedHeaderTable/InfiniteFixedHeaderTable";
import { memo } from "react";
import { Button, Flex, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export interface InfiniteTableProps<T>
  extends InfiniteFixedHeaderTableProps<T> {
  title?: string;
  onAddRecord?: () => void;
}

const PANEL_HEIGHT = 60;
const PANEL_MARGIN = 16;

export function InfiniteTable<T extends { id: string }>(
  props: InfiniteTableProps<T>,
) {
  const { title, onAddRecord, scrollHeight, ...restProps } = props;

  return (
    <>
      <Flex
        style={{
          height: PANEL_HEIGHT,
          paddingLeft: 16,
          paddingRight: 16,
          border: "solid 1px lightgray",
          borderRadius: 12,
          marginBottom: PANEL_MARGIN,
        }}
        align={"center"}
        justify={"space-between"}
      >
        <Typography.Text
          type={"secondary"}
          style={{ fontSize: 20, fontWeight: "bold" }}
        >
          {title}
        </Typography.Text>
        {onAddRecord && (
          <Button icon={<PlusOutlined />} type="primary" onClick={onAddRecord}>
            {"Добавить"}
          </Button>
        )}
      </Flex>
      <InfiniteFixedHeaderTable
        scrollHeight={`calc(${scrollHeight} - ${PANEL_HEIGHT + PANEL_MARGIN}px)`}
        {...restProps}
      />
    </>
  );
}

export default memo(InfiniteTable);
