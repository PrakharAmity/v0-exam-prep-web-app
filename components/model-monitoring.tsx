"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Brain, TrendingUp, AlertTriangle, CheckCircle, RefreshCw, Download } from "lucide-react"

const accuracyData = [
  { date: "Jan 1", accuracy: 82.5, predictions: 1250 },
  { date: "Jan 8", accuracy: 84.2, predictions: 1380 },
  { date: "Jan 15", accuracy: 86.1, predictions: 1420 },
  { date: "Jan 22", accuracy: 87.3, predictions: 1560 },
  { date: "Jan 29", accuracy: 87.8, predictions: 1680 },
]

const topicAccuracy = [
  { topic: "Data Structures", accuracy: 92, samples: 450 },
  { topic: "Algorithms", accuracy: 89, samples: 380 },
  { topic: "Database Systems", accuracy: 85, samples: 320 },
  { topic: "Operating Systems", accuracy: 88, samples: 290 },
  { topic: "Computer Networks", accuracy: 83, samples: 250 },
  { topic: "Software Engineering", accuracy: 81, samples: 180 },
]

const chartConfig = {
  accuracy: {
    label: "Accuracy %",
    color: "hsl(var(--chart-1))",
  },
  predictions: {
    label: "Predictions",
    color: "hsl(var(--chart-2))",
  },
}

export function ModelMonitoring() {
  const [isRetraining, setIsRetraining] = useState(false)

  const handleRetrain = async () => {
    setIsRetraining(true)
    // Simulate retraining
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsRetraining(false)
  }

  return (
    <div className="space-y-6">
      {/* Model Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Model Version</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">v2.1.3</div>
            <p className="text-xs text-muted-foreground">Last updated 2 days ago</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Accuracy</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87.8%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Samples</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">+234 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Model Health</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Healthy</div>
            <p className="text-xs text-muted-foreground">All metrics normal</p>
          </CardContent>
        </Card>
      </div>

      {/* Model Actions */}
      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
        <div>
          <h3 className="font-medium">Model Management</h3>
          <p className="text-sm text-muted-foreground">Retrain model with latest data or export performance reports</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={handleRetrain} disabled={isRetraining} size="sm">
            <RefreshCw className={`h-4 w-4 mr-2 ${isRetraining ? "animate-spin" : ""}`} />
            {isRetraining ? "Retraining..." : "Retrain Model"}
          </Button>
        </div>
      </div>

      {/* Performance Charts */}
      <Tabs defaultValue="accuracy" className="space-y-4">
        <TabsList>
          <TabsTrigger value="accuracy">Accuracy Trends</TabsTrigger>
          <TabsTrigger value="topics">Topic Performance</TabsTrigger>
          <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="accuracy">
          <Card>
            <CardHeader>
              <CardTitle>Model Accuracy Over Time</CardTitle>
              <CardDescription>Tracking prediction accuracy and volume</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={accuracyData}>
                    <XAxis dataKey="date" />
                    <YAxis domain={[80, 90]} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value, name) => [
                            `${value}${name === "accuracy" ? "%" : ""}`,
                            name === "accuracy" ? "Accuracy" : "Predictions",
                          ]}
                        />
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="var(--color-accuracy)"
                      strokeWidth={2}
                      dot={{ fill: "var(--color-accuracy)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics">
          <Card>
            <CardHeader>
              <CardTitle>Topic-wise Accuracy</CardTitle>
              <CardDescription>Model performance across different subject areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topicAccuracy.map((topic) => (
                  <div key={topic.topic} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{topic.topic}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant={topic.accuracy >= 85 ? "default" : "secondary"}>{topic.accuracy}%</Badge>
                        <span className="text-sm text-muted-foreground">{topic.samples} samples</span>
                      </div>
                    </div>
                    <Progress value={topic.accuracy} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Confusion Matrix</CardTitle>
                <CardDescription>Classification performance breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">1,247</div>
                    <div className="text-sm text-green-700">True Positives</div>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">89</div>
                    <div className="text-sm text-red-700">False Positives</div>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">156</div>
                    <div className="text-sm text-red-700">False Negatives</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">2,108</div>
                    <div className="text-sm text-green-700">True Negatives</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key model evaluation metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Precision</span>
                  <Badge variant="default">93.3%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Recall</span>
                  <Badge variant="default">88.9%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>F1-Score</span>
                  <Badge variant="default">91.0%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>AUC-ROC</span>
                  <Badge variant="default">0.94</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Log Loss</span>
                  <Badge variant="secondary">0.23</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
