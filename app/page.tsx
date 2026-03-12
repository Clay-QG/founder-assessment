import Link from "next/link"
import { brand } from "./diagnostic-data"

const shared = {
  container: {
    width: "100%",
    maxWidth: 720,
    padding: "48px 56px",
    borderRadius: 18,
    background: "#6A6C6D",
    border: "1px solid rgba(255,255,255,0.18)",
    boxShadow: "0 30px 60px rgba(0,0,0,0.28), 0 0 80px rgba(189,186,180,0.06)",
  } as const,
  main: {
    minHeight: "100dvh",
    background: "#5F6061",
    color: brand.white,
    display: "grid",
    placeItems: "center",
    padding: "2.5rem 1rem",
  } as const,
}

export default function Home() {
  return (
    <main style={shared.main} className="home-main">
      <style>{`
        .home-title-desktop {
          display: inline;
        }

        .home-title-mobile {
          display: none;
        }

        .home-title-line-top {
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .home-main {
            min-height: 100dvh !important;
            padding: 1rem !important;
          }

          .home-card {
            padding: 2rem 1.25rem !important;
          }

          .home-domino {
            top: 1.25rem !important;
            right: 1rem !important;
            width: 2.75rem !important;
            height: 1.625rem !important;
          }

          .home-brand {
            margin-bottom: 0.875rem !important;
            font-size: 1.125rem !important;
          }

          .home-title {
            margin-bottom: 1rem !important;
            font-size: 1.7rem !important;
            max-width: 18ch !important;
            white-space: normal !important;
            text-wrap: balance !important;
          }

          .home-title-desktop {
            display: none;
          }

          .home-title-mobile {
            display: inline;
          }

          .home-description {
            max-width: 38ch;
            margin-inline: auto;
            font-size: 1rem;
            text-wrap: pretty;
          }

          .home-cta {
            width: 100% !important;
            max-width: 16rem;
            padding: 0.95rem 1.25rem !important;
            margin-top: 1.5rem !important;
            font-size: 1rem !important;
            text-align: center;
          }
        }
      `}</style>
      <section style={{ ...shared.container, position: "relative" }} className="home-card">
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
          className="home-domino"
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
            className="home-brand"
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
            className="home-title"
            style={{
              margin: "0 auto 24px",
              fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
              maxWidth: "620px",
            }}
          >
          <>
            <span className="home-title-desktop">Operational Intelligence Assessment</span>
            <span className="home-title-mobile">
              <span className="home-title-line-top">Operational Intelligence</span>
              <br />
              Assessment
            </span>
          </>
          </h1>
          <p className="home-description" style={{ margin: 0, color: brand.softEarth, lineHeight: 1.45, opacity: 0.85 }}>
            This diagnostic helps founders and leadership teams understand how clearly information moves through their
            organization and where operational visibility may be limiting execution.
          </p>
        </header>

        <Link
          href="/founder-info"
          className="cta-button home-cta"
          style={{
            display: "block",
            width: "fit-content",
            textDecoration: "none",
            color: brand.white,
            border: "1px solid rgba(255,255,255,0.35)",
            borderRadius: 10,
            padding: "0.75rem 1.1rem",
            fontWeight: 600,
            margin: "28px auto 0",
            position: "relative",
            zIndex: 1,
          }}
        >
          Begin Assessment
        </Link>
        <p
          style={{
            marginTop: "14px",
            marginBottom: "-18px",
            textAlign: "center",
            fontSize: "14px",
            color: "rgba(255,255,255,0.65)",
            position: "relative",
            zIndex: 1,
          }}
        >
          About 3 minutes
        </p>
      </section>
    </main>
  )
}
