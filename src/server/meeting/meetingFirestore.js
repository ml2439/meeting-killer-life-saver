import firebase from "gatsby-plugin-firebase"
import { Meeting, meetingConverter } from "../../models/meeting"
import { camelCase } from "../../utils/massager"

export const setMeeting = async newMeeting => {
  return firebase
    .firestore()
    .collection(Meeting.COLLECTION_ID)
    .doc(camelCase(newMeeting.name))
    .withConverter(meetingConverter)
    .set(newMeeting)
}

export const updateMeeting = async (id, fieldmap) => {
  return firebase
    .firestore()
    .collection(Meeting.COLLECTION_ID)
    .doc(id)
    .withConverter(meetingConverter)
    .update(fieldmap)
}

export const archiveMeeting = async id => {
  return firebase
    .firestore()
    .collection(Meeting.COLLECTION_ID)
    .doc(id)
    .update({ archived: true })
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
  return firebase
    .firestore()
    .collection(Meeting.COLLECTION_ID)
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
