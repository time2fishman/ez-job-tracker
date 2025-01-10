import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/mongodbConnect";
import Estimate from "@/models/EstimateSchemas";

export async function POST(request) {
  try {
    await connectionToDatabase()
    const { firstName, lastName, email, address, city, state, zip, phone, estimateRows, total } = await request.json()
    const newEstimate = new Estimate({ firstName, lastName, email, address, city, state, zip, phone, estimateRows, total })
    await newEstimate.save()

    return NextResponse.json(newEstimate, { status: 201 })
  } catch (error) {
    return NextResponse(
      {
        message: "Internal server error", error
      },
      { status: 500 }
    )
  }
}