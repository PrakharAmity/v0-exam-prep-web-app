"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Edit, CheckCircle } from "lucide-react"

interface TopicMapping {
  id: string
  question: string
  topic: string
  confidence: number
  year: string
  questionType: string
  status: "verified" | "needs_review" | "auto_mapped"
}

const mockMappings: TopicMapping[] = [
  {
    id: "1",
    question: "Explain the concept of virtual memory and its advantages",
    topic: "Operating Systems",
    confidence: 95,
    year: "2023",
    questionType: "Long Answer",
    status: "verified",
  },
  {
    id: "2",
    question: "Implement binary search algorithm with time complexity analysis",
    topic: "Algorithms",
    confidence: 92,
    year: "2023",
    questionType: "Programming",
    status: "verified",
  },
  {
    id: "3",
    question: "What is normalization? Explain 1NF, 2NF, and 3NF with examples",
    topic: "Database Systems",
    confidence: 88,
    year: "2022",
    questionType: "Long Answer",
    status: "needs_review",
  },
  {
    id: "4",
    question: "Describe TCP/IP protocol stack",
    topic: "Computer Networks",
    confidence: 85,
    year: "2022",
    questionType: "Short Answer",
    status: "auto_mapped",
  },
  {
    id: "5",
    question: "Explain different types of software testing",
    topic: "Software Engineering",
    confidence: 78,
    year: "2021",
    questionType: "Short Answer",
    status: "needs_review",
  },
]

export function TopicMappingTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [mappings] = useState<TopicMapping[]>(mockMappings)

  const filteredMappings = mappings.filter(
    (mapping) =>
      mapping.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.topic.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Verified
          </Badge>
        )
      case "needs_review":
        return <Badge variant="secondary">Needs Review</Badge>
      case "auto_mapped":
        return <Badge variant="outline">Auto-mapped</Badge>
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

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search questions or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          Filter
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead>Topic</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMappings.map((mapping) => (
              <TableRow key={mapping.id}>
                <TableCell className="max-w-md">
                  <p className="text-sm font-medium truncate" title={mapping.question}>
                    {mapping.question}
                  </p>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{mapping.topic}</Badge>
                </TableCell>
                <TableCell>{getConfidenceBadge(mapping.confidence)}</TableCell>
                <TableCell>{mapping.year}</TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{mapping.questionType}</span>
                </TableCell>
                <TableCell>{getStatusBadge(mapping.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {mapping.status === "needs_review" && (
                      <Button variant="ghost" size="sm">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredMappings.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">No mappings found matching your search criteria.</div>
      )}
    </div>
  )
}
