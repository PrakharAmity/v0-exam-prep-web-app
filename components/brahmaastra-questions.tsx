"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Circle, Search, Star, Clock, TrendingUp } from "lucide-react"

interface BrahmastraQuestion {
  id: string
  question: string
  topic: string
  frequency: number
  lastAsked: string
  difficulty: "easy" | "medium" | "hard"
  timeToSolve: number
  keyPoints: string[]
  completed: boolean
  type: "theory" | "numerical" | "programming"
}

const mockQuestions: BrahmastraQuestion[] = [
  {
    id: "1",
    question: "Explain the difference between Array and Linked List with time complexity",
    topic: "Data Structures",
    frequency: 95,
    lastAsked: "2023",
    difficulty: "easy",
    timeToSolve: 10,
    keyPoints: ["Memory allocation", "Access time O(1) vs O(n)", "Insertion/deletion complexity"],
    completed: true,
    type: "theory",
  },
  {
    id: "2",
    question: "Implement Quick Sort algorithm and analyze its time complexity",
    topic: "Algorithms",
    frequency: 90,
    lastAsked: "2023",
    difficulty: "medium",
    timeToSolve: 20,
    keyPoints: ["Partitioning logic", "Best case O(n log n)", "Worst case O(n²)"],
    completed: false,
    type: "programming",
  },
  {
    id: "3",
    question: "Normalize the given table to 3NF",
    topic: "Database Systems",
    frequency: 85,
    lastAsked: "2022",
    difficulty: "easy",
    timeToSolve: 15,
    keyPoints: ["Identify functional dependencies", "Remove transitive dependencies", "Decompose tables"],
    completed: false,
    type: "numerical",
  },
  {
    id: "4",
    question: "Explain process scheduling algorithms: FCFS, SJF, Round Robin",
    topic: "Operating Systems",
    frequency: 80,
    lastAsked: "2023",
    difficulty: "medium",
    timeToSolve: 15,
    keyPoints: ["Algorithm comparison", "Advantages/disadvantages", "Gantt chart representation"],
    completed: false,
    type: "theory",
  },
  {
    id: "5",
    question: "Calculate subnet mask for given IP address and requirements",
    topic: "Computer Networks",
    frequency: 75,
    lastAsked: "2022",
    difficulty: "medium",
    timeToSolve: 12,
    keyPoints: ["CIDR notation", "Subnet calculation", "Host range determination"],
    completed: false,
    type: "numerical",
  },
]

export function BrahmastraQuestions() {
  const [questions, setQuestions] = useState<BrahmastraQuestion[]>(mockQuestions)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")

  const toggleCompletion = (questionId: string) => {
    setQuestions((prev) => prev.map((q) => (q.id === questionId ? { ...q, completed: !q.completed } : q)))
  }

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.topic.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || question.type === selectedType
    return matchesSearch && matchesType
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "theory":
        return "📝"
      case "numerical":
        return "🔢"
      case "programming":
        return "💻"
      default:
        return "❓"
    }
  }

  const completedQuestions = questions.filter((q) => q.completed).length
  const totalQuestions = questions.length

  return (
    <div className="space-y-6">
      {/* Progress and Search */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {completedQuestions} of {totalQuestions} questions completed
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Question Type Tabs */}
      <Tabs value={selectedType} onValueChange={setSelectedType}>
        <TabsList>
          <TabsTrigger value="all">All Questions</TabsTrigger>
          <TabsTrigger value="theory">Theory</TabsTrigger>
          <TabsTrigger value="numerical">Numerical</TabsTrigger>
          <TabsTrigger value="programming">Programming</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedType} className="space-y-4">
          {filteredQuestions.map((question) => (
            <div key={question.id} className="border rounded-lg p-4 space-y-3">
              {/* Question Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <Button variant="ghost" size="sm" onClick={() => toggleCompletion(question.id)} className="mt-1">
                    {question.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">{getTypeIcon(question.type)}</span>
                      <h4 className="font-medium">{question.question}</h4>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Topic: {question.topic}</span>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>{question.frequency}% frequency</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{question.timeToSolve} min</span>
                      </div>
                      <span>Last asked: {question.lastAsked}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                  {question.frequency >= 90 && <Star className="h-4 w-4 text-yellow-500" />}
                </div>
              </div>

              {/* Key Points */}
              <div className="ml-8">
                <h5 className="font-medium text-sm mb-2 text-orange-700">Key Points to Remember:</h5>
                <ul className="space-y-1">
                  {question.keyPoints.map((point, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="ml-8 flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  {question.completed ? "Review Answer" : "Practice Now"}
                </Button>
                <Button size="sm" variant="ghost">
                  View Solution
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">No questions found matching your criteria.</div>
      )}

      {/* Study Strategy */}
      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
        <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
          <Star className="h-4 w-4" />
          Question Strategy
        </h4>
        <ul className="text-sm text-red-700 space-y-1">
          <li>• Start with highest frequency questions (90%+)</li>
          <li>• Focus on questions asked in last 2 years</li>
          <li>• Practice easy questions first for confidence</li>
          <li>• Memorize key points, don't aim for perfect answers</li>
          <li>• Time yourself - aim for 70% of allocated time</li>
        </ul>
      </div>
    </div>
  )
}
