import { ScreenStyle } from "@/shared/config/styles/styles";
import { SiderProps, theme } from "antd";
import useBreakpoint from "@/shared/hooks/useBreakpoints/useBreakPoints";

export const LayoutSiderScreenStyle = (): ScreenStyle<SiderProps> => {
  const screenWidth = useBreakpoint();
  const { token } = theme.useToken();

  return {
    cssProperties: {
      borderColor: token.colorBorder,
      borderRadius: token.borderRadius,
      borderWidth: 1,
      height: `calc(100vh - 2 * ${token.Layout?.headerHeight}px - 16px)`,
      margin: "8px 0px 8px 8px",
    },
    componentProps: {
      width: (() => {
        if (screenWidth.xs) return 50;
        if (screenWidth.sm) return 100;
        if (screenWidth.md) return 150;
        if (screenWidth.lg || screenWidth.xl) return 200;

        // По умолчанию
        return 100;
      })(),
    },
  };
};
