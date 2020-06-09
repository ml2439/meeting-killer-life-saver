import firebase from "gatsby-plugin-firebase"
import { Meeting, meetingConverter } from "../../models/meeting"
import { camelCase } from "../../utils/massager"

const meetingCollection = firebase.firestore().collection(Meeting.COLLECTION_ID)

export const setMeeting = async newMeeting => {
  return meetingCollection
    .doc(camelCase(newMeeting.name))
    .withConverter(meetingConverter)
    .set(newMeeting)
}

export const archiveMeeting = async id => {
  return meetingCollection.doc(id).update({ archived: true })
}

export const queryUnarchivedMeetings = (onNext, onError) => {
  return firebase
    .firestore()
    .collection(Meeting.COLLECTION_ID)
    .where("archived", "==", false)
    .withConverter(meetingConverter)
    .onSnapshot(onNext, onError)
}

export const validateMeetingName = async name => {
  return meetingCollection
    .doc(camelCase(name))
    .get()
    .then(meeting => {
      if (meeting.exists) {
        return Promise.reject(`${name} already exists!`)
      } else {
        return Promise.resolve()
      }
    })
}
