import React from "react"
import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"
import { Link, graphql, useStaticQuery } from "gatsby"
import { Layout, Menu, Button, Popover, Divider } from "antd"
import { UnorderedListOutlined } from "@ant-design/icons"
import { SignIn } from "./signIn"

const { Header, Content, Footer } = Layout

const globalCss = css`
  * {
    box-sizing: border-box;
    font-family: Gill Sans, sans-serif;
  }
  body {
    margin: 0;
  }
`
const breakpoint = 768 // iPad width, antd md width
export const MediaNonMobile = styled.div`
  @media (max-width: ${breakpoint - 1}px) {
    display: none;
  }
`
export const MediaMobile = styled.div`
  @media (min-width: ${breakpoint}px) {
    display: none;
  }
`
const Logo = styled.div`
  height: 31px;
  line-height: 31px;
  margin: 16px 28px 16px 0;
  float: left;
  color: white;
`
const TopRightContainer = styled.div`
  height: 31px;
  line-height: 31px;
  margin: 16px 0;
  float: right;
`
const responsiveMenu = (mode, theme) => (
  <Menu mode={mode} theme={theme} style={{ border: "none" }}>
    <Menu.Item key="home" title="Home">
      <Link to="/">Home</Link>
    </Menu.Item>
    <Menu.Item key="meetings" title="Meetings">
      <Link to="/meetings">Meetings</Link>
    </Menu.Item>
  </Menu>
)

export const MyLayout = ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            titleShort
            author
          }
        }
      }
    `
  )

  return (
    <>
      <Global styles={globalCss} />
      <Layout style={{ minHeight: "100vh" }}>
        <Header>
          <MediaNonMobile>
            <Link to="/">
              <Logo>{data.site.siteMetadata.title}</Logo>
            </Link>
            <TopRightContainer>
              <SignIn />
            </TopRightContainer>
            {responsiveMenu("horizontal", "dark")}
          </MediaNonMobile>
          <MediaMobile>
            <Link to="/">
              <Logo>{data.site.siteMetadata.titleShort}</Logo>
            </Link>
            <TopRightContainer>
              <Popover
                placement="bottomRight"
                content={
                  <>
                    {responsiveMenu("vertical-right")}
                    <Divider style={{ margin: "12px 0" }} />
                    <SignIn />
                  </>
                }
                trigger="click"
              >
                <Button
                  type="link"
                  icon={<UnorderedListOutlined style={{ color: "white" }} />}
                />
              </Popover>
            </TopRightContainer>
          </MediaMobile>
        </Header>
        <Content style={{ padding: "2rem 0", background: "white" }}>
          {children}
        </Content>
        <Footer>
          {`${
            data.site.siteMetadata.title
          }, COVID-19 Edition © ${new Date().getFullYear()}, ${
            data.site.siteMetadata.author
          }`}
        </Footer>
      </Layout>
    </>
  )
}
