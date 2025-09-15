"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, CheckCircle, X, Edit, AlertTriangle } from "lucide-react"

interface MappingReview {
  id: string
  question: string
  aiTopic: string
  confidence: number
  status: "pending" | "approved" | "rejected" | "needs_review"
  reviewedBy?: string
  reviewDate?: string
  correctTopic?: string
  notes?: string
}

const mockMappings: MappingReview[] = [
  {
    id: "1",
    question: "Explain the concept of virtual memory in operating systems",
    aiTopic: "Operating Systems",
    confidence: 95,
    status: "approved",
    reviewedBy: "admin@examace.com",
    reviewDate: "2024-01-15",
  },
  {
    id: "2",
    question: "Implement binary search algorithm with complexity analysis",
    aiTopic: "Data Structures",
    confidence: 78,
    status: "needs_review",
    notes: "Should be classified as Algorithms, not Data Structures",
  },
  {
    id: "3",
    question: "What is database normalization? Explain 3NF",
    aiTopic: "Database Systems",
    confidence: 92,
    status: "pending",
  },
  {
    id: "4",
    question: "Describe TCP handshake process",
    aiTopic: "Computer Networks",
    confidence: 88,
    status: "approved",
    reviewedBy: "admin@examace.com",
    reviewDate: "2024-01-14",
  },
  {
    id: "5",
    question: "Explain software testing methodologies",
    aiTopic: "Computer Networks",
    confidence: 65,
    status: "rejected",
    reviewedBy: "admin@examace.com",
    reviewDate: "2024-01-14",
    correctTopic: "Software Engineering",
    notes: "Incorrectly mapped to Networks instead of Software Engineering",
  },
]

export function MappingReview() {
  const [mappings, setMappings] = useState<MappingReview[]>(mockMappings)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedMapping, setSelectedMapping] = useState<MappingReview | null>(null)

  const filteredMappings = mappings.filter((mapping) => {
    const matchesSearch =
      mapping.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.aiTopic.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || mapping.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateMappingStatus = (id: string, status: string, correctTopic?: string, notes?: string) => {
    setMappings((prev) =>
      prev.map((mapping) =>
        mapping.id === id
          ? {
              ...mapping,
              status: status as any,
              reviewedBy: "admin@examace.com",
              reviewDate: new Date().toISOString().split("T")[0],
              correctTopic,
              notes,
            }
          : mapping,
      ),
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Approved
          </Badge>
        )
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "needs_review":
        return <Badge variant="secondary">Needs Review</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) {
      return <Badge variant="default">High ({confidence}%)</Badge>
    } else if (confidence >= 70) {
      return <Badge variant="secondary">Medium ({confidence}%)</Badge>
    } else {
      return <Badge variant="destructive">Low ({confidence}%)</Badge>
    }
  }

  const pendingCount = mappings.filter((m) => m.status === "pending" || m.status === "needs_review").length

  return (
    <div className="space-y-6">
      {/* Review Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span className="font-medium text-yellow-800">Pending Review</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{pendingCount}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-800">Approved</span>
          </div>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {mappings.filter((m) => m.status === "approved").length}
          </p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center space-x-2">
            <X className="h-5 w-5 text-red-600" />
            <span className="font-medium text-red-800">Rejected</span>
          </div>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {mappings.filter((m) => m.status === "rejected").length}
          </p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2">
            <Edit className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-800">Total Mappings</span>
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-1">{mappings.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search questions or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="needs_review">Needs Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Mappings Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead>AI Topic</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reviewed By</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMappings.map((mapping) => (
              <TableRow key={mapping.id}>
                <TableCell className="max-w-md">
                  <p className="font-medium truncate" title={mapping.question}>
                    {mapping.question}
                  </p>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{mapping.aiTopic}</Badge>
                  {mapping.correctTopic && (
                    <div className="mt-1">
                      <Badge variant="default" className="bg-blue-100 text-blue-800">
                        → {mapping.correctTopic}
                      </Badge>
                    </div>
                  )}
                </TableCell>
                <TableCell>{getConfidenceBadge(mapping.confidence)}</TableCell>
                <TableCell>{getStatusBadge(mapping.status)}</TableCell>
                <TableCell>
                  {mapping.reviewedBy ? (
                    <div>
                      <p className="text-sm">{mapping.reviewedBy}</p>
                      <p className="text-xs text-muted-foreground">{mapping.reviewDate}</p>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedMapping(mapping)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Review Mapping</DialogTitle>
                          <DialogDescription>Review and correct the AI-generated topic mapping</DialogDescription>
                        </DialogHeader>
                        {selectedMapping && (
                          <MappingReviewDialog
                            mapping={selectedMapping}
                            onUpdate={(status, correctTopic, notes) => {
                              updateMappingStatus(selectedMapping.id, status, correctTopic, notes)
                              setSelectedMapping(null)
                            }}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateMappingStatus(mapping.id, "approved")}
                      disabled={mapping.status === "approved"}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateMappingStatus(mapping.id, "rejected")}
                      disabled={mapping.status === "rejected"}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function MappingReviewDialog({
  mapping,
  onUpdate,
}: {
  mapping: MappingReview
  onUpdate: (status: string, correctTopic?: string, notes?: string) => void
}) {
  const [correctTopic, setCorrectTopic] = useState(mapping.correctTopic || mapping.aiTopic)
  const [notes, setNotes] = useState(mapping.notes || "")

  const topics = [
    "Data Structures",
    "Algorithms",
    "Database Systems",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
    "Computer Graphics",
    "Artificial Intelligence",
    "Compiler Design",
    "Theory of Computation",
  ]

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Question</h4>
        <p className="text-sm bg-muted p-3 rounded">{mapping.question}</p>
      </div>

      <div>
        <h4 className="font-medium mb-2">AI Suggested Topic</h4>
        <Badge variant="outline">{mapping.aiTopic}</Badge>
        <span className="ml-2 text-sm text-muted-foreground">({mapping.confidence}% confidence)</span>
      </div>

      <div>
        <h4 className="font-medium mb-2">Correct Topic</h4>
        <Select value={correctTopic} onValueChange={setCorrectTopic}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {topics.map((topic) => (
              <SelectItem key={topic} value={topic}>
                {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h4 className="font-medium mb-2">Review Notes</h4>
        <Textarea
          placeholder="Add notes about this mapping..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Button onClick={() => onUpdate("approved", correctTopic, notes)} className="bg-green-600 hover:bg-green-700">
          Approve
        </Button>
        <Button onClick={() => onUpdate("rejected", correctTopic, notes)} variant="destructive">
          Reject
        </Button>
        <Button onClick={() => onUpdate("needs_review", correctTopic, notes)} variant="outline">
          Needs Review
        </Button>
      </div>
    </div>
  )
}
