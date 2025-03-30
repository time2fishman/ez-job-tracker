import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/mongodbConnect";
import Estimate from "@/models/EstimateSchemas";

export async function GET() {
  try {
    // Connect to the database
    await connectionToDatabase();

    // Fetch all the estimates from the database
    const estimates = await Estimate.find();

    // Return the estimates in the response
    return NextResponse.json(estimates, { status: 200 });
  } catch (error) {
    return NextResponse(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectionToDatabase();
    const {
      estimateId,
      date,
      status,
      firstName,
      lastName,
      email,
      address,
      city,
      state,
      zip,
      phone,
      estimateRows,
      total,
    } = await request.json();
    const newEstimate = new Estimate({
      estimateId,
      date,
      status,
      firstName,
      lastName,
      email,
      address,
      city,
      state,
      zip,
      phone,
      estimateRows,
      total,
    });
    await newEstimate.save();

    return NextResponse.json(
      { newEstimate, message: "Estimate created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse(
      {
        message: "Internal server error",
        error,
      },
      { status: 500 }
    );
  }
}
