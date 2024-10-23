"use client";

import {
  ChangeEventHandler,
  CSSProperties,
  useCallback,
  useState,
} from "react";
import { Button, Flex, Input, List, Popover, Typography } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { findCompanyByNameAction } from "@/entities/Company/model/actions/findCompanyByName.action";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { DaDataCompanyResponse } from "@/entities/Company";
import { Suggestion } from "@/entities/Company/model/types/DaDataCompanyInterfaces";

export interface CompanyNameInputWithSearchProps {
  style?: CSSProperties;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder?: string;
  onSelectSearchResult?: (value: Suggestion | undefined) => void;
}

const CompanyNameInputWithSearch = (props: CompanyNameInputWithSearchProps) => {
  const { style, value, onChange, placeholder, onSelectSearchResult } = props;

  const [isSearching, setIsSearching] = useState(false);
  const [searchResultsOpen, setSearchResultsOpen] = useState(false);
  const [data, setData] = useState<DaDataCompanyResponse | undefined>(
    undefined,
  );

  const handleSearch = useCallback((value: string | undefined) => {
    if (value) {
      try {
        setIsSearching(true);

        findCompanyByNameAction(value).then(
          (result: ServerResponse<DaDataCompanyResponse | undefined>) => {
            if (result.isOk) {
              setData(result.data);
              setSearchResultsOpen(true);
            } else {
              setData(undefined);
            }
          },
        );

        setIsSearching(false);
      } catch (error) {}
    }
  }, []);

  const titleContent = (
    <Flex align={"center"} justify={"space-between"} gap={8}>
      {"Результаты поиска"}
      <CloseOutlined onClick={() => setSearchResultsOpen(false)} />
    </Flex>
  );

  // const searchResultsContent = (
  //   <div style={{ height: 200 }}>
  //     {data?.suggestions?.map((suggestion, index) => (
  //       <Flex key={index} vertical>
  //         <Typography.Text>{suggestion.value}</Typography.Text>
  //         <Typography.Text type={"secondary"}>
  //           {suggestion.data.inn}
  //         </Typography.Text>
  //       </Flex>
  //     ))}
  //     ;
  //   </div>
  // );
  const searchResultsContent = (
    <List
      style={{ height: 200, overflow: "auto" }}
      itemLayout="horizontal"
      dataSource={data?.suggestions}
      size={"small"}
      renderItem={(item, index) => (
        <List.Item
          key={index}
          style={{ cursor: "pointer" }}
          onClick={() => {
            onSelectSearchResult?.(item);
            setSearchResultsOpen(false);
          }}
        >
          <Flex key={index} align={"start"} justify={"space-between"}>
            <Flex vertical align={"start"} justify={"start"}>
              <Typography.Text>{item.value}</Typography.Text>
              <Typography.Text style={{ fontSize: 10 }} type={"secondary"}>
                {`ИНН ${item.data.inn}`}
              </Typography.Text>
            </Flex>
          </Flex>
        </List.Item>
      )}
    />
  );

  return (
    <Popover
      placement="topLeft"
      title={titleContent}
      open={searchResultsOpen}
      content={searchResultsContent}
    >
      <Flex style={style} gap={4}>
        <Input
          style={{ width: "100%" }}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        <Button
          icon={<SearchOutlined />}
          disabled={isSearching}
          loading={isSearching}
          onClick={() => handleSearch(value)}
        >
          {"Найти"}
        </Button>
      </Flex>
    </Popover>
  );
};

export default CompanyNameInputWithSearch;
