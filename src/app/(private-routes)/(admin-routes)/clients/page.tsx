import { checkDBAdminAccess } from "@/shared/auth/checkDBAdminAccess";
import { ClientsWidget } from "../../../../widgets/ClientsWidget";

export default async function ClientsPage() {
  await checkDBAdminAccess();

  return <ClientsWidget />;
}
