import React from "react"
import { MyLayout } from "../components/layout"
import { SEO } from "../components/seo"
import { ProgressStatus } from "../components/progressStatus"
import { Row, Col } from "antd"

const Index = () => {
  return (
    <>
      <SEO />
      <MyLayout>
        <Row justify="center" align="middle">
          <Col xs={24} sm={8}>
            <ProgressStatus />
          </Col>
        </Row>
      </MyLayout>
    </>
  )
}

export default Index
