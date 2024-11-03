import { CompanyDetailsWidget } from "../../../../widgets/CompanyDetailsWidget";

interface CompanyDetailsPageProps {
  params: { id: string };
}

export default async function CompanyDetailsPage({
  params,
}: CompanyDetailsPageProps) {
  if (params.id === "new") {
    return <CompanyDetailsWidget id={undefined} />;
  }

  return <CompanyDetailsWidget id={params.id} />;
}
