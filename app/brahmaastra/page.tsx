import { Sidebar } from "@/components/sidebar"
import { BrahmastraConfig } from "@/components/brahmaastra-config"
import { BrahmastraTopics } from "@/components/brahmaastra-topics"
import { BrahmastraQuestions } from "@/components/brahmaastra-questions"
import { BrahmastraSchedule } from "@/components/brahmaastra-schedule"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Target, Zap, Clock, AlertTriangle } from "lucide-react"

export default function BrahmastraPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="md:ml-64">
        <main className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Brahmaastra Mode</h1>
                <p className="text-muted-foreground text-lg">Minimal study plan for maximum impact</p>
              </div>
            </div>

            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Last-minute strategy:</strong> This mode focuses on the absolute essentials to help you pass
                your exam with minimal time investment. Use only when you have limited time before the exam.
              </AlertDescription>
            </Alert>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Essential Topics</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">8</div>
                <p className="text-xs text-muted-foreground">High-yield topics only</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Must-Do Questions</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">25</div>
                <p className="text-xs text-muted-foreground">Frequently asked patterns</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">18h</div>
                <p className="text-xs text-muted-foreground">Optimized schedule</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pass Probability</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">78%</div>
                <p className="text-xs text-muted-foreground">Based on historical data</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Configuration */}
            <div className="lg:col-span-1">
              <BrahmastraConfig />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="topics" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="topics">Essential Topics</TabsTrigger>
                  <TabsTrigger value="questions">Must-Do Questions</TabsTrigger>
                  <TabsTrigger value="schedule">Study Schedule</TabsTrigger>
                </TabsList>

                <TabsContent value="topics">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-orange-500" />
                        High-Yield Topics
                      </CardTitle>
                      <CardDescription>Topics with maximum impact on your exam score</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <BrahmastraTopics />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="questions">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-orange-500" />
                        Must-Do Questions
                      </CardTitle>
                      <CardDescription>Questions most likely to appear based on frequency analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <BrahmastraQuestions />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="schedule">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-orange-500" />
                        Optimized Schedule
                      </CardTitle>
                      <CardDescription>Time-efficient study plan for maximum retention</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <BrahmastraSchedule />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
