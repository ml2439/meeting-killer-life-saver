import React, { useState } from "react"
import { Select, Row, Space } from "antd"
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
      <Space direction="vertical" size="middle" align="center">
        <Select
          showSearch
          placeholder="Select a meeting"
          style={{ width: "25rem" }}
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
