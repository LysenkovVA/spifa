"use client";
import { AppHeader } from "@/shared/UI/AppHeader";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Layout, theme } from "antd";
import { AppMenu } from "@/shared/UI/AppMenu";
import { AppFooter } from "@/shared/UI/AppFooter";

/**
 * Layout для страниц авторизованного пользователя
 * @param children
 * @constructor
 */
export default function UserLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { token } = theme.useToken();

  return (
    <Layout>
      <Header>
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
              margin: "8px 0px 8px 8px",
              borderRadius: token.borderRadius,
              borderWidth: 1,
              borderColor: token.colorBorder,
              height: `calc(100vh - 2 * ${token.Layout?.headerHeight}px - 16px)`,
            }}
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
          height: 70,
          paddingTop: 25,
        }}
      >
        <AppFooter />
      </Footer>
    </Layout>
  );
}
