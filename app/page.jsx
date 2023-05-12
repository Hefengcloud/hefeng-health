'use client'

import { Breadcrumb, Layout, Menu, theme } from "antd";
import Questionnaire from "./questionnaire";
const { Header, Content, Footer } = Layout;

export default function Home() {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: 1,
              label: '首页'
            },
          ]}
        />
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>健康</Breadcrumb.Item>
          <Breadcrumb.Item>工具</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <Questionnaire />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        和风健康
      </Footer>
    </Layout>
  );
}