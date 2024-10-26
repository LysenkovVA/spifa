"use client";

import { Input } from "antd";
import { CSSProperties, memo } from "react";

export type InputType = "default" | "otp";

export interface DigitInputProps {
  value?: string;
  onChange?: (value: string) => void;
  inputType?: InputType;
  length?: number;
  style?: CSSProperties;
}

/**
 * Контрол для номерных значений
 * @param props
 * @constructor
 */
const DigitInput = (props: DigitInputProps) => {
  const { value, onChange, inputType = "default", length = 5, style } = props;

  switch (inputType) {
    case "default":
      return (
        <Input
          style={style}
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
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

    case "otp":
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
  }
};

export default memo(DigitInput);
