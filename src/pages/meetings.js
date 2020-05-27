import React from "react"
import { MyLayout } from "../components/layout"
import { SEO } from "../components/seo"
import { MeetingList } from "../components/meeting/meetingList"

const Meetings = () => {
  return (
    <>
      <SEO title="Meetings" />
      <MyLayout>
        <MeetingList />
      </MyLayout>
    </>
  )
}

export default Meetings
