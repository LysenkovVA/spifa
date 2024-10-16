"use client";

import { Space, Table, TableProps, Typography } from "antd";
import { Company } from "@/entities/Company";
import { EditCompanyButton } from "@/features/Companies/EditCompanyButton";
import { EditOutlined } from "@ant-design/icons";
import { DeleteCompanyButton } from "@/features/Companies/DeleteCompanyButton";

const columns: TableProps<Company>["columns"] = [
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: "ИНН",
    dataIndex: "inn",
    key: "inn",
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    width: "40px",

    render: (_, record) => (
      <Space size={"small"}>
        <EditCompanyButton
          companyId={record.id}
          title={""}
          icon={<EditOutlined />}
        />
        <DeleteCompanyButton companyId={record.id} />
      </Space>
    ),
  },
];

export interface CompanyTableProps {
  data?: Company[];
}

const CompaniesTable = (props: CompanyTableProps) => {
  const { data } = props;

  return (
    <Table<Company>
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
};

export default CompaniesTable;
