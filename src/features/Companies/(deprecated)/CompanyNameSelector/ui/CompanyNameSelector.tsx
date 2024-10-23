"use client";

import { Flex, Select, SelectProps, Typography } from "antd";
import { CSSProperties, useState } from "react";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { DaDataCompanyResponse } from "@/entities/Company";
import { findCompanyByNameAction } from "@/entities/Company/model/actions/findCompanyByName.action";
import { Suggestion } from "@/entities/Company/model/types/DaDataCompanyInterfaces";

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

const fetch = (
  value: string,
  callback: (data: { value: string; text: string }[]) => void,
  callbackRealData: (realData: DaDataCompanyResponse | undefined) => void,
  errorCallback: (errors: string[] | undefined) => void,
) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  const fake = () => {
    findCompanyByNameAction(value).then(
      (result: ServerResponse<DaDataCompanyResponse | undefined>) => {
        if (!result.isOk) {
          errorCallback(result.errorMessages);
        } else {
          if (currentValue === value) {
            callbackRealData(result.data);
            const data = result.data?.suggestions?.map((suggestion) => ({
              value: suggestion.value,
              text: suggestion.value,
            }));
            // console.log("Setting data: ", JSON.stringify(data, null, 2));
            callback(data ?? []);
          }
        }
      },
    );
  };
  if (value) {
    timeout = setTimeout(fake, 1000);
  } else {
    callback([]);
  }
};

export interface CompanyNameSelectorProps {
  placeholder?: string;
  style?: CSSProperties;
  value?: string;
  onChange?: (value: string) => void;
  onSelectChange?: (value: Suggestion | undefined) => void;
}

/**
 * @deprecated
 * @param props
 * @constructor
 */
const CompanyNameSelector = (props: CompanyNameSelectorProps) => {
  const { onChange, onSelectChange } = props;

  const [data, setData] = useState<SelectProps["options"]>([]);
  const [realData, setRealData] = useState<DaDataCompanyResponse>();
  const [value, setValue] = useState<string | undefined>(props.value);
  const [errors, setErrors] = useState<string[] | undefined>([]);

  const handleSearch = (newValue: string) => {
    fetch(newValue, setData, setRealData, setErrors);
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <Flex gap={4} style={props.style}>
      <Select
        showSearch
        value={value}
        placeholder={props.placeholder}
        style={{ width: "100%" }}
        defaultActiveFirstOption={false}
        suffixIcon={null}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        onSelect={(value) => {
          if (value) {
            onSelectChange?.(
              realData?.suggestions.find((sug) => sug.value === value),
            );
          }
        }}
        labelRender={(props) => props.value}
        notFoundContent={null}
        options={(realData?.suggestions || []).map((d) => ({
          value: d.value,
          label: (
            <Flex vertical gap={0}>
              <Typography.Text>{d.value}</Typography.Text>
              <Typography.Text
                style={{ fontSize: 10 }}
                type={"secondary"}
              >{`ИНН ${d.data.inn}`}</Typography.Text>
            </Flex>
          ),
        }))}
      />
      {/*<Button type={"default"} icon={<SearchOutlined />}>*/}
      {/*  {"Найти"}*/}
      {/*</Button>*/}
    </Flex>
  );
};

export default CompanyNameSelector;
