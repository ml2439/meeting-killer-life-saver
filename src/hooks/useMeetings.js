import { useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"
import { Meeting, meetingConverter } from "../data/meeting"

export const useMeetings = () => {
  const [meetings, setMeetings] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(Meeting.COLLECTION_ID)
      .withConverter(meetingConverter)
      .onSnapshot(
        snapshot => {
          setMeetings(
            snapshot.docs.map(doc => {
              return { id: doc.id, meeting: doc.data() }
            })
          )
          setIsLoading(false)
        },
        error => {
          setError(error)
          setIsLoading(false)
        }
      )
    return () => unsubscribe()
  }, [])

  return [meetings, error, isLoading]
}
