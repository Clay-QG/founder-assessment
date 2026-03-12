"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { brand } from "../diagnostic-data"
import { useDiagnostic } from "../diagnostic-provider"

const shared = {
  container: {
    width: "100%",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "48px 56px",
    boxSizing: "border-box",
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

function ResultsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const visibility = Number(searchParams.get("visibility") || 0)
  const flow = Number(searchParams.get("flow") || 0)
  const friction = Number(searchParams.get("friction") || 0)
  const automation = Number(searchParams.get("automation") || 0)

  const { founderInfo, score, complete } = useDiagnostic()

  useEffect(() => {
    if (!founderInfo || !complete) return

    console.log("SAVE EFFECT", founderInfo, complete, score)

    fetch("/api/save-assessment", {
      method: "POST",
      headers: {
       "Content-Type": "application/json",
      },
        body: JSON.stringify({
        name: `${founderInfo.firstName} ${founderInfo.lastName}`,
        email: founderInfo.email,
        company: founderInfo.company,
        companySize: founderInfo.companySize,
        industry: founderInfo.industry,
        role: founderInfo.role,

        visibility: visibility,
        flow: flow,
        friction: friction,
        automation: automation,

        score: score,
        stage: "Assessment Complete",
      }),
    })
 
  }, [founderInfo, complete, visibility, flow, friction, automation, score])

  const interpretation =
    score >= 24
      ? {
          title: "Operational Visibility: Strong",
          body: [
            "Operational information flows clearly across teams and systems. Leadership can quickly understand what is happening across the organization without relying heavily on meetings or manual updates.",
          ],
        }
      : score >= 16
        ? {
            title: "Operational Visibility: Emerging",
            body: [
              "Some systems and structure are in place, but leadership may still rely on meetings or manual updates to understand what is happening across the business. Teams may have partial clarity, but connecting the dots across the organization still requires effort.",
            ],
          }
        : {
            title: "Operational Visibility: Limited",
            body: [
              "Information is likely fragmented across teams or tools, creating decision friction and increasing leadership involvement in day-to-day operations. Leaders often rely on meetings, manual updates, or individual knowledge to understand what is happening across the business.",
            ],
          }
  const scaleRanges = [
    { label: "Limited (0–15)", active: score <= 15 },
    { label: "Emerging (16–24)", active: score >= 16 && score <= 24 },
    { label: "Strong (25–30)", active: score >= 25 },
  ]

  if (!founderInfo || !complete) {
    return null
  }

  return (
    <main style={shared.main} className="results-main">
      <style>{`
        .results-mobile-break {
          display: none;
        }

        .results-title-desktop {
          display: inline;
        }

        .results-title-mobile {
          display: none;
        }

        .results-title-line-top {
          white-space: nowrap;
        }

        .results-assessment-word {
          margin-left: 0.2em;
        }

        @media (max-width: 768px) {
          .results-main {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .results-card {
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .results-domino {
            display: none !important;
          }

          .results-mobile-break {
            display: block;
          }

          .results-title-desktop {
            display: none;
          }

          .results-title-mobile {
            display: inline;
          }

          .results-assessment-word {
            margin-left: 0;
          }
        }

        @media (max-width: 380px) {
          .results-title {
            font-size: 1.3rem !important;
            line-height: 1.12 !important;
          }
        }
      `}</style>
      <div
        style={{
          width: "100%",
          maxWidth: "100vw",
          paddingLeft: "16px",
          paddingRight: "16px",
          display: "flex",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        <section
          style={{ ...shared.container, position: "relative", width: "100%", boxSizing: "border-box" }}
          className="results-card"
        >
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
          className="results-domino"
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "48px",
            right: "1.5rem",
            width: 56,
            height: 34,
            backgroundColor: "#BDBAB4",
            WebkitMask: 'url("/domino-graphic.svg") no-repeat center / contain',
            mask: 'url("/domino-graphic.svg") no-repeat center / contain',
            zIndex: 2,
            opacity: 0.75,
          }}
        />
        <header style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
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
          <h1
            className="results-title"
            style={{
              margin: "0 auto 9px",
              fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              maxWidth: "100%",
              textAlign: "center",
              wordBreak: "break-word",
            }}
          >
            <>
              <span className="results-title-desktop">Operational Intelligence Assessment</span>
              <span className="results-title-mobile">
                <span className="results-title-line-top">Operational Intelligence</span>
                <br className="results-mobile-break" />
                <span className="results-assessment-word">Assessment</span>
              </span>
            </>
          </h1>

          <p
            style={{
              margin: "0 0 24px",
              color: brand.softEarth,
              lineHeight: 1.45,
              opacity: 0.85,
            }}
          >
            Final Score: <strong style={{ color: "#FFFFFF", opacity: 1, fontWeight: 700, fontSize: "18px" }}>{score}</strong>
          </p>

          <section
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 8,
              margin: "0 0 18px",
              marginTop: "36px",
              position: "relative",
            }}
            aria-label="Operational Visibility Scale"
          >
            {scaleRanges.map((range) => (
              <div
                key={range.label}
                style={{
                  borderRadius: 999,
                  padding: "6px 10px",
                  minWidth: 150,
                  textAlign: "center",
                  fontSize: "0.82rem",
                  lineHeight: 1.35,
                  background: range.active ? "#6F8F9B" : "rgba(255,255,255,0.15)",
                  color: range.active ? "#FFFFFF" : "rgba(255,255,255,0.85)",
                  opacity: range.active ? 1 : 0.66,
                }}
              >
                {range.label}
              </div>
            ))}
          </section>

          <h2
            style={{
              margin: "0 0 9px",
              color: "rgba(255,255,255,0.89)",
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: 1.4,
              textAlign: "left",
            }}
          >
            {interpretation.title}
          </h2>

          {interpretation.body.map((paragraph, index) => (
            <p
              key={`${interpretation.title}-${index}`}
              style={{
                marginTop: 0,
                marginBottom: index === interpretation.body.length - 1 ? 0 : "14px",
                fontSize: "16px",
                lineHeight: 1.48,
                color: brand.softEarth,
                opacity: 0.85,
                textAlign: "left",
              }}
            >
              {paragraph}
            </p>
          ))}
        </header>

          <section style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <a
                href="https://calendly.com/clay-quietground"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
                style={{
                  display: "block",
                  width: "fit-content",
                  textDecoration: "none",
                  color: "#FFFFFF",
                  padding: "0.75rem 1.1rem",
                  borderRadius: 10,
                  fontWeight: 600,
                  border: "1px solid rgba(255,255,255,0.35)",
                  margin: "28px 0 0",
                }}
              >
                Schedule a call
              </a>
            </div>
            <p
              style={{
                marginTop: "14px",
                marginBottom: "-18px",
                textAlign: "center",
                fontSize: "14px",
                color: "rgba(255,255,255,0.85)",
                opacity: 0.66,
              }}
            >
              Thank you for your input.
              <br />
              Let’s explore what’s behind these results.
            </p>
          </section>
        </section>
      </div>
    </main>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={null}>
      <ResultsContent />
    </Suspense>
  )
}
