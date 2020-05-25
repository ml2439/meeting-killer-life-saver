import React from "react"
import { MyLayout } from "../components/layout"
import { SEO } from "../components/seo"

const NotFoundPage = () => {
  return (
    <>
      <SEO title="404: Not found" />
      <MyLayout>
        <h1>PAGE NOT FOUND</h1>
      </MyLayout>
    </>
  )
}

export default NotFoundPage
