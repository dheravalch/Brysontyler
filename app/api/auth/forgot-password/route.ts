
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function POST(req: Request) {
  const body = await req.json();
  const url = `${BASE_URL}/auth/forgot-password`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();
   
  if (!response.ok) {
    return NextResponse.json(
      { message: data.error || "Request failed" },
      { status: response.status },
    );
  }

  return NextResponse.json({
    message: "Reset link sent",
    data,
  });
}
