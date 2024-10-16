"use client";

import {
  companiesReducer,
  CompaniesTable,
  fetchCompaniesService,
  getCompanies,
} from "@/features/Companies/CompaniesTable";
import { PageWrapper } from "@/shared/UI/PageWrapper";
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from "antd/es/breadcrumb/Breadcrumb";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/lib/StoreProvider";
import { useEffect } from "react";
import { EditCompanyButton } from "@/features/Companies/EditCompanyButton";
import { PlusOutlined } from "@ant-design/icons";

const breadcrumbs:
  | Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[]
  | undefined = [
  {
    title: "Списки",
    // href: "/companies",
  },
  {
    title: "Компании",
    // href: "/companies",
  },
];

const reducers: ReducersList = {
  companies: companiesReducer,
};

const CompaniesPageUI = () => {
  const dispatch = useAppDispatch();
  const companies = useSelector(getCompanies.selectAll);

  useEffect(() => {
    dispatch(fetchCompaniesService({ replaceData: true }));
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <PageWrapper
        breadcrumbs={breadcrumbs}
        actions={[
          <EditCompanyButton
            key={"1"}
            title={"Добавить"}
            type={"primary"}
            icon={<PlusOutlined />}
          />,
        ]}
      >
        <CompaniesTable data={companies} />
      </PageWrapper>
    </DynamicModuleLoader>
  );
};

export default CompaniesPageUI;
