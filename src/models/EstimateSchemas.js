import mongoose, { Schema, models } from "mongoose";

const EstimateRowSchema = new Schema(
  {
    itemDescription: {
      type: String
    },
    quantity: {
      type: String
    },
    rate: {
      type: String
    },
    amount: {
      type: String
    },
  }
)

const EstimateSchema = new Schema(
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
    estimateRows: [EstimateRowSchema],
    total: {
      type: String
    }
  }
)


const Estimate = models.Estimate || mongoose.model('Estimate', EstimateSchema)

export default Estimate