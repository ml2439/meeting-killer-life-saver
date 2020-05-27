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
  const initialValues = props.meeting
    ? {
        name: props.meeting.name,
        duration: props.meeting.duration,
        start: props.meeting.getStartMoment(),
      }
    : null

  const handleSubmit = ({ name, duration, start }) => {
    const newMeeting = new Meeting(name, duration, start.hour(), start.minute())

    firebase
      .firestore()
      .collection("meetings")
      .doc(camelCase(name))
      .withConverter(meetingConverter)
      .set(newMeeting)
      .then(() => {
        notification.success({
          message: `Successfully created meeting: ${name}`,
        })
        props.onSubmitSuccess()
      })
      .catch(error => {
        notification.error({
          message: error.message,
        })
      })
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
