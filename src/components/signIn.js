import React from "react"
import firebase from "gatsby-plugin-firebase"
import { useUserStatus } from "../hooks/useUserStatus"
import { Button, notification } from "antd"

export const SignIn = () => {
  const isSignedIn = useUserStatus()

  const handleSignInSignOut = () => {
    if (isSignedIn) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          notification.success({
            message: "Successfully Signed out",
          })
        })
        .catch(error => {
          notification.error({
            message: error.message,
          })
        })
    } else {
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(() => {
          notification.success({
            message: "Successfully Signed in",
          })
        })
        .catch(error => {
          notification.error({
            message: error.message,
          })
        })
    }
  }

  return (
    <Button onClick={handleSignInSignOut}>
      {isSignedIn ? "Sign out" : "Sign in"}
    </Button>
  )
}
