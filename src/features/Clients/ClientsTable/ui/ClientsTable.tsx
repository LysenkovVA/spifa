"use client";

import { Table, TableProps, Typography } from "antd";
import { Client } from "@/entities/Client";
import { memo } from "react";

const columns: TableProps<Client>["columns"] = [
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
    render: (text, fields) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
    render: (text, fields) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: "Телефон",
    dataIndex: "phone",
    key: "phone",
    render: (text, fields) => <Typography.Text>{text}</Typography.Text>,
  },
];

export interface ClientTableProps {
  data?: Client[];
}

export const ClientsTable = memo((props: ClientTableProps) => {
  const { data } = props;

  return (
    <Table<Client>
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
  );
});
