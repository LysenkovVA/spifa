import { Flex, Tag } from "antd";
import { ReactNode } from "react";

export const customizeRequiredMark = (
  label: ReactNode,
  { required }: { required: boolean },
) => (
  <Flex align={"center"} gap={4}>
    {label}
    {required ? (
      <Tag style={{ fontSize: 8 }} color="error">
        обязательно
      </Tag>
    ) : null}
  </Flex>
);
