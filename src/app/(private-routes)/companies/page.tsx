import { Breadcrumb } from "antd";
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from "antd/es/breadcrumb/Breadcrumb";
import { CompaniesTable } from "@/features/Companies/CompaniesTable";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

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

export default async function CompaniesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/denied");
  }

  return (
    <>
      <Breadcrumb
        style={{ paddingBottom: 16 }}
        items={breadcrumbs}
        separator={">"}
      />
      <CompaniesTable data={undefined} />
    </>
  );
}
