import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { CompaniesPageUI } from "@/widgets/CompaniesPageUI";

export default async function CompaniesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/denied");
  }

  return <CompaniesPageUI />;
}
