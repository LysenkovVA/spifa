"use client";

import { Flex, Space, Table, TableProps, Typography } from "antd";
import { Company } from "@/entities/Company";
import { EditCompanyButton } from "@/features/Companies/EditCompanyButton";
import { EditOutlined } from "@ant-design/icons";
import { DeleteCompanyButton } from "@/features/Companies/DeleteCompanyButton";
import dayjs from "dayjs";

export const StatusMapper = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "Действующая";
    case "LIQUIDATING":
      return "Ликвидируется";
    case "LIQUIDATED":
      return "Ликвидирована";
    case "REORGANIZING":
      return "В процессе присоединения к другому юрлицу, с последующей ликвидацией";
    case "BANKRUPT":
      return "Банкрот";
  }
};

const columns: TableProps<Company>["columns"] = [
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
    render: (text, fields) => (
      <Flex vertical gap={8}>
        <Typography.Text>{text}</Typography.Text>
        <Flex gap={4}>
          <Typography.Text
            type={"secondary"}
            style={{ fontSize: 10 }}
          >{`ИНН ${fields.inn} | КПП ${fields.kpp} | ОГРН ${fields.ogrn}`}</Typography.Text>
        </Flex>
      </Flex>
    ),
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
    render: (text, fields) => (
      <Flex vertical gap={4}>
        <Typography.Text
          style={{
            border:
              fields.status === "ACTIVE"
                ? "solid 1px green"
                : "solid 1px tomato",
            borderRadius: 12,
            color: fields.status === "ACTIVE" ? "green" : "tomato",
            textAlign: "center",
            fontSize: 12,
          }}
        >
          {StatusMapper(text)}
        </Typography.Text>
        <Typography.Text
          style={{ fontSize: 10, color: "darkorange", textAlign: "center" }}
        >
          {`Актуальность ${dayjs(fields.actualityDate).format("DD.MM.YYYY")}`}
        </Typography.Text>
      </Flex>
    ),
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
