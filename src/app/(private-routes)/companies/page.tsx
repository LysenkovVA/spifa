import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { CompaniesWidget } from "../../../widgets/CompaniesWidget";

export default async function CompaniesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/denied");
  }

  return <CompaniesWidget />;
}
