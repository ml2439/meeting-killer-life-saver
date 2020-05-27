import React from "react"
import { useMeetings } from "../../hooks/useMeetings"
import { List, Alert, Row, Col } from "antd"
import { MeetingDrawer } from "./meetingDrawer"

export const MeetingList = () => {
  const [meetings, error] = useMeetings()

  let toRender
  if (error) {
    toRender = <Alert message={error.message} type="error" />
  } else if (!meetings || meetings.length === 0) {
    toRender = <Alert message="No meetings found" type="warning" />
  } else {
    toRender = (
      <List
        size="small"
        bordered={false}
        dataSource={meetings}
        footer={<MeetingDrawer />}
        renderItem={item => (
          <List.Item actions={[<MeetingDrawer meeting={item.meeting} />]}>
            <List.Item.Meta
              title={item.meeting.name}
              description={item.meeting.toString()}
            />
          </List.Item>
        )}
      />
    )
  }

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
        {toRender}
      </Col>
    </Row>
  )
}
