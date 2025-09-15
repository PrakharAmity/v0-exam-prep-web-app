import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Upload, BarChart3, Target, TrendingUp, Clock, CheckCircle } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      {/* Main content */}
      <div className="md:ml-64">
        <main className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to ExamAce</h1>
            <p className="text-muted-foreground text-lg">Your AI-powered exam preparation companion</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Files Uploaded</CardTitle>
                <Upload className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Upload syllabus & PYQs to get started</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Topics Analyzed</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">AI will analyze your content</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0%</div>
                <p className="text-xs text-muted-foreground">Complete your study plan</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Days to Exam</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">--</div>
                <p className="text-xs text-muted-foreground">Set your exam date</p>
              </CardContent>
            </Card>
          </div>

          {/* Getting Started */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-accent" />
                  Getting Started
                </CardTitle>
                <CardDescription>Follow these steps to set up your personalized study plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Upload Your Files</p>
                    <p className="text-sm text-muted-foreground">Add syllabus and previous year question papers</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Upload
                  </Button>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-muted-foreground">AI Analysis</p>
                    <p className="text-sm text-muted-foreground">Our AI will analyze and map topics to questions</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-muted-foreground">Generate Study Plan</p>
                    <p className="text-sm text-muted-foreground">Get a personalized schedule based on your exam date</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent" />
                  Brahmaastra Mode
                </CardTitle>
                <CardDescription>Minimal study plan for last-minute preparation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    When time is limited, Brahmaastra Mode identifies the absolute essentials:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      High-yield topics with maximum impact
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Most frequently asked questions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Optimized time allocation
                    </li>
                  </ul>
                  <Button className="w-full" variant="secondary">
                    Try Brahmaastra Mode
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
