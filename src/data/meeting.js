import moment from "moment"
import { twoDigitTime } from "../utils/massager"

export class Meeting {
  constructor(name, duration, startHour, startMinute) {
    this.name = name
    this.duration = duration
    this.startHour = startHour
    this.startMinute = startMinute
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
      name: meeting.name,
      duration: Number(meeting.duration),
      startHour: Number(meeting.startHour),
      startMinute: Number(meeting.startMinute),
    }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return new Meeting(
      data.name,
      data.duration,
      data.startHour,
      data.startMinute
    )
  },
}
