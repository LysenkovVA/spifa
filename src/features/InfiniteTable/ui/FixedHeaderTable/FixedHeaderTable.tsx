"use client";

import { Table, TableProps } from "antd";
import { CSSProperties, memo } from "react";
import { createStyles } from "antd-style";

const useStyle = createStyles(({ css, token }) => {
  // @ts-ignore
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

export interface FixedHeaderTableProps<T> {
  style?: CSSProperties;
  columns: TableProps<T>["columns"];
  data: T[] | undefined;
  scrollHeight?: string | number | undefined;
  onRowClick?: (record: T, rowIndex?: number) => void;
  onRowDoubleClick?: (value: T, rowIndex?: number) => void;
  onRowContextMenu?: (value: T, rowIndex?: number) => void;
  onRowMouseEnter?: (value: T, rowIndex?: number) => void;
  onRowMouseLeave?: (value: T, rowIndex?: number) => void;
}

/**
 * Таблица с фиксированными заголовками
 * @constructor
 */
export const FixedHeaderTable = <T extends { id: string }>(
  props: FixedHeaderTableProps<T>,
) => {
  const {
    style,
    columns,
    data,
    // scrollHeight, // Используется для фиксированных заголовков
    onRowClick,
    onRowDoubleClick,
    onRowContextMenu,
    onRowMouseEnter,
    onRowMouseLeave,
  } = props;

  // Используется для фиксированных заголовков
  // const { styles } = useStyle();

  return (
    <Table<T>
      // Эти поля используются для фиксированных заголовков
      // className={styles.customTable}
      // scroll={{ y: scrollHeight }}
      style={{ width: "100%", cursor: "pointer", ...style }}
      columns={columns}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            onRowClick?.(record, rowIndex);
          },
          onDoubleClick: (event) => {
            onRowDoubleClick?.(record, rowIndex);
          },
          onContextMenu: (event) => {
            onRowContextMenu?.(record, rowIndex);
          },
          onMouseEnter: (event) => {
            onRowMouseEnter?.(record, rowIndex);
          },
          onMouseLeave: (event) => {
            onRowMouseLeave?.(record, rowIndex);
          },
        };
      }}
      dataSource={data}
      rowKey={(record) => record.id}
      pagination={false}
      sticky={true}
    />
  );
};

export default memo(FixedHeaderTable);
