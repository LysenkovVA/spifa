import { memo, ReactNode } from "react";
import { Col, Row, RowProps } from "antd";

export interface PublicPageWrapperProps extends Omit<RowProps, "children"> {
  children?: ReactNode;
  height?: string | number | undefined;
}

/**
 * Обертка для контента для выравнивания по ширине на 100%
 * Высота по умолчанию: 100vh
 */
export const ContentWrapper = memo((props: PublicPageWrapperProps) => {
  const { children, style, height, ...restProps } = props;

  return (
    <Row
      style={{
        ...style,
        width: "100%",
        height,
      }}
      align={"middle"}
      justify={"center"}
      {...restProps}
    >
      <Col span={24}>{children}</Col>
    </Row>
  );
});
