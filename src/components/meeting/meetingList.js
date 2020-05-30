import React from "react"
import { useMeetings } from "../../hooks/useMeetings"
import { List, Alert, Spin } from "antd"
import { MeetingDrawer } from "./meetingDrawer"

export const MeetingList = () => {
  const [meetings, error, isLoading] = useMeetings()

  if (isLoading) {
    return <Spin />
  }
  if (error) {
    return <Alert message={error.message} type="error" />
  }
  if (!meetings || meetings.length === 0) {
    return <Alert message="No meetings found" type="warning" />
  }
  return (
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
