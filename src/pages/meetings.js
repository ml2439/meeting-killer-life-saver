import React from "react"
import { MyLayout } from "../components/layout"
import { SEO } from "../components/seo"
import { MeetingForm } from "../components/meeting/meetingForm"
import { MeetingList } from "../components/meeting/meetingList"

const Meetings = () => {
  return (
    <>
      <SEO title="Meetings" />
      <MyLayout>
        <MeetingForm />
        <MeetingList />
      </MyLayout>
    </>
  )
}

export default Meetings
