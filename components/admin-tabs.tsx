"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ContentManagement } from "@/components/content-management"
import { ModelMonitoring } from "@/components/model-monitoring"
import { MappingReview } from "@/components/mapping-review"
import { SystemSettings } from "@/components/system-settings"
import { UserManagement } from "@/components/user-management"
import { FileText, Brain, CheckCircle, Settings, Users } from "lucide-react"

export function AdminTabs() {
  return (
    <Tabs defaultValue="content" className="space-y-6">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="content" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Content
        </TabsTrigger>
        <TabsTrigger value="model" className="flex items-center gap-2">
          <Brain className="h-4 w-4" />
          AI Model
        </TabsTrigger>
        <TabsTrigger value="mappings" className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          Mappings
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Users
        </TabsTrigger>
        <TabsTrigger value="system" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          System
        </TabsTrigger>
      </TabsList>

      <TabsContent value="content">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Content Management
            </CardTitle>
            <CardDescription>Manage uploaded files, syllabus content, and question papers</CardDescription>
          </CardHeader>
          <CardContent>
            <ContentManagement />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="model">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              AI Model Monitoring
            </CardTitle>
            <CardDescription>Monitor model performance, accuracy metrics, and training data</CardDescription>
          </CardHeader>
          <CardContent>
            <ModelMonitoring />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="mappings">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Mapping Review
            </CardTitle>
            <CardDescription>Review and correct AI-generated topic-question mappings</CardDescription>
          </CardHeader>
          <CardContent>
            <MappingReview />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="users">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-500" />
              User Management
            </CardTitle>
            <CardDescription>Manage user accounts, permissions, and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <UserManagement />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="system">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-500" />
              System Settings
            </CardTitle>
            <CardDescription>Configure system parameters, API keys, and global settings</CardDescription>
          </CardHeader>
          <CardContent>
            <SystemSettings />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
