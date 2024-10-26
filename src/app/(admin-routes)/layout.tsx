"use client";
import { AppHeader } from "@/widgets/AppHeader";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Layout, theme } from "antd";
import { AppFooter } from "@/widgets/AppFooter";
import useScreenWidth from "@/shared/hooks/useScreenWidth/useScreenWidth";
import { ReactNode } from "react";
import Sider from "antd/es/layout/Sider";
import { AdminAppMenu } from "@/widgets/AdminAppMenu";

/**
 * Layout для страниц администратора БД
 * @param children
 * @constructor
 */
export default function DBAdminLayout({
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
          // height: screenWidth.xs || screenWidth.sm ? 50 : 70,
          height: 70,
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
              background: "grey",
              // width: screenWidth.xs || screenWidth.sm ? 50 : 200,
            }}
            width={150}
            // collapsed={true}
            // collapsed={screenWidth.xs || screenWidth.sm}
            // collapsedWidth={50}
          >
            <AdminAppMenu
              style={{
                background: "whitesmoke",
                flex: 1,
                borderRadius: token.borderRadius,
                borderColor: token.colorBorder,
                margin: "1px 0px 1px 1px",
                width: "calc(100% - 2px)",
                height: `calc(100vh - 2 * ${token.Layout?.headerHeight}px - 18px)`,
              }}
            />
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
          // height: screenWidth.xs || screenWidth.sm ? 50 : 70,
          height: 70,
          alignContent: "center",
        }}
      >
        <AppFooter />
      </Footer>
    </Layout>
  );
}
