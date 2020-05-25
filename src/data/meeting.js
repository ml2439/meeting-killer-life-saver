import moment from "moment"

export class Meeting {
  constructor(name, duration, startHour, startMinute) {
    this.name = name
    this.duration = duration
    this.startHour = startHour
    this.startMinute = startMinute
  }

  toString() {
    const startTime = moment(
      `${this.startHour}${this.startMinute}`,
      "hhmm"
    ).format("HH:mm")
    return `${this.name}: Starts at ${startTime}. Lasts ${this.duration} minutes.`
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
