import React from "react"
import { MyLayout } from "../components/layout"
import { SEO } from "../components/seo"
import { SignIn } from "../components/signIn"
import { MeetingForm } from "../components/meeting/meetingForm"
import { MeetingList } from "../components/meeting/meetingList"

const Meetings = () => {
  return (
    <>
      <SEO title="Meetings" />
      <MyLayout>
        <SignIn />
        <MeetingForm />
        <MeetingList />
      </MyLayout>
    </>
  )
}

export default Meetings
