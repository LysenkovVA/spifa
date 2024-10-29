"use client";

import { CSSProperties } from "react";
import { Button, Flex, Input, Space, Table, TableProps } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

export interface AppTableProps<T> {
  style?: CSSProperties;
  columns: TableProps<T>["columns"];
  data?: T[];
  onAddClick?: () => void;
  onEditClick?: (id: string) => void;
  onDeleteClick?: (id: string) => void;
}

export function AppTable<T extends { id: string }>(props: AppTableProps<T>) {
  const { style, columns, data, onAddClick, onEditClick, onDeleteClick } =
    props;

  if (!columns?.find((col) => col.key === "actions")) {
    columns?.push({
      title: "",
      dataIndex: "actions",
      key: "actions",
      width: "40px",

      render: (_, record) => (
        <Space size={"small"}>
          <Button
            icon={<EditOutlined />}
            onClick={() => onEditClick?.(record.id)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => onDeleteClick?.(record.id)}
          />
        </Space>
      ),
    });
  }

  return (
    <Flex style={style} vertical gap={8}>
      <Flex align={"center"} justify={"space-between"}>
        <Input placeholder={"Найти..."} style={{ width: "50%" }} />
        <Button type={"primary"} icon={<PlusOutlined />} onClick={onAddClick}>
          Добавить
        </Button>
      </Flex>
      <Table<T>
        style={{ width: "100%" }}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {}, // click row
            onDoubleClick: (event) => {}, // double click row
            onContextMenu: (event) => {}, // right button click row
            onMouseEnter: (event) => {}, // mouse enter row
            onMouseLeave: (event) => {}, // mouse leave row
          };
        }}
        // pagination={{ position: [top, bottom] }}
        dataSource={data}
        rowKey={(record) => record.id}
        pagination={false}
      />
    </Flex>
  );
}
