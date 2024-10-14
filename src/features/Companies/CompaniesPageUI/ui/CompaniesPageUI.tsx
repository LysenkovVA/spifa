"use client";

import { CompaniesTable } from "@/features/Companies/CompaniesTable";
import { PageWrapper } from "@/shared/UI/PageWrapper";
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from "antd/es/breadcrumb/Breadcrumb";
import { AddCompanyButton } from "@/features/Companies/AddCompanyButton";

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

const CompaniesPageUI = () => {
  return (
    <>
      <PageWrapper
        breadcrumbs={breadcrumbs}
        actions={[<AddCompanyButton key={"1"} />]}
      >
        <CompaniesTable data={undefined} />
      </PageWrapper>
    </>
  );
};

export default CompaniesPageUI;
