import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/mongodbConnect";
import Customer from "@/models/customerSchema";

export async function POST(request) {
  try {
    await connectionToDatabase()
    const { firstName, lastName, email, address, city, state, zip, phone } = await request.json()
    const newCustomer = new Customer({ firstName, lastName, email, address, city, state, zip, phone })
    await newCustomer.save()

    return NextResponse.json(newCustomer, { status: 201 })
  } catch (error) {
    return NextResponse(
      {
        message: "Internal server error", error
      },
      { status: 500 }
    )
  }
}