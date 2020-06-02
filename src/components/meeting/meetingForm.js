import React from "react"
import {
  Form,
  Input,
  Button,
  notification,
  TimePicker,
  InputNumber,
} from "antd"
import firebase from "gatsby-plugin-firebase"
import { Meeting, meetingConverter } from "../../data/meeting"
import { camelCase } from "../../utils/massager"
import { useUser } from "../../hooks/useUser"

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}

const fields = {
  name: {
    label: "Name",
    name: "name",
    rules: [
      {
        required: true,
        message: "Please input your meeting name",
      },
    ],
  },
  duration: {
    label: "Duration (minutes)",
    name: "duration",
    rules: [
      {
        required: true,
        message: "Please input your meeting duration",
      },
    ],
  },
  start: {
    label: "Start Time",
    name: "start",
    rules: [
      {
        required: true,
        message: "Please input your meeting start time",
      },
    ],
  },
}

export const MeetingForm = props => {
  const user = useUser()
  const initialValues = props.meeting
    ? {
        name: props.meeting.name,
        duration: props.meeting.duration,
        start: props.meeting.getStartMoment(),
      }
    : null

  const handleSubmit = async ({ name, start, ...fields }) => {
    const newMeeting = new Meeting({
      name,
      author: user.uid,
      startHour: start.hour(),
      startMinute: start.minute(),
      ...fields,
    })

    try {
      await firebase
        .firestore()
        .collection("meetings")
        .doc(camelCase(name))
        .withConverter(meetingConverter)
        .set(newMeeting)

      notification.success({
        message: `Successfully created meeting: ${name}`,
      })
      props.onSubmitSuccess()
    } catch (error) {
      notification.error({
        message: `Failed submitting meeting: ${name}. ${error}`,
      })
    }
  }

  return (
    <Form
      {...layout}
      name="meeting-editor"
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Form.Item {...fields.name}>
        <Input disabled={!!initialValues} />
      </Form.Item>
      <Form.Item {...fields.start}>
        <TimePicker format="HH:mm" />
      </Form.Item>
      <Form.Item {...fields.duration}>
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
