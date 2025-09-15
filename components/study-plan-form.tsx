"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { CalendarDays } from "lucide-react"

interface StudyPlanConfig {
  examDate: string
  studyHoursPerDay: number
  studyMode: "full" | "focused" | "brahmaastra"
  includeWeekends: boolean
  priorityTopics: string[]
  difficultyPreference: "easy_first" | "hard_first" | "mixed"
}

export function StudyPlanForm() {
  const [config, setConfig] = useState<StudyPlanConfig>({
    examDate: "",
    studyHoursPerDay: 4,
    studyMode: "full",
    includeWeekends: true,
    priorityTopics: [],
    difficultyPreference: "mixed",
  })

  const [isGenerating, setIsGenerating] = useState(false)

  const availableTopics = [
    "Data Structures",
    "Algorithms",
    "Database Systems",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
    "Computer Graphics",
    "Artificial Intelligence",
  ]

  const handleTopicToggle = (topic: string) => {
    setConfig((prev) => ({
      ...prev,
      priorityTopics: prev.priorityTopics.includes(topic)
        ? prev.priorityTopics.filter((t) => t !== topic)
        : [...prev.priorityTopics, topic],
    }))
  }

  const handleGeneratePlan = async () => {
    setIsGenerating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
  }

  const getDaysUntilExam = () => {
    if (!config.examDate) return null
    const today = new Date()
    const examDate = new Date(config.examDate)
    const diffTime = examDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const daysUntilExam = getDaysUntilExam()

  return (
    <div className="space-y-6">
      {/* Exam Date */}
      <div className="space-y-2">
        <Label htmlFor="examDate">Exam Date</Label>
        <Input
          id="examDate"
          type="date"
          value={config.examDate}
          onChange={(e) => setConfig((prev) => ({ ...prev, examDate: e.target.value }))}
          min={new Date().toISOString().split("T")[0]}
        />
        {daysUntilExam !== null && (
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            {daysUntilExam} days until exam
          </p>
        )}
      </div>

      {/* Study Hours Per Day */}
      <div className="space-y-3">
        <Label>Study Hours Per Day: {config.studyHoursPerDay} hours</Label>
        <Slider
          value={[config.studyHoursPerDay]}
          onValueChange={([value]) => setConfig((prev) => ({ ...prev, studyHoursPerDay: value }))}
          max={12}
          min={1}
          step={0.5}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1 hour</span>
          <span>12 hours</span>
        </div>
      </div>

      {/* Study Mode */}
      <div className="space-y-2">
        <Label>Study Mode</Label>
        <Select
          value={config.studyMode}
          onValueChange={(value: any) => setConfig((prev) => ({ ...prev, studyMode: value }))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">Full Mode - All topics covered</SelectItem>
            <SelectItem value="focused">Focused Mode - High-priority topics only</SelectItem>
            <SelectItem value="brahmaastra">Brahmaastra Mode - Minimal pass strategy</SelectItem>
          </SelectContent>
        </Select>
        <div className="text-xs text-muted-foreground">
          {config.studyMode === "full" && "Comprehensive coverage of all syllabus topics"}
          {config.studyMode === "focused" && "Focus on high-yield and frequently asked topics"}
          {config.studyMode === "brahmaastra" && "Minimum effort for maximum impact - last-minute strategy"}
        </div>
      </div>

      {/* Include Weekends */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Include Weekends</Label>
          <p className="text-xs text-muted-foreground">Study on Saturday and Sunday</p>
        </div>
        <Switch
          checked={config.includeWeekends}
          onCheckedChange={(checked) => setConfig((prev) => ({ ...prev, includeWeekends: checked }))}
        />
      </div>

      {/* Priority Topics */}
      <div className="space-y-3">
        <Label>Priority Topics (Optional)</Label>
        <p className="text-xs text-muted-foreground">Select topics you want to focus on more</p>
        <div className="flex flex-wrap gap-2">
          {availableTopics.map((topic) => (
            <Badge
              key={topic}
              variant={config.priorityTopics.includes(topic) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleTopicToggle(topic)}
            >
              {topic}
            </Badge>
          ))}
        </div>
      </div>

      {/* Difficulty Preference */}
      <div className="space-y-2">
        <Label>Study Approach</Label>
        <Select
          value={config.difficultyPreference}
          onValueChange={(value: any) => setConfig((prev) => ({ ...prev, difficultyPreference: value }))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy_first">Easy topics first</SelectItem>
            <SelectItem value="hard_first">Difficult topics first</SelectItem>
            <SelectItem value="mixed">Mixed approach</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Generate Button */}
      <Button onClick={handleGeneratePlan} disabled={!config.examDate || isGenerating} className="w-full">
        {isGenerating ? "Generating Plan..." : "Generate Study Plan"}
      </Button>

      {/* Plan Summary */}
      {config.examDate && (
        <div className="p-4 bg-muted rounded-lg space-y-2">
          <h4 className="font-medium">Plan Summary</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• {daysUntilExam} days until exam</p>
            <p>
              • {config.studyHoursPerDay} hours/day × {config.includeWeekends ? "7" : "5"} days/week
            </p>
            <p>
              • Total study time: ~
              {Math.round(daysUntilExam! * config.studyHoursPerDay * (config.includeWeekends ? 1 : 5 / 7))} hours
            </p>
            <p>• Mode: {config.studyMode.charAt(0).toUpperCase() + config.studyMode.slice(1)}</p>
          </div>
        </div>
      )}
    </div>
  )
}
