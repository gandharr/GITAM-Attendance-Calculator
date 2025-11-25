"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-9 px-0 hover:bg-teal-100 dark:hover:bg-teal-900/20">
        <Sun className="h-[1.2rem] w-[1.2rem] text-teal-600" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const isDark =
    theme === "dark" ||
    (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-9 px-0 hover:bg-teal-100 dark:hover:bg-teal-900/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)]"
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all duration-300 text-teal-600 ${isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"}`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 text-teal-400 ${isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
