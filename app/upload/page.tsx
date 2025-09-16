"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { FileUploadArea } from "@/components/file-upload-area"
import { UploadedFilesList } from "@/components/uploaded-files-list"
import { TopicPriorityChart } from "@/components/topic-priority-chart"
import { QuestionDistributionChart } from "@/components/question-distribution-chart"
import { TopicMappingTable } from "@/components/topic-mapping-table"
import { PredictionConfidenceChart } from "@/components/prediction-confidence-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  FileText,
  ImageIcon,
  AlertCircle,
  BarChart3,
  PieChart,
  Target,
  TrendingUp,
  Download,
  RefreshCw,
  ArrowRight,
} from "lucide-react"

export default function UploadPage() {
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState(0)

  // Mock function to simulate file upload completion
  const handleFilesUploaded = () => {
    setUploadedFiles((prev) => prev + 1)
    // Show analysis after first file is uploaded
    if (uploadedFiles === 0) {
      setTimeout(() => setShowAnalysis(true), 2000) // Simulate processing time
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="md:ml-64">
        <main className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {showAnalysis ? "Upload & Analysis" : "Upload Files"}
            </h1>
            <p className="text-muted-foreground text-lg">
              {showAnalysis
                ? "Your files have been analyzed. Review the results below and upload more files if needed."
                : "Upload your syllabus and previous year question papers to get started"}
            </p>
          </div>

          {!showAnalysis ? (
            <>
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
                        onUpload={handleFilesUploaded}
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
                        Upload question papers in PDF, DOCX, or image formats. OCR will extract text from scanned
                        documents.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FileUploadArea
                        accept=".pdf,.docx,.jpg,.jpeg,.png,.webp"
                        fileType="pyq"
                        maxFiles={20}
                        maxSize={20 * 1024 * 1024} // 20MB
                        onUpload={handleFilesUploaded}
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

              {uploadedFiles > 0 && (
                <Card className="mt-6">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                      <div>
                        <p className="font-medium">Processing your files...</p>
                        <p className="text-sm text-muted-foreground">
                          AI is analyzing your documents and generating insights
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm font-medium">Analysis Complete</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setShowAnalysis(false)}>
                      Upload More Files
                    </Button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                    <Button size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Re-analyze
                    </Button>
                  </div>
                </div>
              </div>

              {/* Analysis Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Topics Identified</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">From 3 syllabus files</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Questions Mapped</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">156</div>
                    <p className="text-xs text-muted-foreground">From 8 PYQ files</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">High Priority Topics</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">Above 80% priority score</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Prediction Accuracy</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">87%</div>
                    <p className="text-xs text-muted-foreground">Based on historical data</p>
                  </CardContent>
                </Card>
              </div>

              {/* Main Analysis Content */}
              <Tabs defaultValue="priority" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="priority">Topic Priority</TabsTrigger>
                  <TabsTrigger value="distribution">Question Distribution</TabsTrigger>
                  <TabsTrigger value="mapping">Topic Mapping</TabsTrigger>
                  <TabsTrigger value="predictions">Predictions</TabsTrigger>
                </TabsList>

                <TabsContent value="priority" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Topic Priority Analysis</CardTitle>
                          <CardDescription>Topics ranked by frequency, recency, and syllabus weightage</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <TopicPriorityChart />
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Top Priority Topics</CardTitle>
                          <CardDescription>Must-study topics for your exam</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {[
                            { name: "Data Structures", score: 95, questions: 18 },
                            { name: "Algorithms", score: 92, questions: 15 },
                            { name: "Database Systems", score: 88, questions: 12 },
                            { name: "Operating Systems", score: 85, questions: 14 },
                            { name: "Computer Networks", score: 82, questions: 10 },
                          ].map((topic, index) => (
                            <div key={topic.name} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-medium">
                                  {index + 1}
                                </div>
                                <div>
                                  <p className="font-medium">{topic.name}</p>
                                  <p className="text-sm text-muted-foreground">{topic.questions} questions</p>
                                </div>
                              </div>
                              <Badge variant={topic.score >= 90 ? "default" : "secondary"}>{topic.score}%</Badge>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Next Steps</CardTitle>
                          <CardDescription>Continue your exam preparation journey</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <Button
                            className="w-full justify-between"
                            onClick={() => (window.location.href = "/study-plan")}
                          >
                            Generate Study Plan
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-between bg-transparent"
                            onClick={() => (window.location.href = "/brahmaastra")}
                          >
                            Try Brahmaastra Mode
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="distribution" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Question Distribution by Topic</CardTitle>
                        <CardDescription>How questions are distributed across different topics</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <QuestionDistributionChart />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Question Types Analysis</CardTitle>
                        <CardDescription>Distribution of question types across years</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { type: "Multiple Choice", count: 45, percentage: 29 },
                            { type: "Short Answer", count: 38, percentage: 24 },
                            { type: "Long Answer", count: 32, percentage: 21 },
                            { type: "Numerical", count: 25, percentage: 16 },
                            { type: "True/False", count: 16, percentage: 10 },
                          ].map((item) => (
                            <div key={item.type} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>{item.type}</span>
                                <span>
                                  {item.count} questions ({item.percentage}%)
                                </span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-accent h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="mapping" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Topic-Question Mapping</CardTitle>
                      <CardDescription>
                        Detailed mapping of questions to syllabus topics with confidence scores
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TopicMappingTable />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="predictions" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Prediction Confidence</CardTitle>
                        <CardDescription>AI confidence levels for topic predictions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <PredictionConfidenceChart />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Likely Questions</CardTitle>
                        <CardDescription>Questions most likely to appear based on patterns</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          {
                            question: "Explain the concept of virtual memory in operating systems",
                            topic: "Operating Systems",
                            confidence: 92,
                            reason: "Asked in 4/5 recent papers",
                          },
                          {
                            question: "Implement binary search algorithm",
                            topic: "Algorithms",
                            confidence: 88,
                            reason: "High frequency pattern",
                          },
                          {
                            question: "Normalize database to 3NF",
                            topic: "Database Systems",
                            confidence: 85,
                            reason: "Core syllabus topic",
                          },
                        ].map((item, index) => (
                          <div key={index} className="p-4 border rounded-lg space-y-2">
                            <div className="flex items-start justify-between">
                              <p className="font-medium text-sm">{item.question}</p>
                              <Badge variant="outline">{item.confidence}%</Badge>
                            </div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{item.topic}</span>
                              <span>{item.reason}</span>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
