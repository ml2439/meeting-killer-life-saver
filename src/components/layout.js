import React from "react"
import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"
import { Link, graphql, useStaticQuery } from "gatsby"
import { Layout, Menu } from "antd"
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
const Logo = styled.div`
  height: 31px;
  line-height: 31px;
  margin: 16px 28px 16px 0;
  float: left;
  color: white;
`
const SignInContainer = styled.div`
  height: 31px;
  line-height: 31px;
  margin: 16px 28px 16px 0;
  float: right;
`

export const MyLayout = ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
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
          <Link to="/">
            <Logo>{data.site.siteMetadata.title}</Logo>
          </Link>
          <SignInContainer>
            <SignIn />
          </SignInContainer>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="meetings">
              <Link to="/meetings">Meetings</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "2rem 0", background: "white" }}>
          {children}
        </Content>
        <Footer>
          {`${
            data.site.siteMetadata.title
          }, COVID-19 Edition © ${new Date().getFullYear()}, Mengqiao`}
        </Footer>
      </Layout>
    </>
  )
}
