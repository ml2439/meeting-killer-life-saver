import React, { useState } from "react"
import { Select, Row, Col } from "antd"
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
    <Row justify="center" align="middle">
      <Col xs={24} md={6}>
        <Select
          showSearch
          placeholder="Select a meeting"
          style={{ width: "100%" }}
          onChange={handleChange}
        >
          {meetings.map(m => (
            <Option value={m.id} key={m.id}>
              {m.meeting.name}
            </Option>
          ))}
        </Select>
      </Col>
      <Col xs={24} md={8}>
        {!!selected && (
          <ProgressStatus
            duration={selected.duration}
            startHour={selected.startHour}
            startMinute={selected.startMinute}
          />
        )}
      </Col>
    </Row>
  )
}
