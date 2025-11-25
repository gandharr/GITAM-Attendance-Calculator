import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, BookOpen, GraduationCap, Users, CheckCircle, AlertTriangle, Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-teal-950">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-teal-100 dark:border-teal-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-teal-400 dark:bg-teal-300 rounded-full blur-md opacity-30 animate-pulse"></div>
                <Image
                  src="/gitam-logo.png"
                  alt="GITAM University Logo"
                  width={120}
                  height={120}
                  className="object-contain relative z-10 brightness-85 contrast-110"
                />
              </div>
            </div>
            <nav className="flex items-center space-x-3">
              <ThemeToggle />
              <div className="group relative">
                <a href="https://login.gitam.edu/Login.aspx" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-teal-200 dark:border-teal-700 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 bg-transparent hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all duration-300"
                  >
                    Login
                  </Button>
                </a>
                <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
                  Login with GITAM Web
                  <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
                </div>
              </div>
              <Link href="/simple-calculator">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-teal-200 dark:border-teal-700 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 bg-transparent hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all duration-300"
                >
                  Simple Calculator
                </Button>
              </Link>
              <Link href="/advanced-calculator">
                <Button
                  size="sm"
                  className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transition-all duration-300"
                >
                  Advanced Calculator
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-400/10 dark:bg-teal-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-teal-100 to-emerald-100 dark:from-teal-900/50 dark:to-emerald-900/50 text-teal-800 dark:text-teal-200 mb-6 border border-teal-200/50 dark:border-teal-700/50 shadow-[0_0_20px_rgba(20,184,166,0.2)] dark:shadow-[0_0_20px_rgba(20,184,166,0.1)]">
              <GraduationCap className="w-4 h-4 mr-2" />
              Built for GITAM Students
              <Sparkles className="w-4 h-4 ml-2 text-teal-500" />
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Track Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">
              Attendance
            </span>
            <br />
            Stay{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
              Compliant
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
            Effortlessly monitor your attendance with our comprehensive calculator designed specifically for GITAM
            University students. Maintain the required 75% attendance with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/simple-calculator">
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 dark:from-teal-500 dark:to-emerald-500 dark:hover:from-teal-600 dark:hover:to-emerald-600 text-white px-8 py-4 text-lg shadow-[0_0_30px_rgba(20,184,166,0.4)] hover:shadow-[0_0_40px_rgba(20,184,166,0.6)] transition-all duration-300 border border-teal-400/30"
              >
                <Calculator className="mr-3 h-5 w-5" />
                Quick Calculator
              </Button>
            </Link>
            <Link href="/advanced-calculator">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-emerald-500 dark:border-emerald-400 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-8 py-4 text-lg bg-transparent hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300"
              >
                <BookOpen className="mr-3 h-5 w-5" />
                Subject-wise Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Our Calculator?</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Designed with GITAM students in mind, our calculator provides accurate and reliable attendance tracking.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl dark:shadow-teal-500/10 dark:hover:shadow-teal-500/20 transition-all duration-300 bg-gradient-to-br from-teal-50 to-white dark:from-gray-800 dark:to-gray-900 hover:shadow-[0_0_30px_rgba(20,184,166,0.2)] group">
              <CardHeader className="pb-4 p-6">
                <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all duration-300 border border-teal-200/50 dark:border-teal-700/50">
                  <Calculator className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                </div>
                <CardTitle className="text-xl text-gray-900 dark:text-white m-0">Simple & Intuitive</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed mb-0">
                  Calculate your overall attendance percentage instantly. Clean interface with smart input validation
                  for accurate results every time.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl dark:shadow-emerald-500/10 dark:hover:shadow-emerald-500/20 transition-all duration-300 bg-gradient-to-br from-emerald-50 to-white dark:from-gray-800 dark:to-gray-900 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] group">
              <CardHeader className="pb-4 p-6">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300 border border-emerald-200/50 dark:border-emerald-700/50">
                  <BookOpen className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="text-xl text-gray-900 dark:text-white m-0">Subject-wise Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed mb-0">
                  Track attendance for individual subjects with detailed breakdowns. Add unlimited subjects and get
                  comprehensive insights into your academic performance.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl dark:shadow-teal-500/10 dark:hover:shadow-teal-500/20 transition-all duration-300 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 hover:shadow-[0_0_30px_rgba(20,184,166,0.2)] group">
              <CardHeader className="pb-4 p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-100 to-emerald-100 dark:from-teal-900/50 dark:to-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all duration-300 border border-teal-200/50 dark:border-teal-700/50">
                  <CheckCircle className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                </div>
                <CardTitle className="text-xl text-gray-900 dark:text-white m-0">GITAM Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed mb-0">
                  Built specifically for GITAM's 75% attendance requirement. Color-coded feedback helps you stay
                  compliant with university standards.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Attendance Policy Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-gray-950 dark:to-teal-950/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">GITAM Attendance Policy</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Understanding the requirements for academic success
            </p>
          </div>
          <Card className="border-0 shadow-xl dark:shadow-teal-500/20 bg-white dark:bg-gray-900 hover:shadow-[0_0_40px_rgba(20,184,166,0.2)] transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-500 dark:to-emerald-500 text-white rounded-t-lg p-6">
              <CardTitle className="text-2xl flex items-center m-0">
                <GraduationCap className="mr-3 h-6 w-6" />
                Essential Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-teal-600 dark:text-teal-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Minimum Requirement</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Students must maintain a minimum of{" "}
                        <strong className="text-teal-700 dark:text-teal-400">Overall 75%</strong> attendance to be
                        eligible for semester examinations.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Consequences</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Students with less than 75% attendance will not be allowed to appear for Mid-Term and Semester
                        examinations.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Medical Leave</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Medical leave with proper documentation may be considered for attendance calculation as per
                        university guidelines.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <BookOpen className="h-6 w-6 text-teal-600 dark:text-teal-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Regular Monitoring</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Students are advised to regularly monitor their attendance and take necessary actions to
                        maintain the required percentage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 border-t border-teal-800/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="relative">
                <div className="absolute inset-0 bg-teal-400 rounded-full blur-sm opacity-20 animate-pulse"></div>
                <Image
                  src="/gitam-logo.png"
                  alt="GITAM University Logo"
                  width={120}
                  height={120}
                  className="object-contain opacity-80 relative z-10"
                />
              </div>
              <div>
                <p className="text-lg font-semibold">GITAM Attendance Calculator</p>
                <p className="text-gray-400 text-sm">Built by Gandhar Dhore</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">© 2025 All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
