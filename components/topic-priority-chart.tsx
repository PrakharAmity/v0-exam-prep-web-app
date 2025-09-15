"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { topic: "Data Structures", priority: 95, questions: 18, frequency: 85 },
  { topic: "Algorithms", priority: 92, questions: 15, frequency: 80 },
  { topic: "Database Systems", priority: 88, questions: 12, frequency: 75 },
  { topic: "Operating Systems", priority: 85, questions: 14, frequency: 78 },
  { topic: "Computer Networks", priority: 82, questions: 10, frequency: 70 },
  { topic: "Software Engineering", priority: 78, questions: 8, frequency: 65 },
  { topic: "Computer Graphics", priority: 75, questions: 6, frequency: 60 },
  { topic: "Artificial Intelligence", priority: 72, questions: 9, frequency: 68 },
  { topic: "Compiler Design", priority: 68, questions: 7, frequency: 55 },
  { topic: "Theory of Computation", priority: 65, questions: 5, frequency: 50 },
]

const chartConfig = {
  priority: {
    label: "Priority Score",
    color: "hsl(var(--chart-1))",
  },
  questions: {
    label: "Question Count",
    color: "hsl(var(--chart-2))",
  },
}

export function TopicPriorityChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <XAxis dataKey="topic" angle={-45} textAnchor="end" height={80} fontSize={12} />
          <YAxis />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => [
                  `${value}${name === "priority" ? "%" : ""}`,
                  name === "priority" ? "Priority Score" : "Questions",
                ]}
              />
            }
          />
          <Bar dataKey="priority" fill="var(--color-priority)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
