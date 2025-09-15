"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { topic: "Data Structures", confidence: 95, accuracy: 92 },
  { topic: "Algorithms", confidence: 92, accuracy: 89 },
  { topic: "Database Systems", confidence: 88, accuracy: 85 },
  { topic: "Operating Systems", confidence: 85, accuracy: 87 },
  { topic: "Computer Networks", confidence: 82, accuracy: 80 },
  { topic: "Software Engineering", confidence: 78, accuracy: 75 },
  { topic: "Computer Graphics", confidence: 75, accuracy: 72 },
  { topic: "Artificial Intelligence", confidence: 72, accuracy: 78 },
]

const chartConfig = {
  confidence: {
    label: "Confidence",
    color: "hsl(var(--chart-1))",
  },
  accuracy: {
    label: "Historical Accuracy",
    color: "hsl(var(--chart-2))",
  },
}

export function PredictionConfidenceChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <XAxis dataKey="topic" angle={-45} textAnchor="end" height={80} fontSize={12} />
          <YAxis domain={[60, 100]} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => [`${value}%`, name === "confidence" ? "Confidence" : "Historical Accuracy"]}
              />
            }
          />
          <Area
            type="monotone"
            dataKey="confidence"
            stackId="1"
            stroke="var(--color-confidence)"
            fill="var(--color-confidence)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="accuracy"
            stackId="2"
            stroke="var(--color-accuracy)"
            fill="var(--color-accuracy)"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
