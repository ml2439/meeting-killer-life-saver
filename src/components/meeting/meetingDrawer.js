import React, { useState } from "react"
import { Drawer, Button } from "antd"
import { MeetingForm } from "./meetingForm"

export const MeetingDrawer = () => {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  return (
    <>
      <Button type="link" onClick={showDrawer}>
        Edit
      </Button>
      <Drawer
        width={`50%`}
        title="Meeting Editor"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <MeetingForm />
      </Drawer>
    </>
  )
}
