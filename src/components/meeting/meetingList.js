import React from "react"
import { useMeetings } from "../../hooks/useMeetings"
import { List, Alert } from "antd"
import { MeetingDrawer } from "./meetingDrawer"

export const MeetingList = () => {
  const [meetings, error, isLoading] = useMeetings()

  if (error) {
    return <Alert message={error.message} type="error" />
  }

  return (
    <List
      size="small"
      bordered={false}
      loading={isLoading}
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
