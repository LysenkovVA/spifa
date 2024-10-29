import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import ru_RU from "antd/lib/locale/ru_RU";
import dayjs from "dayjs";
import { primaryTheme } from "@/shared/config/themes/primaryTheme";
import { StoreProvider } from "@/shared/lib/StoreProvider";
import { SessionProvider } from "next-auth/react";
import { ContentWrapper } from "../shared/UI/ContentWrapper";

// для локализации календаря
dayjs.locale("ru");

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  preload: false,
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  preload: false,
});

export const metadata: Metadata = {
  title: "СПИФА",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider>
          <StoreProvider>
            {/*Ant Design config provider*/}
            <ConfigProvider locale={ru_RU} theme={primaryTheme}>
              <AntdRegistry>
                <ContentWrapper height={"100vh"}>{children}</ContentWrapper>
              </AntdRegistry>
            </ConfigProvider>
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
