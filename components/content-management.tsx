"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Trash2, Eye, Edit, RefreshCw, Filter } from "lucide-react"

interface ContentItem {
  id: string
  filename: string
  type: "syllabus" | "pyq"
  uploadDate: string
  size: string
  status: "processed" | "processing" | "error" | "pending"
  user: string
  topics: number
  questions: number
}

const mockContent: ContentItem[] = [
  {
    id: "1",
    filename: "CS_Syllabus_2024.pdf",
    type: "syllabus",
    uploadDate: "2024-01-15",
    size: "2.3 MB",
    status: "processed",
    user: "john.doe@email.com",
    topics: 12,
    questions: 0,
  },
  {
    id: "2",
    filename: "Previous_Year_2023.pdf",
    type: "pyq",
    uploadDate: "2024-01-15",
    size: "4.1 MB",
    status: "processed",
    user: "jane.smith@email.com",
    topics: 0,
    questions: 45,
  },
  {
    id: "3",
    filename: "Math_Questions_2022.jpg",
    type: "pyq",
    uploadDate: "2024-01-14",
    size: "1.8 MB",
    status: "processing",
    user: "bob.wilson@email.com",
    topics: 0,
    questions: 0,
  },
  {
    id: "4",
    filename: "Database_Syllabus.docx",
    type: "syllabus",
    uploadDate: "2024-01-14",
    size: "856 KB",
    status: "error",
    user: "alice.brown@email.com",
    topics: 0,
    questions: 0,
  },
]

export function ContentManagement() {
  const [content] = useState<ContentItem[]>(mockContent)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesType = typeFilter === "all" || item.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Processed
          </Badge>
        )
      case "processing":
        return <Badge variant="secondary">Processing</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    return (
      <Badge variant="outline" className={type === "syllabus" ? "text-blue-700" : "text-green-700"}>
        {type === "syllabus" ? "Syllabus" : "PYQ"}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files or users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="processed">Processed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="syllabus">Syllabus</SelectItem>
              <SelectItem value="pyq">PYQ</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filter
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Content Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Filename</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContent.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.filename}</TableCell>
                <TableCell>{getTypeBadge(item.type)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{item.user}</TableCell>
                <TableCell className="text-sm">{new Date(item.uploadDate).toLocaleDateString()}</TableCell>
                <TableCell className="text-sm">{item.size}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    {item.topics > 0 && <span className="text-blue-600">{item.topics} topics</span>}
                    {item.questions > 0 && <span className="text-green-600">{item.questions} questions</span>}
                    {item.topics === 0 && item.questions === 0 && (
                      <span className="text-muted-foreground">No content</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">No content found matching your criteria.</div>
      )}

      {/* Bulk Actions */}
      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
        <div className="text-sm text-muted-foreground">
          Showing {filteredContent.length} of {content.length} files
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Bulk Process
          </Button>
          <Button variant="outline" size="sm">
            Export List
          </Button>
          <Button variant="destructive" size="sm">
            Delete Selected
          </Button>
        </div>
      </div>
    </div>
  )
}
