import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function POST(req: Request) {
  const body = await req.json();
  const url = `${BASE_URL}/auth/register`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();


  return NextResponse.json(data, {
    status: response.status,
  });
}