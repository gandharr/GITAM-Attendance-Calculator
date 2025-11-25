"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Calculator, CheckCircle, AlertCircle, Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SimpleCalculatorPage() {
  const [classesAttended, setClassesAttended] = useState("")
  const [classesAbsent, setClassesAbsent] = useState("")
  const [totalClasses, setTotalClasses] = useState("")
  const [result, setResult] = useState<{
    percentage: number
    status: "good" | "warning" | "danger"
    message: string
  } | null>(null)
  const [error, setError] = useState("")

  const calculateAttendance = () => {
    setError("")
    setResult(null)

    // Validate inputs
    const attended = Number.parseInt(classesAttended)
    const absent = classesAbsent ? Number.parseInt(classesAbsent) : 0
    const total = totalClasses ? Number.parseInt(totalClasses) : 0

    if (isNaN(attended) || attended < 0) {
      setError("Please enter a valid number for classes attended")
      return
    }

    if (classesAbsent && (isNaN(absent) || absent < 0)) {
      setError("Please enter a valid number for classes absent")
      return
    }

    if (totalClasses && (isNaN(total) || total < 0)) {
      setError("Please enter a valid number for total classes")
      return
    }

    let calculatedTotal: number
    const calculatedAttended = attended

    // Calculate total classes based on available inputs
    if (totalClasses) {
      calculatedTotal = total
      if (attended > total) {
        setError("Classes attended cannot be more than total classes")
        return
      }
    } else if (classesAbsent) {
      calculatedTotal = attended + absent
    } else {
      setError("Please provide either 'Classes Absent' or 'Total Classes'")
      return
    }

    if (calculatedTotal === 0) {
      setError("Total classes cannot be zero")
      return
    }

    const percentage = (calculatedAttended / calculatedTotal) * 100

    let status: "good" | "warning" | "danger"
    let message: string

    if (percentage >= 75) {
      status = "good"
      message = "Great! You meet the minimum attendance requirement."
    } else if (percentage >= 70) {
      status = "warning"
      message = "Warning! You're close to the minimum requirement. Attend more classes."
    } else {
      status = "danger"
      message = "Alert! You're below the minimum 75% requirement. Take immediate action."
    }

    setResult({
      percentage: Math.round(percentage * 100) / 100,
      status,
      message,
    })
  }

  const resetForm = () => {
    setClassesAttended("")
    setClassesAbsent("")
    setTotalClasses("")
    setResult(null)
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
                  <div className="absolute inset-0 bg-teal-400 dark:bg-teal-300 rounded-full blur-sm opacity-30 animate-pulse"></div>
                  <Calculator className="h-6 w-6 text-teal-600 dark:text-teal-400 relative z-10" />
                </div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Simple Calculator</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-400/10 dark:bg-teal-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-teal-100 to-emerald-100 dark:from-teal-900/50 dark:to-emerald-900/50 text-teal-800 dark:text-teal-200 mb-6 border border-teal-200/50 dark:border-teal-700/50 shadow-[0_0_20px_rgba(20,184,166,0.2)] dark:shadow-[0_0_20px_rgba(20,184,166,0.1)]">
              <Calculator className="w-4 h-4 mr-2" />
              Quick & Easy
              <Sparkles className="w-4 h-4 ml-2 text-teal-500" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">
                Attendance
              </span>{" "}
              Calculator
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Calculate your attendance percentage quickly and easily. Fill in the required fields below.
            </p>
          </div>

          <Card className="border-0 shadow-xl dark:shadow-teal-500/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md hover:shadow-[0_0_40px_rgba(20,184,166,0.2)] transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-teal-600/10 to-emerald-600/10 dark:from-teal-500/20 dark:to-emerald-500/20 rounded-t-lg border-b border-teal-100 dark:border-teal-800">
              <CardTitle className="text-xl text-gray-900 dark:text-white">Enter Your Attendance Details</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Provide either "Classes Absent" or "Total Classes" along with classes attended.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="space-y-6">
                <div className="group">
                  <Label htmlFor="attended" className="text-sm font-medium text-gray-900 dark:text-white">
                    Classes Attended <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="attended"
                    type="number"
                    placeholder="Enter number of classes attended"
                    value={classesAttended}
                    onChange={(e) => setClassesAttended(e.target.value)}
                    min="0"
                    className="mt-2 border-teal-200 dark:border-teal-700 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-teal-500/20 dark:focus:ring-teal-400/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(20,184,166,0.1)] transition-all duration-300"
                  />
                </div>

                <div className="group">
                  <Label htmlFor="absent" className="text-sm font-medium text-gray-900 dark:text-white">
                    Classes Absent <span className="text-gray-400">(Optional)</span>
                  </Label>
                  <Input
                    id="absent"
                    type="number"
                    placeholder="Enter number of classes absent"
                    value={classesAbsent}
                    onChange={(e) => setClassesAbsent(e.target.value)}
                    min="0"
                    className="mt-2 border-teal-200 dark:border-teal-700 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-teal-500/20 dark:focus:ring-teal-400/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(20,184,166,0.1)] transition-all duration-300"
                  />
                </div>

                <div className="group">
                  <Label htmlFor="total" className="text-sm font-medium text-gray-900 dark:text-white">
                    Total Classes <span className="text-gray-400">(Optional)</span>
                  </Label>
                  <Input
                    id="total"
                    type="number"
                    placeholder="Enter total number of classes"
                    value={totalClasses}
                    onChange={(e) => setTotalClasses(e.target.value)}
                    min="0"
                    className="mt-2 border-teal-200 dark:border-teal-700 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-teal-500/20 dark:focus:ring-teal-400/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(20,184,166,0.1)] transition-all duration-300"
                  />
                </div>
              </div>

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
                  onClick={calculateAttendance}
                  className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 dark:from-teal-500 dark:to-emerald-500 dark:hover:from-teal-600 dark:hover:to-emerald-600 text-white shadow-[0_0_25px_rgba(20,184,166,0.4)] hover:shadow-[0_0_35px_rgba(20,184,166,0.6)] transition-all duration-300 border border-teal-400/30"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Attendance
                </Button>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="border-teal-200 dark:border-teal-700 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:shadow-[0_0_15px_rgba(20,184,166,0.2)] transition-all duration-300 bg-transparent"
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <Card className="mt-8 border-0 shadow-xl dark:shadow-teal-500/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md hover:shadow-[0_0_40px_rgba(20,184,166,0.2)] transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-teal-600/10 to-emerald-600/10 dark:from-teal-500/20 dark:to-emerald-500/20 rounded-t-lg border-b border-teal-100 dark:border-teal-800">
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-400 rounded-full blur-sm opacity-30 animate-pulse"></div>
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 relative z-10" />
                  </div>
                  Attendance Result
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-emerald-400/20 rounded-full blur-2xl"></div>
                    <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 relative z-10">
                      {result.percentage}%
                    </div>
                  </div>

                  <Alert
                    variant={result.status === "danger" ? "destructive" : "default"}
                    className={`border-0 shadow-lg backdrop-blur-sm ${
                      result.status === "good"
                        ? "bg-green-50/80 dark:bg-green-900/20 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                        : result.status === "warning"
                          ? "bg-yellow-50/80 dark:bg-yellow-900/20 shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                          : "bg-red-50/80 dark:bg-red-900/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                    }`}
                  >
                    <AlertDescription
                      className={`font-medium ${
                        result.status === "good"
                          ? "text-green-800 dark:text-green-200"
                          : result.status === "warning"
                            ? "text-yellow-800 dark:text-yellow-200"
                            : "text-red-800 dark:text-red-200"
                      }`}
                    >
                      {result.message}
                    </AlertDescription>
                  </Alert>

                  <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2 bg-teal-50/50 dark:bg-teal-900/20 p-4 rounded-lg border border-teal-200/50 dark:border-teal-700/50">
                    <p>
                      <strong>Classes Attended:</strong> {classesAttended}
                    </p>
                    {classesAbsent && (
                      <p>
                        <strong>Classes Absent:</strong> {classesAbsent}
                      </p>
                    )}
                    {totalClasses && (
                      <p>
                        <strong>Total Classes:</strong> {totalClasses}
                      </p>
                    )}
                    {!totalClasses && classesAbsent && (
                      <p>
                        <strong>Total Classes:</strong>{" "}
                        {Number.parseInt(classesAttended) + Number.parseInt(classesAbsent)}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">Need more detailed tracking?</p>
            <Link href="/advanced-calculator">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-emerald-500 dark:border-emerald-400 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 bg-transparent hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all duration-300 px-8 py-4"
              >
                Try Advanced Calculator
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
