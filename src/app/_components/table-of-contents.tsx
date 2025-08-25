"use client"

import { useEffect, useState, useRef } from "react"
import { List, ChevronRight } from "lucide-react"

interface TocItem {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const retryCountRef = useRef(0)
  const maxRetries = 10

  const generateTocItems = () => {
    // Try multiple selectors to find headings
    const selectors = [
      ".markdown h1, .markdown h2, .markdown h3, .markdown h4, .markdown h5, .markdown h6",
      "article h1, article h2, article h3, article h4, article h5, article h6",
      "main h1, main h2, main h3, main h4, main h5, main h6",
      "h1, h2, h3, h4, h5, h6",
    ]

    let headings: NodeListOf<Element> | null = null

    for (const selector of selectors) {
      headings = document.querySelectorAll(selector)
      if (headings.length > 0) {
        console.log(`Found ${headings.length} headings with selector: ${selector}`)
        break
      }
    }

    if (!headings || headings.length === 0) {
      console.log("No headings found, retrying...")
      return []
    }

    const items: TocItem[] = []

    headings.forEach((heading, index) => {
      const level = Number.parseInt(heading.tagName.charAt(1))
      const text = heading.textContent?.trim() || ""

      // Skip if no text content
      if (!text) return

      // Generate a clean ID from the text
      let id = heading.id
      if (!id) {
        id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "") // Remove special characters
          .replace(/\s+/g, "-") // Replace spaces with hyphens
          .replace(/-+/g, "-") // Replace multiple hyphens with single
          .trim()

        // Ensure uniqueness
        let finalId = id
        let counter = 1
        while (document.getElementById(finalId)) {
          finalId = `${id}-${counter}`
          counter++
        }

        heading.id = finalId
        id = finalId
      }

      items.push({ id, text, level })
    })

    console.log("Generated TOC items:", items)
    return items
  }

  const tryGenerateToc = () => {
    const items = generateTocItems()

    if (items.length > 0) {
      setTocItems(items)
      setIsLoading(false)
      if (!activeId && items.length > 0) {
        setActiveId(items[0].id)
      }
      retryCountRef.current = 0
      return true
    }

    return false
  }

  useEffect(() => {
    // Initial attempt
    if (tryGenerateToc()) {
      return
    }

    // Retry mechanism
    const retryInterval = setInterval(() => {
      retryCountRef.current++

      if (retryCountRef.current >= maxRetries) {
        console.log("Max retries reached, stopping...")
        setIsLoading(false)
        clearInterval(retryInterval)
        return
      }

      console.log(`Retry attempt ${retryCountRef.current}/${maxRetries}`)

      if (tryGenerateToc()) {
        clearInterval(retryInterval)
      }
    }, 200)

    return () => {
      clearInterval(retryInterval)
    }
  }, [activeId])

  // Set up intersection observer
  useEffect(() => {
    if (tocItems.length === 0) return

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the most visible entry
        let mostVisible = entries[0]
        let maxRatio = 0

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            mostVisible = entry
          }
        })

        if (mostVisible && mostVisible.isIntersecting) {
          setActiveId(mostVisible.target.id)
        }
      },
      {
        rootMargin: "-10% 0% -50% 0%",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    )

    // Observe all headings
    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observerRef.current?.observe(element)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [tocItems])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 120
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  if (isLoading) {
    return (
      <nav
        className="border rounded-2xl p-6"
        style={{
          backgroundColor: "rgba(30, 30, 30, 0.6)",
          borderColor: "#595350",
        }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#4772b2" }}>
            <List className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">Contents</h3>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-600 rounded animate-pulse" style={{ width: "80%" }} />
          <div className="h-4 bg-gray-600 rounded animate-pulse" style={{ width: "60%" }} />
          <div className="h-4 bg-gray-600 rounded animate-pulse" style={{ width: "70%" }} />
          <div className="h-4 bg-gray-600 rounded animate-pulse" style={{ width: "50%" }} />
        </div>
      </nav>
    )
  }

  if (tocItems.length === 0) {
    return (
      <nav
        className="border rounded-2xl p-6"
        style={{
          backgroundColor: "rgba(30, 30, 30, 0.6)",
          borderColor: "#595350",
        }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#4772b2" }}>
            <List className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">Contents</h3>
        </div>
        <div className="text-sm" style={{ color: "#858c8c" }}>
          Nenhum heading encontrado nesta página.
        </div>
      </nav>
    )
  }

  return (
    <nav
      className="border rounded-2xl p-6"
      style={{
        backgroundColor: "rgba(30, 30, 30, 0.6)",
        borderColor: "#595350",
      }}
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#4772b2" }}>
          <List className="h-4 w-4 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white">Contents</h3>
      </div>

      {/* Table of Contents */}
      <div className="space-y-1">
        {tocItems.map(({ id, text, level }) => {
          const isActive = activeId === id
          const paddingLeft = Math.max(0, (level - 1) * 16)

          return (
            <div key={id} className="relative">
              {/* Active indicator line */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300 ${
                  isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                }`}
                style={{
                  backgroundColor: "#4772b2",
                  transformOrigin: "center",
                }}
              />

              <button
                type="button"
                onClick={() => scrollToHeading(id)}
                className={`w-full text-left py-2 px-3 rounded-lg transition-all duration-300 hover:bg-opacity-50 group ${
                  isActive ? "text-white" : ""
                }`}
                style={{
                  paddingLeft: paddingLeft + 12,
                  color: isActive ? "#4772b2" : "#bfbbb5",
                  backgroundColor: isActive ? "rgba(71, 114, 178, 0.1)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "rgba(89, 83, 80, 0.2)"
                    e.currentTarget.style.color = "#eaeaea"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent"
                    e.currentTarget.style.color = "#bfbbb5"
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  {level > 2 && (
                    <ChevronRight
                      className={`h-3 w-3 transition-all duration-200 ${isActive ? "opacity-100" : "opacity-50 group-hover:opacity-75"}`}
                      style={{ color: isActive ? "#4772b2" : "#858c8c" }}
                    />
                  )}
                  <span
                    className={`text-sm transition-all duration-200 ${
                      level === 1
                        ? "font-semibold"
                        : level === 2
                          ? "font-medium"
                          : level === 3
                            ? "font-normal"
                            : "font-light"
                    }`}
                  >
                    {text}
                  </span>
                </div>
              </button>
            </div>
          )
        })}
      </div>

      {/* Progress indicator */}
      <div className="mt-6 pt-4 border-t" style={{ borderColor: "#595350" }}>
        <div className="flex items-center justify-between text-xs" style={{ color: "#858c8c" }}>
          <span>Progresso</span>
          <span>
            {tocItems.length > 0
              ? Math.round(((tocItems.findIndex((item) => item.id === activeId) + 1) / tocItems.length) * 100)
              : 0}
            %
          </span>
        </div>
        <div className="w-full h-1 rounded-full mt-2" style={{ backgroundColor: "#595350" }}>
          <div
            className="h-1 rounded-full transition-all duration-500"
            style={{
              backgroundColor: "#4772b2",
              width: `${
                tocItems.length > 0
                  ? ((tocItems.findIndex((item) => item.id === activeId) + 1) / tocItems.length) * 100
                  : 0
              }%`,
            }}
          />
        </div>
      </div>

      {/* Debug info in development */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-4 pt-4 border-t text-xs" style={{ borderColor: "#595350", color: "#858c8c" }}>
          <div>Items encontrados: {tocItems.length}</div>
          <div>Tentativas: {retryCountRef.current}</div>
          <div>Ativo: {activeId}</div>
        </div>
      )}
    </nav>
  )
}
