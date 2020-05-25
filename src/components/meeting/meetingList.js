import React from "react"
import { useMeetings } from "../../hooks/useMeetings"
import { camelCase } from "../../utils/camelCase"

export const MeetingList = () => {
  const [meetings, error] = useMeetings()

  return (
    <>
      {error && <div>{error.message}</div>}
      {!error && meetings && (
        <ul>
          {meetings.map(
            meeting =>
              !!meeting.name && (
                <li key={camelCase(meeting.name)}>{meeting.toString()}</li>
              )
          )}
        </ul>
      )}
    </>
  )
}
