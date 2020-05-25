import { useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"

export const useUserStatus = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user)
    })
    return () => unsubscribe()
  }, [])

  return isSignedIn
}
