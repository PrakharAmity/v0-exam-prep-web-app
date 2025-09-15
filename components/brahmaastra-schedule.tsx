"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, Clock, Target, Zap, Calendar } from "lucide-react"

interface ScheduleBlock {
  id: string
  time: string
  duration: number
  activity: string
  type: "study" | "practice" | "revision" | "break"
  topic?: string
  priority: "high" | "medium" | "low"
  completed: boolean
}

interface ScheduleDay {
  date: string
  day: string
  blocks: ScheduleBlock[]
  totalStudyHours: number
  completed: boolean
}

const mockSchedule: ScheduleDay[] = [
  {
    date: "Day 1",
    day: "Today",
    blocks: [
      {
        id: "1",
        time: "09:00",
        duration: 90,
        activity: "Data Structures - Arrays & Linked Lists",
        type: "study",
        topic: "Data Structures",
        priority: "high",
        completed: true,
      },
      {
        id: "2",
        time: "10:30",
        duration: 15,
        activity: "Break",
        type: "break",
        priority: "low",
        completed: true,
      },
      {
        id: "3",
        time: "10:45",
        duration: 60,
        activity: "Practice: Array & Linked List Problems",
        type: "practice",
        topic: "Data Structures",
        priority: "high",
        completed: false,
      },
      {
        id: "4",
        time: "11:45",
        duration: 15,
        activity: "Break",
        type: "break",
        priority: "low",
        completed: false,
      },
      {
        id: "5",
        time: "12:00",
        duration: 90,
        activity: "Algorithms - Sorting (Quick, Merge)",
        type: "study",
        topic: "Algorithms",
        priority: "high",
        completed: false,
      },
      {
        id: "6",
        time: "14:00",
        duration: 60,
        activity: "Lunch Break",
        type: "break",
        priority: "low",
        completed: false,
      },
      {
        id: "7",
        time: "15:00",
        duration: 60,
        activity: "Practice: Sorting Problems",
        type: "practice",
        topic: "Algorithms",
        priority: "high",
        completed: false,
      },
      {
        id: "8",
        time: "16:00",
        duration: 30,
        activity: "Quick Revision - Day 1 Topics",
        type: "revision",
        priority: "medium",
        completed: false,
      },
    ],
    totalStudyHours: 5.5,
    completed: false,
  },
  {
    date: "Day 2",
    day: "Tomorrow",
    blocks: [
      {
        id: "9",
        time: "09:00",
        duration: 90,
        activity: "Database Systems - Normalization",
        type: "study",
        topic: "Database Systems",
        priority: "high",
        completed: false,
      },
      {
        id: "10",
        time: "10:30",
        duration: 15,
        activity: "Break",
        type: "break",
        priority: "low",
        completed: false,
      },
      {
        id: "11",
        time: "10:45",
        duration: 60,
        activity: "Practice: Normalization Problems",
        type: "practice",
        topic: "Database Systems",
        priority: "high",
        completed: false,
      },
      {
        id: "12",
        time: "12:00",
        duration: 90,
        activity: "Operating Systems - Process Management",
        type: "study",
        topic: "Operating Systems",
        priority: "high",
        completed: false,
      },
      {
        id: "13",
        time: "14:00",
        duration: 60,
        activity: "Lunch Break",
        type: "break",
        priority: "low",
        completed: false,
      },
      {
        id: "14",
        time: "15:00",
        duration: 60,
        activity: "Practice: OS Scheduling Problems",
        type: "practice",
        topic: "Operating Systems",
        priority: "high",
        completed: false,
      },
      {
        id: "15",
        time: "16:00",
        duration: 30,
        activity: "Revision - Previous Day Topics",
        type: "revision",
        priority: "medium",
        completed: false,
      },
    ],
    totalStudyHours: 5.5,
    completed: false,
  },
  {
    date: "Day 3",
    day: "Exam Day - 1",
    blocks: [
      {
        id: "16",
        time: "09:00",
        duration: 120,
        activity: "Final Revision - All High Priority Topics",
        type: "revision",
        priority: "high",
        completed: false,
      },
      {
        id: "17",
        time: "11:00",
        duration: 15,
        activity: "Break",
        type: "break",
        priority: "low",
        completed: false,
      },
      {
        id: "18",
        time: "11:15",
        duration: 90,
        activity: "Mock Test - Previous Year Paper",
        type: "practice",
        priority: "high",
        completed: false,
      },
      {
        id: "19",
        time: "13:00",
        duration: 60,
        activity: "Lunch & Rest",
        type: "break",
        priority: "low",
        completed: false,
      },
      {
        id: "20",
        time: "14:00",
        duration: 60,
        activity: "Quick Review - Must-Know Points",
        type: "revision",
        priority: "high",
        completed: false,
      },
      {
        id: "21",
        time: "15:00",
        duration: 30,
        activity: "Relax & Prepare for Exam",
        type: "break",
        priority: "low",
        completed: false,
      },
    ],
    totalStudyHours: 4.5,
    completed: false,
  },
]

export function BrahmastraSchedule() {
  const [schedule, setSchedule] = useState<ScheduleDay[]>(mockSchedule)

  const toggleBlockCompletion = (blockId: string) => {
    setSchedule((prev) =>
      prev.map((day) => ({
        ...day,
        blocks: day.blocks.map((block) => (block.id === blockId ? { ...block, completed: !block.completed } : block)),
      })),
    )
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "study":
        return <Target className="h-4 w-4 text-blue-500" />
      case "practice":
        return <Zap className="h-4 w-4 text-green-500" />
      case "revision":
        return <Clock className="h-4 w-4 text-orange-500" />
      case "break":
        return <Circle className="h-4 w-4 text-gray-400" />
      default:
        return <Circle className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-300"
    }
  }

  const totalStudyHours = schedule.reduce((acc, day) => acc + day.totalStudyHours, 0)
  const completedBlocks = schedule.flatMap((day) => day.blocks).filter((block) => block.completed).length
  const totalBlocks = schedule.flatMap((day) => day.blocks).length

  return (
    <div className="space-y-6">
      {/* Schedule Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-800">Total Study Time</span>
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-1">{totalStudyHours}h</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-800">Progress</span>
          </div>
          <p className="text-2xl font-bold text-green-600 mt-1">{Math.round((completedBlocks / totalBlocks) * 100)}%</p>
        </div>
        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <span className="font-medium text-orange-800">Days Left</span>
          </div>
          <p className="text-2xl font-bold text-orange-600 mt-1">3</p>
        </div>
      </div>

      {/* Daily Schedule */}
      <div className="space-y-6">
        {schedule.map((day, dayIndex) => (
          <div key={dayIndex} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{day.date}</h3>
                <p className="text-sm text-muted-foreground">
                  {day.day} • {day.totalStudyHours}h study time
                </p>
              </div>
              <Badge variant={day.completed ? "default" : "secondary"}>{day.completed ? "Completed" : "Pending"}</Badge>
            </div>

            <div className="space-y-2">
              {day.blocks.map((block) => (
                <div
                  key={block.id}
                  className={`flex items-center space-x-4 p-3 border-l-4 rounded-r-lg ${getPriorityColor(
                    block.priority,
                  )} ${block.type === "break" ? "bg-gray-50" : "bg-white"}`}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBlockCompletion(block.id)}
                    disabled={block.type === "break"}
                  >
                    {block.completed ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>

                  <div className="flex items-center space-x-2">
                    {getActivityIcon(block.type)}
                    <span className="text-sm font-medium">{block.time}</span>
                  </div>

                  <div className="flex-1">
                    <p className="font-medium">{block.activity}</p>
                    {block.topic && <p className="text-sm text-muted-foreground">Topic: {block.topic}</p>}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {block.duration}min
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs capitalize ${
                        block.type === "study"
                          ? "text-blue-700"
                          : block.type === "practice"
                            ? "text-green-700"
                            : block.type === "revision"
                              ? "text-orange-700"
                              : "text-gray-700"
                      }`}
                    >
                      {block.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* Day Progress */}
            <div className="mt-4 pt-3 border-t">
              <div className="flex items-center justify-between text-sm">
                <span>Day Progress</span>
                <span>
                  {day.blocks.filter((b) => b.completed).length} of {day.blocks.length} activities completed
                </span>
              </div>
              <Progress
                value={(day.blocks.filter((b) => b.completed).length / day.blocks.length) * 100}
                className="h-2 mt-2"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Tips */}
      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
        <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Emergency Study Tips
        </h4>
        <ul className="text-sm text-red-700 space-y-1">
          <li>• Stick to the schedule religiously - every minute counts</li>
          <li>• If you fall behind, skip low-priority topics, not high-priority ones</li>
          <li>• Take breaks as scheduled to maintain focus</li>
          <li>• Don't try to learn new topics - focus on revision and practice</li>
          <li>• Sleep well the night before exam - don't pull an all-nighter</li>
        </ul>
      </div>
    </div>
  )
}
