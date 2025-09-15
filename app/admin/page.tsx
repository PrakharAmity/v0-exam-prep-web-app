import { Sidebar } from "@/components/sidebar"
import { AdminStats } from "@/components/admin-stats"
import { AdminTabs } from "@/components/admin-tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="md:ml-64">
        <main className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground text-lg">
                  Manage content, monitor performance, and review mappings
                </p>
              </div>
            </div>

            <Alert className="border-blue-200 bg-blue-50">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Admin Access:</strong> This interface provides administrative controls for content management,
                model monitoring, and system configuration. Use with caution.
              </AlertDescription>
            </Alert>
          </div>

          {/* Admin Stats */}
          <AdminStats />

          {/* Admin Tabs */}
          <div className="mt-8">
            <AdminTabs />
          </div>
        </main>
      </div>
    </div>
  )
}
