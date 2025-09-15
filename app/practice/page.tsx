"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Target, TrendingUp, BookOpen, CheckCircle, XCircle } from "lucide-react"

export default function PracticePage() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null)

  const mockTests = [
    {
      id: "1",
      title: "Full Mock Test 1",
      duration: 180,
      questions: 100,
      difficulty: "Mixed",
      attempted: false,
      score: null,
    },
    {
      id: "2",
      title: "Topic-wise: Algorithms",
      duration: 60,
      questions: 30,
      difficulty: "Medium",
      attempted: true,
      score: 85,
    },
    {
      id: "3",
      title: "Previous Year 2023",
      duration: 180,
      questions: 100,
      difficulty: "Hard",
      attempted: true,
      score: 78,
    },
  ]

  const practiceStats = {
    totalQuestions: 450,
    attempted: 320,
    correct: 280,
    accuracy: 87.5,
    averageTime: 2.3,
    streak: 12,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Practice & Mock Tests</h1>
        <p className="text-gray-600 mt-2">Test your knowledge and track your progress</p>
      </div>

      {/* Practice Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Questions Attempted</p>
                <p className="text-2xl font-bold">{practiceStats.attempted}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Accuracy</p>
                <p className="text-2xl font-bold">{practiceStats.accuracy}%</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Time/Question</p>
                <p className="text-2xl font-bold">{practiceStats.averageTime}m</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold">{practiceStats.streak}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="mock-tests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="mock-tests">Mock Tests</TabsTrigger>
          <TabsTrigger value="topic-practice">Topic Practice</TabsTrigger>
          <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="mock-tests" className="space-y-4">
          <div className="grid gap-4">
            {mockTests.map((test) => (
              <Card key={test.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{test.title}</CardTitle>
                      <CardDescription>
                        {test.questions} questions • {test.duration} minutes • {test.difficulty}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {test.attempted && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Score: {test.score}%
                        </Badge>
                      )}
                      <Badge
                        variant={
                          test.difficulty === "Hard"
                            ? "destructive"
                            : test.difficulty === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {test.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {test.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {test.questions} questions
                      </span>
                    </div>
                    <Button onClick={() => setSelectedTest(test.id)} variant={test.attempted ? "outline" : "default"}>
                      {test.attempted ? "Retake Test" : "Start Test"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="topic-practice" className="space-y-4">
          <div className="grid gap-4">
            {[
              { topic: "Data Structures", questions: 45, completed: 38, accuracy: 84 },
              { topic: "Algorithms", questions: 52, completed: 45, accuracy: 89 },
              { topic: "Database Systems", questions: 35, completed: 28, accuracy: 82 },
              { topic: "Operating Systems", questions: 40, completed: 32, accuracy: 78 },
              { topic: "Computer Networks", questions: 38, completed: 25, accuracy: 86 },
            ].map((topic) => (
              <Card key={topic.topic}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{topic.topic}</h3>
                      <p className="text-sm text-gray-600">
                        {topic.completed}/{topic.questions} questions completed
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Accuracy</p>
                      <p className="text-lg font-semibold text-green-600">{topic.accuracy}%</p>
                    </div>
                  </div>
                  <Progress value={(topic.completed / topic.questions) * 100} className="mb-4" />
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">{topic.questions - topic.completed} remaining</Badge>
                    <Button size="sm">Continue Practice</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Performance Trends</CardTitle>
                <CardDescription>Your accuracy and speed over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Accuracy</span>
                    <span className="text-sm text-green-600">↑ 5.2%</span>
                  </div>
                  <Progress value={87.5} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Speed (Questions/Hour)</span>
                    <span className="text-sm text-blue-600">↑ 12%</span>
                  </div>
                  <Progress value={75} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Consistency Score</span>
                    <span className="text-sm text-purple-600">↑ 8%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Strengths & Weaknesses</CardTitle>
                <CardDescription>Areas to focus on for improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-green-600 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Strong Areas
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Data Structures</span>
                        <span className="text-sm font-medium">89%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Algorithms</span>
                        <span className="text-sm font-medium">87%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Programming</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-red-600 mb-3 flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      Needs Improvement
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Operating Systems</span>
                        <span className="text-sm font-medium">68%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Computer Networks</span>
                        <span className="text-sm font-medium">72%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Database Systems</span>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
