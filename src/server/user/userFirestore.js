import firebase from "gatsby-plugin-firebase"
import { User, userConverter } from "../../models/user"

export const createNewUser = async user => {
  const userRef = firebase
    .firestore()
    .collection(User.COLLECTION_ID)
    .doc(user.id)

  userRef.get().then(doc => {
    if (!doc.exists) {
      userRef.withConverter(userConverter).set(user)
    }
  })
}
