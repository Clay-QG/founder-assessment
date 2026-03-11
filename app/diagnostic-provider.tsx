"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

export type FounderInfo = {
  firstName: string
  lastName: string
  role: string
  email: string
  company: string
  companySize: string
  industry: string
}

type DiagnosticContextValue = {
  founderInfo: FounderInfo | null
  setFounderInfo: (info: FounderInfo | null) => void
  step: number
  setStep: (value: number | ((prev: number) => number)) => void
  score: number
  setScore: (value: number | ((prev: number) => number)) => void

  visibility: number
  setVisibility: (value: number | ((prev: number) => number)) => void

  flow: number
  setFlow: (value: number | ((prev: number) => number)) => void

  friction: number
  setFriction: (value: number | ((prev: number) => number)) => void

  automation: number
  setAutomation: (value: number | ((prev: number) => number)) => void

  complete: boolean
  setComplete: (value: boolean) => void
  resetAssessment: () => void
}

const DiagnosticContext = createContext<DiagnosticContextValue | null>(null)

export function DiagnosticProvider({ children }: { children: ReactNode }) {
  const [founderInfo, setFounderInfo] = useState<FounderInfo | null>(null)
  const [step, setStep] = useState(0)
  const [score, setScore] = useState(0)
  const [visibility, setVisibility] = useState(0)
  const [flow, setFlow] = useState(0)
  const [friction, setFriction] = useState(0)
  const [automation, setAutomation] = useState(0)
  const [complete, setComplete] = useState(false)

  const value = useMemo<DiagnosticContextValue>(
    () => ({
      founderInfo,
      setFounderInfo,
      step,
      setStep,
      score,
      setScore,
      visibility,
      setVisibility,
      flow,
      setFlow,
      friction,
      setFriction,
      automation,
      setAutomation,
      complete,
      setComplete,
      resetAssessment: () => {
        setStep(0)
        setScore(0)
        setVisibility(0)
        setFlow(0)
        setFriction(0)
        setAutomation(0)
        setComplete(false)
      },
    }),
    [complete, founderInfo, score, step],
  )

  return <DiagnosticContext.Provider value={value}>{children}</DiagnosticContext.Provider>
}

export function useDiagnostic() {
  const context = useContext(DiagnosticContext)
  if (!context) {
    throw new Error("useDiagnostic must be used within DiagnosticProvider")
  }
  return context
}
