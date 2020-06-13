import { useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"
import { createNewUser } from "../server/user/userFirestore"

export const useUser = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user)
      if (user) {
        createNewUser({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
        })
      }
    })
    return () => unsubscribe()
  }, [])

  return user
}
