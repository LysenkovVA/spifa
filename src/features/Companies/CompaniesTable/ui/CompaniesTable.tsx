"use client";

import { Table, TableProps } from "antd";
import { Company } from "@/entities/Company";

const columns: TableProps<Company>["columns"] = [
  {
    title: "Название",
    dataIndex: "company_name",
    key: "company_name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "ИНН",
    dataIndex: "inn",
    key: "inn",
    render: (text) => <a>{text}</a>,
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
      // pagination={{ position: [top, bottom] }}
      dataSource={data}
    />
  );
};

export default CompaniesTable;
