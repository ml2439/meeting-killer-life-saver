import React from "react"
import { MyLayout } from "../components/layout"
import { SEO } from "../components/seo"
import { MeetingList } from "../components/meeting/meetingList"
import { MeetingContainer } from "../components/meeting/MeetingContainer"

const Meetings = () => {
  return (
    <>
      <SEO title="Meetings" />
      <MyLayout>
        <MeetingContainer>
          <MeetingList />
        </MeetingContainer>
      </MyLayout>
    </>
  )
}

export default Meetings
