import { NextResponse } from "next/server";

const BASE_URL = process.env.SERVER_BASE_URL;

export async function POST(req: Request) {
  const body = await req.json();
  const url = `${BASE_URL}/auth/register`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  // Return the raw response from your backend with the correct status
  return NextResponse.json(data, {
    status: response.status,
  });
}