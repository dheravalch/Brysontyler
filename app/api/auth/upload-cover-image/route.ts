import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function POST(req: Request) {
  const formData = await req.formData();
  const url = `${BASE_URL}/auth/upload-cover-image`;
  
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const newFormData = new FormData();
  formData.forEach((value, key) => {
    newFormData.append(key, value);
  });

  const response = await fetch(url, {
    method: "POST",
    headers: { 
      Authorization: `Bearer ${token}` 
    },
    body: newFormData,
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { message: data.error || "Cover image upload failed" },
      { status: response.status }
    );
  }

  return NextResponse.json({ message: "Cover image uploaded", data });
}