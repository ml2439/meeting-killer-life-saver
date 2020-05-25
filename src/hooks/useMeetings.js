import { useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"
import { meetingConverter } from "../data/meeting"

export const useMeetings = () => {
  const [meetings, setMeetings] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("meetings")
      .withConverter(meetingConverter)
      .onSnapshot(
        snapshot => {
          const meetingsData = snapshot.docs.map(doc => doc.data())
          setMeetings(meetingsData)
        },
        error => {
          setError(error)
        }
      )
    return () => unsubscribe()
  }, [])

  return [meetings, error]
}
