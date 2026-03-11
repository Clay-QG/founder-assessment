"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { assessment, brand } from "../diagnostic-data"
import { useDiagnostic } from "../diagnostic-provider"

const shared = {
  container: {
    width: "100%",
    maxWidth: 680,
    padding: "28px",
    borderRadius: 18,
    background: "#6A6C6D",
    border: "1px solid rgba(255,255,255,0.18)",
    boxShadow: "0 30px 60px rgba(0,0,0,0.28), 0 0 80px rgba(189,186,180,0.06)",
  } as const,
  main: {
    minHeight: "100vh",
    background: "#5F6061",
    color: brand.white,
    display: "grid",
    placeItems: "center",
    padding: "2.5rem 1rem",
  } as const,
}

export default function AssessmentPage() {
  const router = useRouter()
  const { founderInfo, step, setStep, setScore, complete, setComplete } = useDiagnostic()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const [visibility, setVisibility] = useState(0)
  const [flow, setFlow] = useState(0)
  const [friction, setFriction] = useState(0)
  const [automation, setAutomation] = useState(0)

  const totalQuestions = assessment.length
  const progress = complete ? 100 : Math.round(((step + 1) / totalQuestions) * 100)

  useEffect(() => {
    if (!founderInfo) {
      router.replace("/founder-info")
    }
  }, [founderInfo, router])

  function answer(value: number, category: string) {
    setScore((prev) => prev + value)

      if (category === "visibility") {
      setVisibility((prev) => prev + value)
      }

      if (category === "flow") {
      setFlow((prev) => prev + value)
      }

      if (category === "friction") { 
      setFriction((prev) => prev + value)
      }

      if (category === "automation") {
      setAutomation((prev) => prev + value)
      }
  
      if (step + 1 < assessment.length) {
      setSelectedIndex(null)
      setHoveredIndex(null)
      setStep((prev) => prev + 1)
      return
    }

      const finalVisibility = visibility
      const finalFlow = flow
      const finalFriction = friction
      const finalAutomation = automation

      setComplete(true)

      router.push(
        `/results?visibility=${finalVisibility}&flow=${finalFlow}&friction=${finalFriction}&automation=${finalAutomation}`
    )
    } 

  function selectAnswer(index: number, value: number) {
    if (selectedIndex !== null) {
      return
    }
    setSelectedIndex(index)
    window.setTimeout(() => {
      answer(value, assessment[step].category)
    }, 250)
  }

  if (!founderInfo) {
    return null
  }

  return (
    <main style={shared.main}>
      <section style={{ ...shared.container, position: "relative" }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "140%",
            height: "170%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 35%, rgba(255,255,255,0) 65%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "48px",
            right: "28px",
            width: 56,
            height: 34,
            backgroundColor: "#BDBAB4",
            WebkitMask: 'url("/domino-graphic.svg") no-repeat center / contain',
            mask: 'url("/domino-graphic.svg") no-repeat center / contain',
            zIndex: 2,
            opacity: 0.75,
          }}
        />
        <header style={{ marginBottom: "1.2rem", textAlign: "center", position: "relative", zIndex: 1 }}>
          <p
            style={{
              margin: "0 0 18px",
              color: "#BDBAB4",
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              lineHeight: 1,
              opacity: 0.85,
            }}
          >
            quiet ground
          </p>
          <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)", fontWeight: 600, lineHeight: 1.15 }}>
            Operational Intelligence Assessment
          </h1>
        </header>

        <p style={{ marginTop: 0, color: "#B8CBD4", lineHeight: 1.7, position: "relative", zIndex: 1 }}>
          Question {step + 1} of {totalQuestions}
        </p>

        <div
          style={{
            width: "100%",
            height: 8,
            background: "#FFFFFF",
            borderRadius: 999,
            overflow: "hidden",
            marginTop: "1rem",
            marginBottom: "1.4rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "#BDBAB4",
              transition: "width 160ms ease-out",
            }}
          />
        </div>

        <p
          style={{
            margin: 0,
            minHeight: 86,
            fontSize: "1.22rem",
            lineHeight: 1.62,
            position: "relative",
            zIndex: 1,
          }}
        >
          {assessment[step].prompt}
        </p>

        <div
          style={{
            marginTop: "1.2rem",
            display: "grid",
            gap: 8,
            position: "relative",
            zIndex: 1,
          }}
        >
          {assessment[step].options.map((option, index) => (
            <button
              key={option.label}
              onClick={() => selectAnswer(index, option.score)}
              className={`assessment-option${selectedIndex === index ? " is-selected" : ""}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              style={{
                background:
                  selectedIndex === index || hoveredIndex === index ? "#BDBAB4" : "#F4F5F6",
                border: "none",
                color: selectedIndex === index || hoveredIndex === index ? "#000000" : "#2F2F2F",
                borderRadius: 12,
                padding: "12px 18px",
                height: 56,
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                fontWeight: 500,
                textAlign: "left",
                lineHeight: 1.45,
                transition: "background-color 150ms ease, border-color 150ms ease, color 150ms ease",
              }}
            >
              {option.label}
            </button>
          ))}
        </div>

        <p
          style={{
            marginTop: "1.25rem",
            marginBottom: 0,
            color: "#B8CBD4",
            fontSize: "0.95rem",
            lineHeight: 1.6,
            position: "relative",
            zIndex: 1,
          }}
        >
          Answer based on your current operating reality, not your intended process.
        </p>
      </section>
    </main>
  )
}

