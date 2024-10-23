"use client";

import { Input } from "antd";
import { CSSProperties, memo } from "react";

export interface DigitInputProps {
  value?: string;
  onChange?: (value: string) => void;
  length?: number;
  style?: CSSProperties;
}

/**
 * Контрол для номерных значений
 * @param props
 * @constructor
 */
const DigitInput = (props: DigitInputProps) => {
  const { value, onChange, length = 5, style } = props;
  return (
    <Input.OTP
      style={style}
      value={value}
      onChange={onChange}
      length={length}
      onKeyDown={(event) => {
        const KeyID = event.code;
        switch (KeyID) {
          case "Backspace":
            break;
          case "Delete":
            break;
          default:
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
            break;
        }
      }}
    />
  );
};

export default memo(DigitInput);
