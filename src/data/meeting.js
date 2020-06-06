import moment from "moment"
import { twoDigitTime, camelCase } from "../utils/massager"

export class Meeting {
  constructor(fields) {
    this.id = camelCase(fields.name)
    this.name = fields.name
    this.duration = fields.duration
    this.startHour = fields.startHour
    this.startMinute = fields.startMinute
    this.author = fields.author
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
      author: meeting.author,
    }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return new Meeting(data)
  },
}
