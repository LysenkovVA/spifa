"use client";
import { AppHeader } from "@/widgets/AppHeader";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Flex, Layout, theme } from "antd";
import { AppFooter } from "@/widgets/AppFooter";
import useScreenWidth from "@/shared/hooks/useScreenWidth/useScreenWidth";
import { CSSProperties, ReactNode } from "react";
import { ContentWrapper } from "@/shared/UI/ContentWrapper";
import { AppMenu } from "@/widgets/AppMenu";

const AVATAR_SIZE = 50;

/**
 * Layout для страниц авторизованного пользователя
 * @param children
 * @constructor
 */
export default function UserLayout({ children }: { children: ReactNode }) {
  const { token } = theme.useToken();
  const screenWidth = useScreenWidth();

  const appMenuStyle: CSSProperties = {
    background: "whitesmoke",
    borderRadius: "12px 0px 0px 12px",
    borderColor: token.colorBorder,
    paddingTop: 0,
    marginTop: 0,
    // flex: 1,
    position: "absolute",
    width: "calc(100%)",
    height: `calc(100vh - 2 * ${token.Layout?.headerHeight}px)`,
  };

  return (
    <Layout style={{ background: "#3E5B87" }}>
      <Header
        style={{
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
        <Layout style={{ borderRadius: "0px 12px 12px 0px" }}>
          <Sider
            style={{
              height: `calc(100vh - 2 * ${token.Layout?.headerHeight}px)`,
            }}
            width={200}
          >
            <Flex>
              {/*<AppHeaderAvatar*/}
              {/*  style={{*/}
              {/*    width: "100%",*/}
              {/*    position: "relative",*/}
              {/*    zIndex: 1,*/}
              {/*    top: 5,*/}
              {/*  }}*/}
              {/*  avatarSize={AVATAR_SIZE}*/}
              {/*/>*/}
              <AppMenu style={appMenuStyle} />
            </Flex>
          </Sider>
          <ContentWrapper
            style={{
              height: `calc(100vh - 2 * ${token.Layout?.headerHeight}px - 16px)`,
              margin: 8,
            }}
            align={"top"}
            justify={"start"}
          >
            {children}
          </ContentWrapper>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          color: "whitesmoke",
          height: 70,
          alignContent: "center",
        }}
      >
        <AppFooter />
      </Footer>
    </Layout>
  );
}
