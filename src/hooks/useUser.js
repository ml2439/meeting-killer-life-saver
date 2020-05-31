import { useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"

export const useUser = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  return user
}
