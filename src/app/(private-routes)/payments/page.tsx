import { Alert } from "antd";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

export default async function PaymentsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/denied");
  }

  return (
    <Alert
      message="В разработке"
      description="Здесь будут заявки на оплату"
      type="info"
      showIcon
    />
  );
}
