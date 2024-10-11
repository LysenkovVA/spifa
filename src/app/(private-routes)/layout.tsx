"use client";
import { AppHeader } from "@/shared/UI/AppHeader";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Layout, theme } from "antd";
import { AppMenu } from "@/shared/UI/AppMenu";
import { AppFooter } from "@/shared/UI/AppFooter";
import useScreenWidth from "@/shared/hooks/useScreenWidth/useScreenWidth";
import { ReactNode } from "react";

/**
 * Layout для страниц авторизованного пользователя
 * @param children
 * @constructor
 */
export default function UserLayout({
  children, // will be a page or nested layout
}: {
  children: ReactNode;
}) {
  const { token } = theme.useToken();
  const screenWidth = useScreenWidth();

  return (
    <Layout>
      <Header
        style={{
          height: screenWidth.xs || screenWidth.sm ? 50 : 70,
          lineHeight: 1,
          alignContent: "center",
        }}
      >
        <AppHeader />
      </Header>
      <Content
        style={{
          height: `calc(100vh - 2 * ${token.Layout?.headerHeight}px)`,
        }}
      >
        <Layout>
          <Sider
            style={{
              borderColor: token.colorBorder,
              borderRadius: token.borderRadius,
              borderWidth: 1,
              height: `calc(100vh - 2 * ${token.Layout?.headerHeight}px - 16px)`,
              margin: "8px 0px 8px 8px",
              width: screenWidth.xs || screenWidth.sm ? 50 : 200,
            }}
            width={200}
            collapsed={screenWidth.xs || screenWidth.sm}
            collapsedWidth={50}
          >
            <AppMenu />
          </Sider>
          <main
            style={{
              margin: "8px 16px 8px 16px",
              width: "100%",
            }}
          >
            {children}
          </main>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          color: "whitesmoke",
          height: screenWidth.xs || screenWidth.sm ? 50 : 70,
          alignContent: "center",
        }}
      >
        <AppFooter />
      </Footer>
    </Layout>
  );
}
