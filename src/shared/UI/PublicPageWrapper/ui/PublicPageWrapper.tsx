import { memo, ReactNode } from "react";
import { Row } from "antd";

export interface PublicPageWrapperProps {
  children?: ReactNode;
}

export const PublicPageWrapper = memo((props: PublicPageWrapperProps) => {
  const { children } = props;

  return (
    <Row style={{ height: "100vh" }} align={"middle"} justify={"center"}>
      {children}
    </Row>
  );
});
