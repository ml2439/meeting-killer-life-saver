import React from "react"
import { useMeetings } from "../../hooks/useMeetings"

export const MeetingList = () => {
  const [meetings, error] = useMeetings()

  return (
    <>
      {error && <div>{error.message}</div>}
      {!error && meetings && (
        <ul>
          {meetings.map(m => (
            <li key={m.id}>{m.meeting.toString()}</li>
          ))}
        </ul>
      )}
    </>
  )
}
