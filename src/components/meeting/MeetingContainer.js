import React from "react"
import {  Row, Col } from "antd"

export const MeetingContainer = ({children}) => {
  return (
    <Row>
      <Col
        xs={{ span: 20, offset: 2 }}
        sm={{ span: 16, offset: 4 }}
        md={{ span: 14, offset: 5 }}
        lg={{ span: 12, offset: 6 }}
        xl={{ span: 10, offset: 7 }}
        xxl={{ span: 8, offset: 8 }}
      > 
      {children}
      </Col>
    </Row>
  )
}
