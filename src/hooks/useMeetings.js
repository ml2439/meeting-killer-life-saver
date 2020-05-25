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
          setMeetings(
            snapshot.docs.map(doc => {
              return { id: doc.id, meeting: doc.data() }
            })
          )
        },
        error => {
          setError(error)
        }
      )
    return () => unsubscribe()
  }, [])

  return [meetings, error]
}
