"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react"

interface FileUploadAreaProps {
  accept: string
  fileType: "syllabus" | "pyq"
  maxFiles: number
  maxSize: number
}

interface UploadedFile {
  id: string
  file: File
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  error?: string
}

export function FileUploadArea({ accept, fileType, maxFiles, maxSize }: FileUploadAreaProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: "uploading" as const,
      progress: 0,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])

    // Simulate file upload and processing
    newFiles.forEach((uploadedFile) => {
      simulateUpload(uploadedFile.id)
    })
  }, [])

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId) {
            if (file.progress < 100) {
              return { ...file, progress: file.progress + 10 }
            } else if (file.status === "uploading") {
              return { ...file, status: "processing" }
            } else if (file.status === "processing") {
              // Simulate random success/error
              const success = Math.random() > 0.2
              return {
                ...file,
                status: success ? "completed" : "error",
                error: success ? undefined : "Failed to process file",
              }
            }
          }
          return file
        }),
      )
    }, 500)

    setTimeout(() => clearInterval(interval), 6000)
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.split(",").reduce((acc, ext) => ({ ...acc, [ext]: [] }), {}),
    maxFiles,
    maxSize,
  })

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive ? "border-accent bg-accent/5" : "border-border hover:border-accent/50 hover:bg-accent/5",
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <div className="space-y-2">
          <p className="text-lg font-medium">
            {isDragActive ? "Drop files here" : `Upload ${fileType === "syllabus" ? "syllabus" : "question papers"}`}
          </p>
          <p className="text-sm text-muted-foreground">Drag and drop files here, or click to browse</p>
          <p className="text-xs text-muted-foreground">
            Supports: {accept.replace(/\./g, "").toUpperCase()} • Max {maxFiles} files • Max{" "}
            {Math.round(maxSize / (1024 * 1024))}MB each
          </p>
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">Uploaded Files</h4>
          {uploadedFiles.map((uploadedFile) => (
            <div key={uploadedFile.id} className="flex items-center space-x-3 p-3 border rounded-lg">
              <File className="h-5 w-5 text-muted-foreground flex-shrink-0" />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{uploadedFile.file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(uploadedFile.file.size / (1024 * 1024)).toFixed(2)} MB
                </p>

                {uploadedFile.status === "uploading" && (
                  <div className="mt-2">
                    <Progress value={uploadedFile.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Uploading...</p>
                  </div>
                )}

                {uploadedFile.status === "processing" && (
                  <p className="text-xs text-accent mt-1">Processing with OCR...</p>
                )}

                {uploadedFile.status === "error" && (
                  <p className="text-xs text-destructive mt-1">{uploadedFile.error}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {uploadedFile.status === "completed" && <CheckCircle className="h-5 w-5 text-green-500" />}
                {uploadedFile.status === "error" && <AlertCircle className="h-5 w-5 text-destructive" />}
                <Button variant="ghost" size="sm" onClick={() => removeFile(uploadedFile.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
