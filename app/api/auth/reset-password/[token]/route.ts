import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function POST(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const { password } = await req.json();

  const response = await fetch(`${BASE_URL}/auth/reset-password/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { message: data.error || "Reset failed" },
      { status: response.status }
    );
  }

  return NextResponse.json({
    message: "Password reset successful",
    data,
  });
}