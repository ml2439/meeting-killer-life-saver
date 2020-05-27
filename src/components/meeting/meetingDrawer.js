import React, { useState } from "react"
import { Drawer, Button } from "antd"
import { MeetingForm } from "./meetingForm"

export const MeetingDrawer = props => {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const button = props.meeting ? (
    <Button type="link" onClick={showDrawer}>
      Edit
    </Button>
  ) : (
    <Button type="primary" onClick={showDrawer}>
      Add a Meeting
    </Button>
  )

  return (
    <>
      {button}
      <Drawer
        width={`50%`}
        title="Meeting Editor"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <MeetingForm meeting={props.meeting} onSubmitSuccess={onClose} />
      </Drawer>
    </>
  )
}
