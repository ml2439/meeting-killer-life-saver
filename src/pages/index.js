import React from "react"
import { MyLayout } from "../components/layout"
import { SEO } from "../components/seo"
import { MeetingProgress } from "../components/meetingProgress"

const Index = () => {
  return (
    <>
      <SEO />
      <MyLayout>
        <MeetingProgress />
      </MyLayout>
    </>
  )
}

export default Index
