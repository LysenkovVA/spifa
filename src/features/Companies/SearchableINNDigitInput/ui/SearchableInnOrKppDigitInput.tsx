import React, { CSSProperties, useCallback, useState } from "react";
import { Button, Flex } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { DigitInput } from "@/shared/UI/DigitInput";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { DaDataCompanyResponse } from "@/entities/Company";
import { Suggestion } from "@/entities/Company/model/types/DaDataCompanyInterfaces";
import { findCompanyByINNOrKPPAction } from "@/entities/Company/model/actions/findCompanyByINNOrKPPAction";

export interface SearchableINNProps {
  style?: CSSProperties;
  value?: string;
  digitsCount: number;
  onChange?: (value: string | undefined) => void;
  onGetSearchResult?: (value: Suggestion | undefined) => void;
}

const SearchableInnOrKppDigitInput = (props: SearchableINNProps) => {
  const { style, value, onChange, onGetSearchResult, digitsCount } = props;

  const [isSearching, setIsSearching] = useState(false);
  // // const [data, setData] = useState<DaDataCompanyResponse | undefined>(
  //   undefined,
  // );

  const handleSearch = useCallback(
    (value: string | undefined) => {
      if (value) {
        try {
          // setIsSearching(true);

          findCompanyByINNOrKPPAction(value).then(
            (result: ServerResponse<DaDataCompanyResponse | undefined>) => {
              if (result.isOk) {
                // setData(result.data);
                onGetSearchResult?.(result.data?.suggestions?.[0]);
              }
            },
          );

          setIsSearching(false);
        } catch (error) {}
      }
    },
    [onGetSearchResult],
  );

  return (
    <Flex style={style} gap={4}>
      <DigitInput value={value} onChange={onChange} length={digitsCount} />

      <Button
        icon={<SearchOutlined />}
        disabled={isSearching || value?.length !== digitsCount}
        loading={isSearching}
        onClick={() => handleSearch(value)}
      >
        {"Найти"}
      </Button>
    </Flex>
  );
};

export default SearchableInnOrKppDigitInput;
