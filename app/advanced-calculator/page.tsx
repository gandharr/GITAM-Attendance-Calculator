"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Calculator, CheckCircle, AlertCircle, Plus, Trash2, BookOpen, Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface Subject {
  id: string
  name: string
  attended: string
  absent: string
  total: string
}

interface SubjectResult {
  name: string
  attended: number
  total: number
  percentage: number
  status: "good" | "warning" | "danger"
}

export default function AdvancedCalculatorPage() {
  const [subjects, setSubjects] = useState<Subject[]>([{ id: "1", name: "", attended: "", absent: "", total: "" }])
  const [results, setResults] = useState<{
    subjects: SubjectResult[]
    overall: {
      percentage: number
      status: "good" | "warning" | "danger"
      message: string
      totalAttended: number
      totalClasses: number
    }
  } | null>(null)
  const [error, setError] = useState("")

  const addSubject = () => {
    const newSubject: Subject = {
      id: Date.now().toString(),
      name: "",
      attended: "",
      absent: "",
      total: "",
    }
    setSubjects([...subjects, newSubject])
  }

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((subject) => subject.id !== id))
    }
  }

  const updateSubject = (id: string, field: keyof Subject, value: string) => {
    setSubjects(subjects.map((subject) => (subject.id === id ? { ...subject, [field]: value } : subject)))
  }

  const getSubjectStatus = (percentage: number): "good" | "warning" | "danger" => {
    if (percentage >= 75) return "good"
    if (percentage >= 70) return "warning"
    return "danger"
  }

  const calculateAdvancedAttendance = () => {
    setError("")
    setResults(null)

    const subjectResults: SubjectResult[] = []
    let totalAttendedAcrossSubjects = 0
    let totalClassesAcrossSubjects = 0

    for (const subject of subjects) {
      if (!subject.name.trim()) {
        setError("Please enter a name for all subjects")
        return
      }

      const attended = Number.parseInt(subject.attended)
      const absent = subject.absent ? Number.parseInt(subject.absent) : 0
      const total = subject.total ? Number.parseInt(subject.total) : 0

      if (isNaN(attended) || attended < 0) {
        setError(`Please enter a valid number for classes attended in ${subject.name}`)
        return
      }

      if (subject.absent && (isNaN(absent) || absent < 0)) {
        setError(`Please enter a valid number for classes absent in ${subject.name}`)
        return
      }

      if (subject.total && (isNaN(total) || total < 0)) {
        setError(`Please enter a valid number for total classes in ${subject.name}`)
        return
      }

      let calculatedTotal: number

      // Calculate total classes based on available inputs
      if (subject.total) {
        calculatedTotal = total
        if (attended > total) {
          setError(`Classes attended cannot be more than total classes in ${subject.name}`)
          return
        }
      } else if (subject.absent) {
        calculatedTotal = attended + absent
      } else {
        setError(`Please provide either 'Classes Absent' or 'Total Classes' for ${subject.name}`)
        return
      }

      if (calculatedTotal === 0) {
        setError(`Total classes cannot be zero for ${subject.name}`)
        return
      }

      const percentage = (attended / calculatedTotal) * 100

      subjectResults.push({
        name: subject.name,
        attended,
        total: calculatedTotal,
        percentage: Math.round(percentage * 100) / 100,
        status: getSubjectStatus(percentage),
      })

      totalAttendedAcrossSubjects += attended
      totalClassesAcrossSubjects += calculatedTotal
    }

    const overallPercentage = (totalAttendedAcrossSubjects / totalClassesAcrossSubjects) * 100
    const overallStatus = getSubjectStatus(overallPercentage)

    let overallMessage: string
    if (overallStatus === "good") {
      overallMessage = "Excellent! Your overall attendance meets the requirement."
    } else if (overallStatus === "warning") {
      overallMessage =
        "Warning! Your overall attendance is close to the minimum. Focus on subjects with low attendance."
    } else {
      overallMessage =
        "Alert! Your overall attendance is below 75%. Immediate action required across multiple subjects."
    }

    setResults({
      subjects: subjectResults,
      overall: {
        percentage: Math.round(overallPercentage * 100) / 100,
        status: overallStatus,
        message: overallMessage,
        totalAttended: totalAttendedAcrossSubjects,
        totalClasses: totalClassesAcrossSubjects,
      },
    })
  }

  const resetForm = () => {
    setSubjects([{ id: "1", name: "", attended: "", absent: "", total: "" }])
    setResults(null)
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-teal-950">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-teal-100 dark:border-teal-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              <span className="text-teal-600 dark:text-teal-400 font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-400 dark:bg-emerald-300 rounded-full blur-sm opacity-30 animate-pulse"></div>
                  <BookOpen className="h-6 w-6 text-emerald-600 dark:text-emerald-400 relative z-10" />
                </div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white text-center">Advanced Calculator</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-400/10 dark:bg-emerald-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-400/10 dark:bg-teal-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 text-emerald-800 dark:text-emerald-200 mb-6 border border-emerald-200/50 dark:border-emerald-700/50 shadow-[0_0_20px_rgba(16,185,129,0.2)] dark:shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <BookOpen className="w-4 h-4 mr-2" />
              Subject-wise Analysis
              <Sparkles className="w-4 h-4 ml-2 text-emerald-500" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                Attendance
              </span>{" "}
              Calculator
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Track attendance for multiple subjects and get detailed insights into your overall academic performance.
            </p>
          </div>

          <Card className="border-0 shadow-xl dark:shadow-emerald-500/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-emerald-600/10 to-teal-600/10 dark:from-emerald-500/20 dark:to-teal-500/20 rounded-t-lg border-b border-emerald-100 dark:border-emerald-800 p-6">
              <div className="text-center">
                <CardTitle className="text-xl text-gray-900 dark:text-white m-0">
                  Subject-wise Attendance Details
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 mt-2 mb-0">
                  Add all your subjects and their attendance details. You can add as many subjects as needed.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              {subjects.map((subject, index) => (
                <div
                  key={subject.id}
                  className="p-6 border border-teal-200/50 dark:border-teal-700/50 rounded-lg bg-gradient-to-br from-teal-50/50 to-emerald-50/50 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(20,184,166,0.1)] transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex-1 text-center">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center justify-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="leading-none">Subject {index + 1}</span>
                      </h3>
                    </div>
                    {subjects.length > 1 && (
                      <Button
                        onClick={() => removeSubject(subject.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all duration-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label
                        htmlFor={`name-${subject.id}`}
                        className="text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Subject Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`name-${subject.id}`}
                        placeholder="e.g., Mathematics, Physics, Chemistry"
                        value={subject.name}
                        onChange={(e) => updateSubject(subject.id, "name", e.target.value)}
                        className="mt-2 border-teal-200 dark:border-teal-700 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-teal-500/20 dark:focus:ring-teal-400/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(20,184,166,0.1)] transition-all duration-300"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor={`attended-${subject.id}`}
                        className="text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Classes Attended <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`attended-${subject.id}`}
                        type="number"
                        placeholder="Enter classes attended"
                        value={subject.attended}
                        onChange={(e) => updateSubject(subject.id, "attended", e.target.value)}
                        min="0"
                        className="mt-2 border-teal-200 dark:border-teal-700 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-teal-500/20 dark:focus:ring-teal-400/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(20,184,166,0.1)] transition-all duration-300"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor={`absent-${subject.id}`}
                        className="text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Classes Absent <span className="text-gray-400">(Optional)</span>
                      </Label>
                      <Input
                        id={`absent-${subject.id}`}
                        type="number"
                        placeholder="Enter classes absent"
                        value={subject.absent}
                        onChange={(e) => updateSubject(subject.id, "absent", e.target.value)}
                        min="0"
                        className="mt-2 border-teal-200 dark:border-teal-700 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-teal-500/20 dark:focus:ring-teal-400/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(20,184,166,0.1)] transition-all duration-300"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label
                        htmlFor={`total-${subject.id}`}
                        className="text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Total Classes <span className="text-gray-400">(Optional)</span>
                      </Label>
                      <Input
                        id={`total-${subject.id}`}
                        type="number"
                        placeholder="Enter total classes"
                        value={subject.total}
                        onChange={(e) => updateSubject(subject.id, "total", e.target.value)}
                        min="0"
                        className="mt-2 border-teal-200 dark:border-teal-700 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-teal-500/20 dark:focus:ring-teal-400/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(20,184,166,0.1)] transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                onClick={addSubject}
                variant="outline"
                className="w-full border-dashed border-2 border-emerald-300 dark:border-emerald-700 hover:border-emerald-400 dark:hover:border-emerald-600 bg-transparent text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300 py-6"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Another Subject
              </Button>

              {error && (
                <Alert
                  variant="destructive"
                  className="border-red-200 dark:border-red-800 bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-4">
                <Button
                  onClick={calculateAdvancedAttendance}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-600 dark:hover:to-teal-600 text-white shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] transition-all duration-300 border border-emerald-400/30"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Overall Attendance
                </Button>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all duration-300 bg-transparent"
                >
                  Reset All
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {results && (
            <div className="mt-8 space-y-8">
              {/* Overall Results */}
              <Card className="border-0 shadow-xl dark:shadow-emerald-500/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-emerald-600/10 to-teal-600/10 dark:from-emerald-500/20 dark:to-teal-500/20 rounded-t-lg border-b border-emerald-100 dark:border-emerald-800 p-6">
                  <div className="text-center">
                    <CardTitle className="flex items-center justify-center gap-3 text-gray-900 dark:text-white m-0">
                      <div className="relative flex items-center justify-center w-6 h-6">
                        <div className="absolute inset-0 bg-green-400 rounded-full blur-sm opacity-30 animate-pulse"></div>
                        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 relative z-10" />
                      </div>
                      <span className="leading-none">Overall Attendance Result</span>
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-2xl"></div>
                      <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 relative z-10">
                        {results.overall.percentage}%
                      </div>
                    </div>

                    <Alert
                      variant={results.overall.status === "danger" ? "destructive" : "default"}
                      className={`border-0 shadow-lg backdrop-blur-sm ${
                        results.overall.status === "good"
                          ? "bg-green-50/80 dark:bg-green-900/20 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                          : results.overall.status === "warning"
                            ? "bg-yellow-50/80 dark:bg-yellow-900/20 shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                            : "bg-red-50/80 dark:bg-red-900/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                      }`}
                    >
                      <AlertDescription
                        className={`font-medium ${
                          results.overall.status === "good"
                            ? "text-green-800 dark:text-green-200"
                            : results.overall.status === "warning"
                              ? "text-yellow-800 dark:text-yellow-200"
                              : "text-red-800 dark:text-red-200"
                        }`}
                      >
                        {results.overall.message}
                      </AlertDescription>
                    </Alert>

                    <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2 bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200/50 dark:border-emerald-700/50">
                      <p>
                        <strong>Total Classes Attended:</strong> {results.overall.totalAttended}
                      </p>
                      <p>
                        <strong>Total Classes Across All Subjects:</strong> {results.overall.totalClasses}
                      </p>
                      <p>
                        <strong>Number of Subjects:</strong> {results.subjects.length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Subject-wise Results */}
              <Card className="border-0 shadow-xl dark:shadow-emerald-500/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-emerald-600/10 to-teal-600/10 dark:from-emerald-500/20 dark:to-teal-500/20 rounded-t-lg border-b border-emerald-100 dark:border-emerald-800 p-6">
                  <div className="text-center">
                    <CardTitle className="text-gray-900 dark:text-white text-xl m-0">Subject-wise Breakdown</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300 mt-2 mb-0">
                      Individual attendance percentage for each subject
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {results.subjects.map((subject, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-6 border border-teal-200/50 dark:border-teal-700/50 rounded-lg bg-gradient-to-r from-teal-50/30 to-emerald-50/30 dark:from-gray-800/30 dark:to-gray-900/30 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(20,184,166,0.1)] transition-all duration-300"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white text-lg">{subject.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {subject.attended}/{subject.total} classes attended
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">
                            {subject.percentage}%
                          </div>
                          <div
                            className={`text-xs px-3 py-1 rounded-full font-medium border ${
                              subject.status === "good"
                                ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700"
                                : subject.status === "warning"
                                  ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700"
                                  : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700"
                            }`}
                          >
                            {subject.status === "good" ? "Good" : subject.status === "warning" ? "Warning" : "Low"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">Need a simpler calculation?</p>
            <Link href="/simple-calculator">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-teal-500 dark:border-teal-400 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 bg-transparent hover:shadow-[0_0_25px_rgba(20,184,166,0.3)] transition-all duration-300 px-8 py-4"
              >
                Try Simple Calculator
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
