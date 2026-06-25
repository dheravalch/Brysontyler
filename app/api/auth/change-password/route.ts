import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BASE_URL = process.env.SERVER_BASE_URL;

export async function POST(req: Request) {
  const body = await req.json();
  const url = `${BASE_URL}/auth/change-password`;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { message: data.message || "Request failed" },
      { status: response.status },
    );
  }

  return NextResponse.json({
    message: "Password changed successfully",
    data,
  });
}