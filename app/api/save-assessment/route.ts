import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Founder Assessments`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          "Contact Name": body.name,
          Email: body.email,
          Company: body.company,
          "Company Size": body.companySize,
          "Leadership Visibility": body.visibility,
          "Operational Flow": body.flow,
          "Decision Friction": body.friction,
          "Automation Opportunity": body.automation,
          Score: body.score,
          Stage: body.stage,
        },
      }),
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}
