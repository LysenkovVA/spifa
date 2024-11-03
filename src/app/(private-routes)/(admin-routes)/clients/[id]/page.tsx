import { checkDBAdminAccess } from "@/shared/auth/checkDBAdminAccess";
import { ClientDetailsWidget } from "../../../../../widgets/ClientDetailsWidget";

interface ClientDetailsPageProps {
  params: { id: string };
}

export default async function ClientDetailsPage({
  params,
}: ClientDetailsPageProps) {
  await checkDBAdminAccess();

  if (params.id === "new") {
    return <ClientDetailsWidget id={undefined} />;
  }

  return <ClientDetailsWidget id={params.id} />;
}
