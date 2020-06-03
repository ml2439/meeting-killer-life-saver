import React, { useState } from "react"
import { Drawer, Button } from "antd"
import { MeetingForm } from "./meetingForm"
import { useUser } from "../../hooks/useUser"
import { EditOutlined, PlusOutlined } from "@ant-design/icons"

export const MeetingDrawer = props => {
  const [visible, setVisible] = useState(false)
  const user = useUser()

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const button = props.meeting ? (
    <Button
      type="link"
      icon={<EditOutlined />}
      onClick={showDrawer}
      disabled={!user || props.meeting.author !== user?.uid}
    />
  ) : (
    <Button
      type="link"
      icon={<PlusOutlined />}
      size="large"
      onClick={showDrawer}
      disabled={!user}
    >
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
