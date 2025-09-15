"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarEvent {
  date: string
  sessions: {
    topic: string
    duration: number
    type: "theory" | "practice" | "revision"
    completed: boolean
  }[]
}

// Mock calendar data
const mockCalendarEvents: CalendarEvent[] = [
  {
    date: "2024-01-16",
    sessions: [
      { topic: "Data Structures", duration: 2, type: "theory", completed: true },
      { topic: "Practice Problems", duration: 1.5, type: "practice", completed: true },
    ],
  },
  {
    date: "2024-01-17",
    sessions: [
      { topic: "Algorithms", duration: 2.5, type: "theory", completed: false },
      { topic: "Revision", duration: 1, type: "revision", completed: false },
    ],
  },
  {
    date: "2024-01-18",
    sessions: [
      { topic: "Database Systems", duration: 2, type: "theory", completed: false },
      { topic: "Algorithm Practice", duration: 1.5, type: "practice", completed: false },
    ],
  },
]

export function StudyPlanCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)) // January 2024
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const getEventForDate = (dateString: string) => {
    return mockCalendarEvents.find((event) => event.date === dateString)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const selectedEvent = selectedDate ? getEventForDate(selectedDate) : null

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <div className="border rounded-lg overflow-hidden">
            {/* Day Headers */}
            <div className="grid grid-cols-7 bg-muted">
              {dayNames.map((day) => (
                <div key={day} className="p-3 text-center text-sm font-medium">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: firstDayOfMonth }, (_, index) => (
                <div key={`empty-${index}`} className="h-24 border-b border-r border-border" />
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }, (_, index) => {
                const day = index + 1
                const dateString = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day)
                const event = getEventForDate(dateString)
                const isSelected = selectedDate === dateString
                const isToday = dateString === new Date().toISOString().split("T")[0]

                return (
                  <div
                    key={day}
                    className={`h-24 border-b border-r border-border p-2 cursor-pointer hover:bg-muted/50 ${
                      isSelected ? "bg-accent/20" : ""
                    } ${isToday ? "bg-blue-50" : ""}`}
                    onClick={() => setSelectedDate(dateString)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm ${isToday ? "font-bold text-blue-600" : ""}`}>{day}</span>
                      {event && <div className="w-2 h-2 bg-accent rounded-full" />}
                    </div>
                    {event && (
                      <div className="space-y-1">
                        {event.sessions.slice(0, 2).map((session, index) => (
                          <div
                            key={index}
                            className={`text-xs p-1 rounded truncate ${
                              session.completed ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {session.topic}
                          </div>
                        ))}
                        {event.sessions.length > 2 && (
                          <div className="text-xs text-muted-foreground">+{event.sessions.length - 2} more</div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Selected Date Details */}
        <div className="space-y-4">
          {selectedEvent ? (
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-3">
                {new Date(selectedDate!).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h4>
              <div className="space-y-3">
                {selectedEvent.sessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium text-sm">{session.topic}</p>
                      <p className="text-xs text-muted-foreground">
                        {session.duration}h • {session.type}
                      </p>
                    </div>
                    <Badge variant={session.completed ? "default" : "secondary"}>
                      {session.completed ? "Done" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t">
                <p className="text-sm text-muted-foreground">
                  Total: {selectedEvent.sessions.reduce((acc, session) => acc + session.duration, 0)} hours
                </p>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-4 text-center text-muted-foreground">
              <p>Select a date to view study sessions</p>
            </div>
          )}

          {/* Legend */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-100 rounded" />
                <span className="text-sm">Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-100 rounded" />
                <span className="text-sm">Scheduled</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full" />
                <span className="text-sm">Has sessions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
