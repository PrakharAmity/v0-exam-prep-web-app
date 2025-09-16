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

    const { sessionId, topic, masteryLevel, timeSpentMinutes, questionsAnswered, questionsCorrect } =
      await request.json()

    // Upsert study progress
    const { data: progress, error } = await supabase
      .from("study_progress")
      .upsert(
        {
          user_id: user.id,
          session_id: sessionId || null,
          topic,
          mastery_level: masteryLevel,
          time_spent_minutes: timeSpentMinutes,
          questions_answered: questionsAnswered,
          questions_correct: questionsCorrect,
          last_studied_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,topic",
        },
      )
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save progress" }, { status: 500 })
    }

    return NextResponse.json({ progress })
  } catch (error) {
    console.error("Progress API error:", error)
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

    let query = supabase
      .from("study_progress")
      .select("*")
      .eq("user_id", user.id)
      .order("last_studied_at", { ascending: false })

    if (sessionId) {
      query = query.eq("session_id", sessionId)
    }

    const { data: progress, error } = await query

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 })
    }

    return NextResponse.json({ progress })
  } catch (error) {
    console.error("Progress API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
