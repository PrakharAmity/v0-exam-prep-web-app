"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Clock, CheckCircle, XCircle, SkipForward } from "lucide-react"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  topic: string
  difficulty: "Easy" | "Medium" | "Hard"
}

export function QuestionPractice() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes per question

  const questions: Question[] = [
    {
      id: "1",
      question: "What is the time complexity of binary search in a sorted array?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      correctAnswer: 1,
      explanation:
        "Binary search divides the search space in half with each comparison, resulting in O(log n) time complexity.",
      topic: "Algorithms",
      difficulty: "Medium",
    },
    {
      id: "2",
      question: "Which data structure uses LIFO (Last In First Out) principle?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correctAnswer: 1,
      explanation: "Stack follows LIFO principle where the last element added is the first one to be removed.",
      topic: "Data Structures",
      difficulty: "Easy",
    },
  ]

  const handleAnswerSubmit = () => {
    if (selectedAnswer) {
      const answerIndex = Number.parseInt(selectedAnswer)
      setAnswers({ ...answers, [currentQuestion]: answerIndex })
      setShowResult(true)
    }
  }

  const handleNext = () => {
    setShowResult(false)
    setSelectedAnswer("")
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const currentQ = questions[currentQuestion]
  const isCorrect = showResult && answers[currentQuestion] === currentQ.correctAnswer

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <p className="text-gray-600">
            {currentQ.topic} • {currentQ.difficulty}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </span>
          </div>
          <Badge
            variant={
              currentQ.difficulty === "Hard"
                ? "destructive"
                : currentQ.difficulty === "Medium"
                  ? "default"
                  : "secondary"
            }
          >
            {currentQ.difficulty}
          </Badge>
        </div>
      </div>

      <Progress value={((currentQuestion + 1) / questions.length) * 100} />

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg leading-relaxed">{currentQ.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} disabled={showResult}>
            {currentQ.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                  showResult
                    ? index === currentQ.correctAnswer
                      ? "bg-green-50 border-green-200"
                      : answers[currentQuestion] === index && index !== currentQ.correctAnswer
                        ? "bg-red-50 border-red-200"
                        : "bg-gray-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
                {showResult && index === currentQ.correctAnswer && <CheckCircle className="h-5 w-5 text-green-600" />}
                {showResult && answers[currentQuestion] === index && index !== currentQ.correctAnswer && (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
            ))}
          </RadioGroup>

          {showResult && (
            <div
              className={`p-4 rounded-lg ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span className={`font-medium ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                  {isCorrect ? "Correct!" : "Incorrect"}
                </span>
              </div>
              <p className="text-sm text-gray-700">{currentQ.explanation}</p>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" disabled={currentQuestion === 0}>
              Previous
            </Button>
            <div className="flex gap-2">
              {!showResult ? (
                <>
                  <Button variant="outline" onClick={() => handleNext()}>
                    <SkipForward className="h-4 w-4 mr-2" />
                    Skip
                  </Button>
                  <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer}>
                    Submit Answer
                  </Button>
                </>
              ) : (
                <Button onClick={handleNext}>
                  {currentQuestion === questions.length - 1 ? "Finish" : "Next Question"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
