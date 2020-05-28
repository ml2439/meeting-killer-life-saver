import React, { useState } from "react"
import { Select, Row, Space, Card } from "antd"
import { useMeetings } from "../hooks/useMeetings"
import { ProgressStatus } from "./progressStatus"

const { Option } = Select

export const MeetingProgress = () => {
  const [meetings] = useMeetings()
  const [selected, setSelected] = useState(null)

  const handleChange = value => {
    setSelected(meetings?.find(m => m.id === value).meeting)
  }

  return (
    <Row justify="center" align="top">
      <Space direction="vertical" align="center">
        <Select
          showSearch
          placeholder="Select a meeting"
          style={{ width: "20rem" }}
          size="large"
          onChange={handleChange}
        >
          {meetings.map(m => (
            <Option value={m.id} key={m.id}>
              {m.meeting.name}
            </Option>
          ))}
        </Select>
        {!!selected && (
          <Card style={{ width: "20rem" }} bordered={false} size="small">
            <p>{selected.toString()}</p>
          </Card>
        )}
        {!!selected && (
          <ProgressStatus
            duration={selected.duration}
            startHour={selected.startHour}
            startMinute={selected.startMinute}
          />
        )}
      </Space>
    </Row>
  )
}
