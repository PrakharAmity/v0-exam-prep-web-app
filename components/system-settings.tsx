"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, Key, Mail, Shield } from "lucide-react"

export function SystemSettings() {
  const [settings, setSettings] = useState({
    // API Settings
    openaiApiKey: "sk-****************************",
    maxFileSize: "20",
    maxFilesPerUser: "50",
    ocrEnabled: true,
    
    // Email Settings
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUser: "noreply@examace.com",
    smtpPassword: "**********************",
    emailNotifications: true,
    
    // Security Settings
    sessionTimeout: "24",
    maxLoginAttempts: "5",
    requireEmailVerification: true,
    enableTwoFactor: false,
    
    // System Settings
    maintenanceMode: false,
    debugMode: false,
    logLevel: "info",
    backupFrequency: "daily",
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)
  }

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="api" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            API & AI
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API & AI Configuration</CardTitle>
              <CardDescription>Configure external API keys and AI model settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="openaiKey">OpenAI API Key</Label>
                <Input
                  id="openaiKey"
                  type="password"
                  value={settings.openaiApiKey}
                  onChange={(e) => updateSetting("openaiApiKey", e.target.value)}
                  placeholder="sk-..."
                />
                <p className="text-xs text-muted-foreground">Used for AI-powered topic analysis and question mapping</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={settings.maxFileSize}
                    onChange={(e) => updateSetting("maxFileSize", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxFiles">Max Files Per User</Label>
                  <Input
                    id="maxFiles"
                    type="number"
                    value={settings.maxFilesPerUser}
                    onChange={(e) => updateSetting("maxFilesPerUser", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>OCR Processing</Label>
                  <p className="text-xs text-muted-foreground">Enable OCR for scanned documents and images</p>
                </div>
                <Switch
                  checked={settings.ocrEnabled}
                  onCheckedChange={(checked) => updateSetting("ocrEnabled", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>Configure SMTP settings for email notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={settings.smtpHost}
                    onChange={(e) => updateSetting("smtpHost", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    value={settings.smtpPort}
                    onChange={(e) => updateSetting("smtpPort", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtpUser">SMTP Username</Label>
                <Input
                  id="smtpUser"
                  value={settings.smtpUser}
                  onChange={(e) => updateSetting("smtpUser", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtpPassword">SMTP Password</Label>
                <Input
                  id="smtpPassword"
                  type="password"
                  value={settings.smtpPassword}
                  onChange={(e) => updateSetting("smtpPassword", e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">Send email notifications to users</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure authentication and security policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => updateSetting("sessionTimeout", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxAttempts"
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => updateSetting("maxLoginAttempts", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex\
