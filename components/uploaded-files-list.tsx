"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, ImageIcon, Download, Trash2, Eye } from "lucide-react"

interface FileItem {
  id: string
  name: string
  type: "syllabus" | "pyq"
  format: string
  size: string
  uploadDate: string
  status: "processed" | "processing" | "error"
  extractedText?: number
  topics?: number
}

// Mock data - in real app this would come from API
const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "Computer Science Syllabus 2024.pdf",
    type: "syllabus",
    format: "PDF",
    size: "2.3 MB",
    uploadDate: "2024-01-15",
    status: "processed",
    topics: 12,
  },
  {
    id: "2",
    name: "CS Previous Year 2023.pdf",
    type: "pyq",
    format: "PDF",
    size: "4.1 MB",
    uploadDate: "2024-01-15",
    status: "processed",
    extractedText: 45,
  },
  {
    id: "3",
    name: "Math Questions 2022.jpg",
    type: "pyq",
    format: "JPG",
    size: "1.8 MB",
    uploadDate: "2024-01-15",
    status: "processing",
  },
]

export function UploadedFilesList() {
  const [files] = useState<FileItem[]>(mockFiles)

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
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getFileIcon = (type: string, format: string) => {
    if (["JPG", "PNG", "JPEG", "WEBP"].includes(format)) {
      return <ImageIcon className="h-5 w-5 text-blue-500" />
    }
    return <FileText className="h-5 w-5 text-green-500" />
  }

  if (files.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Files</CardTitle>
          <CardDescription>No files uploaded yet</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Upload your syllabus and question papers to see them here
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded Files</CardTitle>
        <CardDescription>Manage your uploaded syllabus and question papers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                {getFileIcon(file.type, file.format)}

                <div className="flex-1">
                  <h4 className="font-medium">{file.name}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-muted-foreground">{file.format}</span>
                    <span className="text-sm text-muted-foreground">{file.size}</span>
                    <span className="text-sm text-muted-foreground">
                      Uploaded {new Date(file.uploadDate).toLocaleDateString()}
                    </span>
                  </div>

                  {file.status === "processed" && (
                    <div className="flex items-center space-x-4 mt-2">
                      {file.topics && <span className="text-xs text-accent">{file.topics} topics identified</span>}
                      {file.extractedText && (
                        <span className="text-xs text-accent">{file.extractedText} questions extracted</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {getStatusBadge(file.status)}

                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
