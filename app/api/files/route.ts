import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("sessionId")

    let query = supabase
      .from("uploaded_files")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (sessionId) {
      query = query.eq("session_id", sessionId)
    }

    const { data: files, error } = await query

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 })
    }

    return NextResponse.json({ files })
  } catch (error) {
    console.error("Files API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
