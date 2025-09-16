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

    const { sessionId, fileId, analysisType, analysisData, confidenceScore } = await request.json()

    const { data: analysis, error } = await supabase
      .from("analysis_results")
      .insert({
        user_id: user.id,
        session_id: sessionId || null,
        file_id: fileId || null,
        analysis_type: analysisType,
        analysis_data: analysisData,
        confidence_score: confidenceScore || null,
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save analysis" }, { status: 500 })
    }

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error("Analysis API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

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
    const fileId = searchParams.get("fileId")
    const analysisType = searchParams.get("analysisType")

    let query = supabase
      .from("analysis_results")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (sessionId) {
      query = query.eq("session_id", sessionId)
    }
    if (fileId) {
      query = query.eq("file_id", fileId)
    }
    if (analysisType) {
      query = query.eq("analysis_type", analysisType)
    }

    const { data: analyses, error } = await query

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch analyses" }, { status: 500 })
    }

    return NextResponse.json({ analyses })
  } catch (error) {
    console.error("Analysis API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
