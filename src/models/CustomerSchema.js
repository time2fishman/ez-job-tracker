import mongoose, { Schema, models } from "mongoose";

const CustomerSchema = new Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String
    },
    address: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zip: {
      type: String
    },
    phone: {
      type: String
    },
    image: {
      type: String
    },
    estimates: {
      type: [String]
    },
    invoices: {
      type: [String]
    }
  }
)

const Customer = models.Customer || mongoose.model('Customer', CustomerSchema)

export default Customer