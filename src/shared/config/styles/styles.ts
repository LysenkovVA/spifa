import { CSSProperties } from "react";

export interface ScreenStyle<ComponentProps> {
  cssProperties: CSSProperties;
  componentProps: ComponentProps;
}
