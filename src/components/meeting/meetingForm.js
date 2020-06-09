import React from "react"
import {
  Form,
  Input,
  Button,
  notification,
  TimePicker,
  InputNumber,
} from "antd"
import { Meeting } from "../../models/meeting"
import { useUser } from "../../hooks/useUser"
import {
  validateMeetingName,
  setMeeting,
} from "../../server/meeting/meetingFirestore"

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

const checkName = async (rule, value) => {
  if (!value) {
    return Promise.reject()
  }

  // antd validator's callback needs to await Promise to settle
  await validateMeetingName(value)
}

const fields = {
  name: {
    label: "Name",
    name: "name",
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
  const isNewAddition = !props.meeting

  // assigning instead of pushing for newAddition to prevent adding validator multiple times
  if (isNewAddition) {
    fields.name.rules = [
      {
        required: true,
        message: "Please input your meeting name",
      },
      {
        validator: checkName,
      },
    ]
  } else {
    fields.name.rules = [
      {
        required: true,
        message: "Please input your meeting name",
      },
    ]
  }
  const initialValues = isNewAddition
    ? null
    : {
        name: props.meeting.name,
        duration: props.meeting.duration,
        start: props.meeting.getStartMoment(),
      }

  const handleSubmit = async ({ name, start, ...fields }) => {
    const newMeeting = new Meeting({
      name,
      host: user?.uid,
      startHour: start.hour(),
      startMinute: start.minute(),
      ...fields,
    })

    try {
      await setMeeting(newMeeting)

      notification.success({
        message: `Successfully ${
          isNewAddition ? "created" : "updated"
        } meeting: ${name}`,
      })

      props.onSubmitSuccess()
    } catch (error) {
      notification.error({
        message: `Failed submitting meeting: ${name}`,
        description: `${error}`,
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
      <Form.Item {...fields.name} validateTrigger="onBlur">
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
