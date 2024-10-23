import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { Flex } from "antd";
import BillSvg from "@/shared/assets/svg/bill.svg";
import { SVGImage } from "@/shared/UI/SVGImage";

export default async function TestPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/denied");
  }

  return (
    <Flex vertical gap={16}>
      {"Эта страница для тестов"}
      {/*<AppIcon component={BillSvg} />*/}
      {/*<Image src={BillSvg} alt="Bill" width={256} height={256} />*/}
      <SVGImage SVG={BillSvg} width={48} height={48} />
    </Flex>
  );
}
