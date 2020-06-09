import { useState, useEffect } from "react"
import { queryUnarchivedMeetings } from "../server/meeting/meetingFirestore"

export const useMeetings = () => {
  const [meetings, setMeetings] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = queryUnarchivedMeetings(
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
