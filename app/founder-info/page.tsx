"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { brand } from "../diagnostic-data"
import { useDiagnostic, type FounderInfo } from "../diagnostic-provider"

const shared = {
  container: {
    width: "100%",
    maxWidth: 560,
    padding: "2rem 1.5rem",
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
  field: {
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 10,
    padding: "0.72rem 0.85rem",
    marginBottom: "16px",
    background: "#F5F6F7",
    color: brand.deepCharcoal,
  } as const,
}

const initialForm: FounderInfo = {
  firstName: "",
  lastName: "",
  role: "",
  email: "",
  company: "",
  companySize: "",
  industry: "",
}

export default function FounderInfoPage() {
  const router = useRouter()
  const { setFounderInfo, resetAssessment } = useDiagnostic()
  const [formDraft, setFormDraft] = useState<FounderInfo>(initialForm)

  function beginAssessment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFounderInfo(formDraft)
    resetAssessment()
    router.push("/assessment")
  }

  return (
    <main style={shared.main}>
      <section style={shared.container}>
        <header style={{ marginBottom: "1.3rem", textAlign: "center" }}>
          <p
            style={{
              margin: "0 0 22px",
              color: "#BDBAB4",
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              lineHeight: 1,
              opacity: 0.85,
              textAlign: "left",
            }}
          >
            quiet ground
          </p>
          <h1 style={{ margin: "0 0 24px", fontSize: "1.9rem", fontWeight: 600, lineHeight: 1.3, textAlign: "left" }}>
            A few quick details about you
          </h1>
        </header>

        <form onSubmit={beginAssessment} style={{ display: "grid" }}>
          <input
            type="text"
            placeholder="First Name"
            className="founder-field"
            value={formDraft.firstName}
            onChange={(event) => setFormDraft((prev) => ({ ...prev, firstName: event.target.value }))}
            required
            style={shared.field}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="founder-field"
            value={formDraft.lastName}
            onChange={(event) => setFormDraft((prev) => ({ ...prev, lastName: event.target.value }))}
            required
            style={shared.field}
          />
          <select
            className="founder-field"
            value={formDraft.role}
            onChange={(event) => setFormDraft((prev) => ({ ...prev, role: event.target.value }))}
            required
            style={shared.field}
          >
            <option value="">Role</option>
            <option value="Founder">Founder</option>
            <option value="Co-Founder">Co-Founder</option>
            <option value="CEO">CEO</option>
            <option value="President">President</option>
            <option value="COO">COO</option>
            <option value="Head of Operations">Head of Operations</option>
            <option value="Department Leader">Department Leader</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="email"
            placeholder="Email"
            className="founder-field"
            value={formDraft.email}
            onChange={(event) => setFormDraft((prev) => ({ ...prev, email: event.target.value }))}
            required
            style={shared.field}
          />
          <input
            type="text"
            placeholder="Company"
            className="founder-field"
            value={formDraft.company}
            onChange={(event) => setFormDraft((prev) => ({ ...prev, company: event.target.value }))}
            required
            style={shared.field}
          />
          <select
            className="founder-field"
            value={formDraft.companySize}
            onChange={(event) => setFormDraft((prev) => ({ ...prev, companySize: event.target.value }))}
            required
            style={shared.field}
          >
            <option value="">Company Size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-25">11-25 employees</option>
            <option value="26-50">26-50 employees</option>
            <option value="51-75">51-75 employees</option>
            <option value="76-150">76-150 employees</option>
            <option value="151+">151+ employees</option>
          </select>
          <select
            className="founder-field"
            value={formDraft.industry}
            onChange={(event) => setFormDraft((prev) => ({ ...prev, industry: event.target.value }))}
            required
            style={shared.field}
          >
            <option value="">Industry</option>
            <option value="Professional Services">Professional Services</option>
            <option value="Technology / Software">Technology / Software</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Construction">Construction</option>
            <option value="Retail / Ecommerce">Retail / Ecommerce</option>
            <option value="Finance / Accounting">Finance / Accounting</option>
            <option value="Hospitality">Hospitality</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Other">Other</option>
          </select>

          <button
            type="submit"
            className="cta-button"
            style={{
              border: "1px solid rgba(255,255,255,0.35)",
              color: brand.white,
              borderRadius: 10,
              padding: "0.75rem 1.05rem",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Continue
          </button>
        </form>
      </section>
    </main>
  )
}
