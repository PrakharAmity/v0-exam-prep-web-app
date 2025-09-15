import { Sidebar } from "@/components/sidebar"
import { StudyPlanForm } from "@/components/study-plan-form"
import { GeneratedStudyPlan } from "@/components/generated-study-plan"
import { StudyPlanCalendar } from "@/components/study-plan-calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Target } from "lucide-react"

export default function StudyPlanPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="md:ml-64">
        <main className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Study Plan Generator</h1>
            <p className="text-muted-foreground text-lg">
              Create a personalized study schedule based on your exam date and available time
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Study Plan Configuration */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-accent" />
                    Plan Configuration
                  </CardTitle>
                  <CardDescription>Set your exam date and study preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <StudyPlanForm />
                </CardContent>
              </Card>
            </div>

            {/* Generated Plan */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="timeline" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="timeline">Study Timeline</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                </TabsList>

                <TabsContent value="timeline">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-accent" />
                        Your Personalized Study Plan
                      </CardTitle>
                      <CardDescription>AI-generated schedule optimized for your success</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <GeneratedStudyPlan />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="calendar">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-accent" />
                        Calendar View
                      </CardTitle>
                      <CardDescription>Visual representation of your study schedule</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <StudyPlanCalendar />
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
