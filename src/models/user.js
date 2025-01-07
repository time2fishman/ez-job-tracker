import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String
    },
    email: {
      type: String
    }
  }
)

const User = models.User || mongoose.model('User', UserSchema)

export default User

// const ClientSchema = new Schema(
//   {
//     firstName: {
//       type: String
//     },
//     lastName: {
//       type: String
//     },
//     email: {
//       type: String
//     },
//     address: {
//       type: String
//     },
//     city: {
//       type: String
//     },
//     state: {
//       type: String
//     },
//     zip: {
//       type: String
//     },
//     phone: {
//       type: String
//     },
//     image: {
//       type: String
//     },
//     estimates: {
//       type: [String]
//     },
//     invoices: {
//       type: [String]
//     }
//   }
// )

// const User = models.User || mongoose.model('Client', ClientSchema)

// export default ClientSchema