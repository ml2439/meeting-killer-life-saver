import React from "react"
import { Button, notification } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { useUser } from "../../hooks/useUser"
import { archiveMeeting } from "../../server/meeting/meetingFirestore"

export const DeleteMeeting = props => {
  const user = useUser()

  const handleDelete = () => {
    archiveMeeting(props.meeting?.id)
      .then(() => {
        notification.success({
          message: `Successfully deleted meeting: ${props.meeting?.name}`,
        })
      })
      .catch(error => {
        notification.error({
          message: `Failed deleting meeting: ${props.meeting?.name}`,
          description: error.message,
        })
      })
  }

  return (
    <Button
      type="link"
      icon={<DeleteOutlined />}
      onClick={handleDelete}
      disabled={!user || props.meeting?.host !== user?.uid}
    />
  )
}
