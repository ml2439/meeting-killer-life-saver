import React from "react"
import firebase from "gatsby-plugin-firebase"
import { Button, notification } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { useUser } from "../../hooks/useUser"
import { Meeting } from "../../data/meeting"

export const DeleteMeeting = props => {
  const user = useUser()

  const handleDelete = () => {
    firebase
      .firestore()
      .collection(Meeting.COLLECTION_ID)
      .doc(props.meeting?.id)
      .delete()
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
      disabled={!user || props.meeting?.author !== user?.uid}
    />
  )
}
