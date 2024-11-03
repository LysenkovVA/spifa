"use client";

import {
  FixedHeaderTable,
  FixedHeaderTableProps,
} from "../FixedHeaderTable/FixedHeaderTable";
import React, { memo, ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Flex, Spin } from "antd";

export interface InfiniteFixedHeaderTableProps<T>
  extends FixedHeaderTableProps<T> {
  loadNextPartCallback: () => void;
  hasMore: boolean;
  loader?: ReactNode;
  dataLength: number;
  endMessage?: ReactNode;
}

/**
 * Бесконечная таблица c фиксированными заголовками
 * и возможностью подгрузки данных по мере необходимости
 * @constructor
 */
export function InfiniteFixedHeaderTable<T extends { id: string }>(
  props: InfiniteFixedHeaderTableProps<T>,
) {
  const {
    loadNextPartCallback,
    hasMore,
    loader = (
      <Flex align={"center"} justify={"center"}>
        <Spin spinning={true} />
      </Flex>
    ),
    dataLength,
    endMessage,
    scrollHeight,
    ...restProps
  } = props;

  return (
    <div
      id={"scrollableDiv"}
      style={{ ...restProps.style, height: scrollHeight }}
    >
      <InfiniteScroll
        next={loadNextPartCallback}
        hasMore={hasMore}
        loader={loader}
        height={scrollHeight}
        dataLength={dataLength}
        endMessage={endMessage}
        scrollableTarget={"scrollableDiv"}
      >
        <FixedHeaderTable<T> {...restProps} />
      </InfiniteScroll>
    </div>
  );
}

export default memo(InfiniteFixedHeaderTable);
