import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check if user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const files = formData.getAll("files") as File[]
    const sessionId = formData.get("sessionId") as string

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 })
    }

    const uploadResults = []

    for (const file of files) {
      // Generate unique file path
      const fileExt = file.name.split(".").pop()
      const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("exam-files")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        })

      if (uploadError) {
        console.error("Upload error:", uploadError)
        continue
      }

      // Save file metadata to database
      const { data: fileRecord, error: dbError } = await supabase
        .from("uploaded_files")
        .insert({
          user_id: user.id,
          session_id: sessionId || null,
          filename: file.name,
          file_path: uploadData.path,
          file_size: file.size,
          file_type: file.type,
          upload_status: "completed",
        })
        .select()
        .single()

      if (dbError) {
        console.error("Database error:", dbError)
        continue
      }

      uploadResults.push({
        id: fileRecord.id,
        filename: file.name,
        size: file.size,
        type: file.type,
        path: uploadData.path,
      })
    }

    return NextResponse.json({
      success: true,
      files: uploadResults,
      message: `Successfully uploaded ${uploadResults.length} file(s)`,
    })
  } catch (error) {
    console.error("Upload API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
