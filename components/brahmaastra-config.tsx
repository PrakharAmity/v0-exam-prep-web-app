"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Clock } from "lucide-react"

interface BrahmastraConfig {
  daysLeft: number
  hoursPerDay: number
  passingThreshold: number
  focusLevel: "survival" | "comfortable" | "confident"
}

export function BrahmastraConfig() {
  const [config, setConfig] = useState<BrahmastraConfig>({
    daysLeft: 3,
    hoursPerDay: 6,
    passingThreshold: 40,
    focusLevel: "survival",
  })

  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsGenerating(false)
  }

  const getFocusDescription = (level: string) => {
    switch (level) {
      case "survival":
        return "Bare minimum to pass (35-45%)"
      case "comfortable":
        return "Safe passing margin (50-60%)"
      case "confident":
        return "Good score target (65-75%)"
      default:
        return ""
    }
  }

  const totalHours = config.daysLeft * config.hoursPerDay
  const topicsCount = Math.max(5, Math.min(12, Math.floor(totalHours / 2)))
  const questionsCount = Math.floor(totalHours * 1.5)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-orange-500" />
          Configuration
        </CardTitle>
        <CardDescription>Customize your last-minute strategy</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Days Left */}
        <div className="space-y-2">
          <Label htmlFor="daysLeft">Days Until Exam</Label>
          <Input
            id="daysLeft"
            type="number"
            min="1"
            max="14"
            value={config.daysLeft}
            onChange={(e) => setConfig((prev) => ({ ...prev, daysLeft: Number.parseInt(e.target.value) || 1 }))}
          />
        </div>

        {/* Hours Per Day */}
        <div className="space-y-3">
          <Label>Study Hours Per Day: {config.hoursPerDay}h</Label>
          <Slider
            value={[config.hoursPerDay]}
            onValueChange={([value]) => setConfig((prev) => ({ ...prev, hoursPerDay: value }))}
            max={16}
            min={2}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>2h</span>
            <span>16h</span>
          </div>
        </div>

        {/* Focus Level */}
        <div className="space-y-2">
          <Label>Target Score</Label>
          <Select
            value={config.focusLevel}
            onValueChange={(value: any) => setConfig((prev) => ({ ...prev, focusLevel: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="survival">Just Pass (35-45%)</SelectItem>
              <SelectItem value="comfortable">Safe Pass (50-60%)</SelectItem>
              <SelectItem value="confident">Good Score (65-75%)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">{getFocusDescription(config.focusLevel)}</p>
        </div>

        {/* Passing Threshold */}
        <div className="space-y-3">
          <Label>Passing Threshold: {config.passingThreshold}%</Label>
          <Slider
            value={[config.passingThreshold]}
            onValueChange={([value]) => setConfig((prev) => ({ ...prev, passingThreshold: value }))}
            max={60}
            min={30}
            step={5}
            className="w-full"
          />
        </div>

        {/* Generate Button */}
        <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-orange-600 hover:bg-orange-700">
          {isGenerating ? "Generating..." : "Generate Brahmaastra Plan"}
        </Button>

        {/* Plan Preview */}
        <div className="space-y-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
          <h4 className="font-medium text-orange-800">Plan Preview</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-orange-700">Total Study Time:</span>
              <Badge variant="outline" className="text-orange-800">
                {totalHours}h
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-orange-700">Essential Topics:</span>
              <Badge variant="outline" className="text-orange-800">
                {topicsCount}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-orange-700">Must-Do Questions:</span>
              <Badge variant="outline" className="text-orange-800">
                {questionsCount}
              </Badge>
            </div>
          </div>
        </div>

        {/* Strategy Tips */}
        <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-800 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Quick Tips
          </h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Focus on frequently asked topics only</li>
            <li>• Skip detailed theory, focus on key points</li>
            <li>• Practice previous year questions</li>
            <li>• Use mnemonics for quick recall</li>
            <li>• Take short breaks every 2 hours</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
