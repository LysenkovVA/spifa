"use client";

import { Flex, TableProps, Typography } from "antd";
import { Company, companyDetailsReducer } from "@/entities/Company";
import dayjs from "dayjs";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { memo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/shared/lib/StoreProvider";
import { useSelector } from "react-redux";
import {
  companiesActions,
  fetchCompaniesService,
  getCompanies,
  getCompaniesHasMore,
  getCompaniesIsInitialized,
  getCompaniesSkip,
  getCompaniesTake,
  getCompaniesTotalCount,
} from "@/features/Companies/CompaniesTable";
import { InfiniteTable } from "@/features/InfiniteTable";

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
  // {
  //   title: "",
  //   dataIndex: "actions",
  //   key: "actions",
  //   width: "40px",
  //
  //   render: (_, record) => (
  //     <Space size={"small"}>
  //       <EditCompanyButton
  //         companyId={record.id}
  //         title={""}
  //         icon={<EditOutlined />}
  //       />
  //       <DeleteCompanyButton companyId={record.id} />
  //     </Space>
  //   ),
  // },
];

const reducers: ReducersList = {
  companyDetails: companyDetailsReducer,
};

export interface CompanyTableProps {
  height: string | number | undefined;
}

const CompaniesTable = memo((props: CompanyTableProps) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const companiesData = useSelector(getCompanies.selectAll);
  const hasMore = useSelector(getCompaniesHasMore);
  const take = useSelector(getCompaniesTake);
  const skip = useSelector(getCompaniesSkip);
  const totalCount = useSelector(getCompaniesTotalCount);
  const isInitialized = useSelector(getCompaniesIsInitialized);

  // TODO Сделать useInitialEffect для отработки одного раза
  useEffect(() => {
    if (!isInitialized) {
      dispatch(fetchCompaniesService({ replaceData: true }));
    }
  }, []);

  const loadNextPart = useCallback(() => {
    if (hasMore) {
      dispatch(companiesActions.setSkip(skip + take));
      dispatch(fetchCompaniesService({ replaceData: false }));
    }
  }, [dispatch, hasMore, skip, take]);

  const onAddRecord = useCallback(() => {
    router.push("/companies/new");
  }, [router]);

  const onEditClick = useCallback(
    (client: Company) => {
      router.push(`/companies/${client.id}`);
    },
    [router],
  );

  return (
    <DynamicModuleLoader reducers={reducers}>
      <InfiniteTable<Company>
        style={{ width: "100%" }}
        title={"Компании"}
        columns={columns}
        data={companiesData}
        scrollHeight={props.height}
        dataLength={totalCount}
        hasMore={hasMore}
        loadNextPartCallback={loadNextPart}
        onAddRecord={onAddRecord}
        onRowClick={onEditClick}
      />
    </DynamicModuleLoader>
  );
});

export default CompaniesTable;
