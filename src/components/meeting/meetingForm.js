import React from "react"
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  notification,
  TimePicker,
  InputNumber,
} from "antd"
import firebase from "gatsby-plugin-firebase"
import moment from "moment"
import { Meeting, meetingConverter } from "../../data/meeting"
import { camelCase } from "../../utils/camelCase"

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

const initialValues = {
  name: "Workflow Standup",
  duration: 30,
  start: moment("11:00", "HH:mm"),
}

export const MeetingForm = () => {
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
      })
      .catch(error => {
        notification.error({
          message: error.message,
        })
      })
  }

  return (
    <Row>
      <Col span={12} offset={6}>
        <Form
          {...layout}
          initialValues={initialValues}
          name="new-meeting"
          onFinish={handleSubmit}
        >
          <Form.Item {...fields.name}>
            <Input />
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
      </Col>
    </Row>
  )
}
