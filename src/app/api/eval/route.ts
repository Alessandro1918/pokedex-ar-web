import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {

  const formData = await req.formData()
  const file = formData.get("file") as File

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  console.log("File received:", file.name, file.size)

  return NextResponse.json({ success: true, fileName: file.name })
}
