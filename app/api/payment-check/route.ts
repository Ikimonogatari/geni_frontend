import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const txId = searchParams.get("txId");

  if (!txId) {
    return NextResponse.json(
      { error: "Transaction ID is required" },
      { status: 400 }
    );
  }

  try {
    // Get the auth token from cookies
    const authToken = cookies().get("auth")?.value;

    if (!authToken) {
      console.error("Payment check: No auth token found in cookies");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Call the backend API with the auth token
    const backendUrl = process.env.NEXT_PUBLIC_AWS_URL;
    const apiUrl = `${backendUrl}/api/admin/qpay/callback/${txId}`;

    console.log(`Payment check: Calling backend API at ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    // Log the response status
    console.log(
      `Payment check: Backend API responded with status ${response.status}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend API error: ${response.status}` },
        { status: response.status }
      );
    }

    // Get the payment data from the response
    const data = await response.json();
    console.log(`Payment check: Backend API response data:`, data);

    // Return the payment status, properly handling the IsPaid field
    return NextResponse.json({
      isPaid: data?.IsPaid === true,
      data,
    });
  } catch (error) {
    console.error("Payment check error:", error);
    return NextResponse.json(
      { error: "Failed to check payment status" },
      { status: 500 }
    );
  }
}
