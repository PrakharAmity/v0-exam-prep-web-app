"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CheckCircle, Circle, ChevronDown, Clock, Target, Zap } from "lucide-react"

interface BrahmastraTopic {
  id: string
  name: string
  impact: number
  timeRequired: number
  frequency: number
  difficulty: "easy" | "medium" | "hard"
  keyPoints: string[]
  mustKnow: string[]
  completed: boolean
}

const mockTopics: BrahmastraTopic[] = [
  {
    id: "1",
    name: "Data Structures - Arrays & Linked Lists",
    impact: 95,
    timeRequired: 2.5,
    frequency: 90,
    difficulty: "easy",
    keyPoints: [
      "Array operations and time complexity",
      "Linked list insertion/deletion",
      "Circular and doubly linked lists",
    ],
    mustKnow: ["Array vs Linked List comparison", "Basic operations implementation", "Memory allocation differences"],
    completed: false,
  },
  {
    id: "2",
    name: "Algorithms - Sorting (Quick, Merge)",
    impact: 92,
    timeRequired: 2,
    frequency: 85,
    difficulty: "medium",
    keyPoints: ["Quick sort partitioning", "Merge sort divide & conquer", "Time complexity analysis"],
    mustKnow: ["Best/worst case scenarios", "Space complexity", "When to use which algorithm"],
    completed: false,
  },
  {
    id: "3",
    name: "Database - Normalization (1NF, 2NF, 3NF)",
    impact: 88,
    timeRequired: 1.5,
    frequency: 80,
    difficulty: "easy",
    keyPoints: ["First Normal Form rules", "Functional dependencies", "Decomposition process"],
    mustKnow: ["Definition of each normal form", "How to normalize a table", "Benefits of normalization"],
    completed: true,
  },
  {
    id: "4",
    name: "Operating Systems - Process Management",
    impact: 85,
    timeRequired: 2,
    frequency: 75,
    difficulty: "medium",
    keyPoints: ["Process states and transitions", "CPU scheduling algorithms", "Deadlock prevention"],
    mustKnow: ["Process vs Thread", "Context switching", "Scheduling algorithm comparison"],
    completed: false,
  },
  {
    id: "5",
    name: "Networks - TCP/IP Protocol Stack",
    impact: 82,
    timeRequired: 1.5,
    frequency: 70,
    difficulty: "easy",
    keyPoints: ["4-layer model", "TCP vs UDP", "IP addressing basics"],
    mustKnow: ["Layer responsibilities", "Protocol differences", "Basic networking concepts"],
    completed: false,
  },
]

export function BrahmastraTopics() {
  const [topics, setTopics] = useState<BrahmastraTopic[]>(mockTopics)
  const [expandedTopics, setExpandedTopics] = useState<string[]>([])

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => (prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]))
  }

  const toggleCompletion = (topicId: string) => {
    setTopics((prev) => prev.map((topic) => (topic.id === topicId ? { ...topic, completed: !topic.completed } : topic)))
  }

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

  const completedTopics = topics.filter((topic) => topic.completed).length
  const totalTopics = topics.length
  const overallProgress = (completedTopics / totalTopics) * 100

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Progress</h3>
          <span className="text-sm text-muted-foreground">
            {completedTopics} of {totalTopics} topics completed
          </span>
        </div>
        <Progress value={overallProgress} className="h-2" />
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        {topics.map((topic) => (
          <Collapsible
            key={topic.id}
            open={expandedTopics.includes(topic.id)}
            onOpenChange={() => toggleTopic(topic.id)}
          >
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleCompletion(topic.id)
                    }}
                  >
                    {topic.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                  <div className="flex-1">
                    <h4 className="font-medium">{topic.name}</h4>
                    <div className="flex items-center space-x-3 mt-1">
                      <div className="flex items-center space-x-1">
                        <Target className="h-3 w-3 text-orange-500" />
                        <span className="text-xs text-muted-foreground">{topic.impact}% impact</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-blue-500" />
                        <span className="text-xs text-muted-foreground">{topic.timeRequired}h</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Zap className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-muted-foreground">{topic.frequency}% frequency</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getDifficultyColor(topic.difficulty)}>{topic.difficulty}</Badge>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="ml-4 mt-4 space-y-4 border-l-2 border-orange-200 pl-4">
                {/* Key Points */}
                <div>
                  <h5 className="font-medium text-sm mb-2 text-orange-700">Key Points to Study</h5>
                  <ul className="space-y-1">
                    {topic.keyPoints.map((point, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Must Know */}
                <div>
                  <h5 className="font-medium text-sm mb-2 text-red-700">Must Know for Exam</h5>
                  <ul className="space-y-1">
                    {topic.mustKnow.map((item, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                        <span className="text-red-500 mt-1">★</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <Button size="sm" variant="outline" className="text-orange-600 border-orange-200 bg-transparent">
                    {topic.completed ? "Review Topic" : "Start Studying"}
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

      {/* Study Strategy */}
      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
        <h4 className="font-medium text-orange-800 mb-2">Brahmaastra Strategy</h4>
        <ul className="text-sm text-orange-700 space-y-1">
          <li>• Study topics in order of impact score</li>
          <li>• Focus on "Must Know" items first</li>
          <li>• Skip detailed theory, memorize key points</li>
          <li>• Practice 2-3 questions per topic immediately</li>
        </ul>
      </div>
    </div>
  )
}
