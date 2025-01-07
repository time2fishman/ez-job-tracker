import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connectDB";
import Client from "@/models/client";

export async function POST() {
  try {
    await connectDB()
    const newClient = await Client.create({
      firstName: "Steve",
      lastName: "Stevenson",
      email: "stevestevenson@fake.com",
      address: "9874 w 343 s",
      city: 'Rummy',
      state: 'JE',
      zip: '15798',
      phone: '555-666-7777',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      estimates: [null],
      invoices: [null]
    })

    return NextResponse.json(
      {
        user: newClient, message: "Client created!"
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse(
      {
        message: "Internal server error", error
      },
      { status: 500 }
    )
  }
}