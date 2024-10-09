"use client";
import { AppHeader } from "@/shared/UI/AppHeader";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Layout, theme } from "antd";
import { AppMenu } from "@/shared/UI/AppMenu";
import { AppFooter } from "@/shared/UI/AppFooter";
import { LayoutSiderScreenStyle } from "@/app/(private-routes)/layoutSiderScreenStyle";
import useBreakpoint from "@/shared/hooks/useBreakpoints/useBreakPoints";

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
  const breakpoints = useBreakpoint();

  return (
    <Layout>
      <Header
        style={{
          height: breakpoints.xs || breakpoints.sm ? 50 : 70,
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
            style={LayoutSiderScreenStyle().cssProperties}
            {...LayoutSiderScreenStyle().componentProps}
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
          height: breakpoints.xs || breakpoints.sm ? 50 : 70,
          alignContent: "center",
        }}
      >
        <AppFooter />
      </Footer>
    </Layout>
  );
}
