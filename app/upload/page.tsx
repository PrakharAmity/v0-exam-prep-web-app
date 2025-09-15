import { Sidebar } from "@/components/sidebar"
import { FileUploadArea } from "@/components/file-upload-area"
import { UploadedFilesList } from "@/components/uploaded-files-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, ImageIcon, AlertCircle } from "lucide-react"

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="md:ml-64">
        <main className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Upload Files</h1>
            <p className="text-muted-foreground text-lg">
              Upload your syllabus and previous year question papers to get started
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload Areas */}
            <div className="lg:col-span-2 space-y-6">
              {/* Syllabus Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-accent" />
                    Syllabus Files
                  </CardTitle>
                  <CardDescription>Upload your exam syllabus in PDF, DOCX, or TXT format</CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUploadArea
                    accept=".pdf,.docx,.txt"
                    fileType="syllabus"
                    maxFiles={5}
                    maxSize={10 * 1024 * 1024} // 10MB
                  />
                </CardContent>
              </Card>

              {/* PYQ Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-accent" />
                    Previous Year Questions (PYQs)
                  </CardTitle>
                  <CardDescription>
                    Upload question papers in PDF, DOCX, or image formats. OCR will extract text from scanned documents.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUploadArea
                    accept=".pdf,.docx,.jpg,.jpeg,.png,.webp"
                    fileType="pyq"
                    maxFiles={20}
                    maxSize={20 * 1024 * 1024} // 20MB
                  />
                </CardContent>
              </Card>
            </div>

            {/* Instructions and Tips */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-accent" />
                    Upload Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Syllabus Files</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Include complete course outline</li>
                      <li>• Chapter/topic weightage if available</li>
                      <li>• Clear text format preferred</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Question Papers</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Upload multiple years for better analysis</li>
                      <li>• Include answer keys if available</li>
                      <li>• Scanned images are supported with OCR</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">File Formats</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-muted rounded text-xs">PDF</span>
                      <span className="px-2 py-1 bg-muted rounded text-xs">DOCX</span>
                      <span className="px-2 py-1 bg-muted rounded text-xs">TXT</span>
                      <span className="px-2 py-1 bg-muted rounded text-xs">JPG</span>
                      <span className="px-2 py-1 bg-muted rounded text-xs">PNG</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Processing Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-accent" />
                    Processing Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Files Uploaded</span>
                      <span className="text-sm font-medium">0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">OCR Processing</span>
                      <span className="text-sm font-medium">0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Ready for Analysis</span>
                      <span className="text-sm font-medium">0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Uploaded Files List */}
          <div className="mt-8">
            <UploadedFilesList />
          </div>
        </main>
      </div>
    </div>
  )
}
