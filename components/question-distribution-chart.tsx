"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Data Structures", value: 18, color: "hsl(var(--chart-1))" },
  { name: "Algorithms", value: 15, color: "hsl(var(--chart-2))" },
  { name: "Operating Systems", value: 14, color: "hsl(var(--chart-3))" },
  { name: "Database Systems", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Computer Networks", value: 10, color: "hsl(var(--chart-5))" },
  { name: "AI & ML", value: 9, color: "hsl(220 70% 50%)" },
  { name: "Software Engineering", value: 8, color: "hsl(280 70% 50%)" },
  { name: "Others", value: 20, color: "hsl(var(--muted-foreground))" },
]

const chartConfig = {
  questions: {
    label: "Questions",
  },
}

export function QuestionDistributionChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => [`${value} questions`, "Count"]}
                labelFormatter={(label) => `Topic: ${label}`}
              />
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
