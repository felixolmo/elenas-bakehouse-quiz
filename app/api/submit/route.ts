import { NextResponse } from "next/server";

const MAKE_WEBHOOK_URL =
  "https://hook.us2.make.com/ooerv4hi4pm58ipfapk1rd16vvrpxp44";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        brand: "Elena's Bakehouse",
        source: "Website Quiz",
        submittedAt: new Date().toISOString(),
        leadFirstName: body.answers?.contact?.firstName || "",
        leadLastName: body.answers?.contact?.lastName || "",
        leadEmail: body.answers?.contact?.email || "",
        leadPhone: body.answers?.contact?.phone || "",
        ...body,
      }),
    });

    if (!response.ok) {
      throw new Error("Make.com webhook failed");
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry sent successfully",
    });
  } catch (error) {
    console.error("Submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Submission failed",
      },
      { status: 500 }
    );
  }
}
