import { checkDBAdminAccess } from "@/shared/auth/checkDBAdminAccess";
import { ClientsPageUI } from "@/widgets/ClientsPageUI";

export default async function ClientsPage() {
  await checkDBAdminAccess();

  return <ClientsPageUI />;
}
