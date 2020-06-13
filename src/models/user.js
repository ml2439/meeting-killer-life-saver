export class User {
  static COLLECTION_ID = "users"

  constructor(fields) {
    this.id = fields.id
    this.name = fields.name
    this.email = fields.email
    this.photoUrl = fields.photoUrl
    this.meetingsAttended = fields.meetingsAttended
    this.meetingsHosted = fields.meetingsHosted
  }
}

export const userConverter = {
  toFirestore: user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      photoUrl: user.photoUrl,
      meetingsAttended: user.meetingsAttended || [],
      meetingsHosted: user.meetingsHosted || [],
    }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return new User(data)
  },
}
