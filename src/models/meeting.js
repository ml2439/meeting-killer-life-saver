import moment from "moment"
import { twoDigitTime, camelCase } from "../utils/massager"

export class Meeting {
  static COLLECTION_ID = "meetings"

  constructor(fields) {
    this.name = fields.name
    this.duration = fields.duration
    this.startHour = fields.startHour
    this.startMinute = fields.startMinute
    this.host = fields.host
    this.id = fields.id || camelCase(fields.name)
    this.archived = fields.archived || false
    this.createdAt = fields.createdAt
    this.modifiedAt = fields.modifiedAt
  }

  toString() {
    const startTime = this.getStartMoment().format("HH:mm")
    return `Starts at: ${startTime}. Duration: ${this.duration} minutes.`
  }

  getStartMoment() {
    return moment(
      `${twoDigitTime(this.startHour)}${twoDigitTime(this.startMinute)}`,
      "hhmm"
    )
  }
}

export const meetingConverter = {
  toFirestore: meeting => {
    return {
      id: meeting.id,
      name: meeting.name,
      duration: Number(meeting.duration),
      startHour: Number(meeting.startHour),
      startMinute: Number(meeting.startMinute),
      host: meeting.host,
      archived: meeting.archived,
      createdAt: meeting.createdAt,
      modifiedAt: meeting.modifiedAt,
    }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return new Meeting(data)
  },
}
