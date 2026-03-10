export type AssessmentOption = {
  label: string
  score: number
}

export type AssessmentQuestion = {
  prompt: string
  options: AssessmentOption[]
}

export const assessment: AssessmentQuestion[] = [
  {
    prompt: "How clearly can leadership see what is happening across the business right now?",
    options: [
      { label: "Very clear — strong visibility across departments", score: 3 },
      { label: "Somewhat clear — but relies on meetings or manual updates", score: 2 },
      { label: "Limited visibility — information is fragmented", score: 1 },
      { label: "Very unclear — decisions are often made with incomplete information", score: 0 },
    ],
  },
  {
    prompt: "How clearly are responsibilities defined across teams?",
    options: [
      { label: "Very clear — ownership is well defined", score: 3 },
      { label: "Mostly clear — some overlap exists", score: 2 },
      { label: "Somewhat unclear — responsibilities depend on individuals", score: 1 },
      { label: "Very unclear — ownership is frequently ambiguous", score: 0 },
    ],
  },
  {
    prompt: "How easily can leadership identify operational problems?",
    options: [
      { label: "Very easily — issues become visible quickly", score: 3 },
      { label: "Usually — but often through meetings or reports", score: 2 },
      { label: "Occasionally — problems surface later than they should", score: 1 },
      { label: "Rarely — issues are often discovered late", score: 0 },
    ],
  },
  {
    prompt: "How consistently does work move between departments?",
    options: [
      { label: "Very consistently — workflows are clearly defined", score: 3 },
      { label: "Mostly consistently — but some coordination is informal", score: 2 },
      { label: "Somewhat inconsistent — coordination varies by team", score: 1 },
      { label: "Highly inconsistent — handoffs often create delays", score: 0 },
    ],
  },
  {
    prompt: "How clearly are key business metrics tracked?",
    options: [
      { label: "Very clearly — dashboards provide reliable visibility", score: 3 },
      { label: "Mostly clearly — but some reporting is manual", score: 2 },
      { label: "Somewhat unclear — metrics are spread across tools", score: 1 },
      { label: "Very unclear — metrics are difficult to track consistently", score: 0 },
    ],
  },
  {
    prompt: "How dependent is the organization on meetings for operational updates?",
    options: [
      { label: "Low — systems provide most operational visibility", score: 3 },
      { label: "Moderate — meetings provide context", score: 2 },
      { label: "High — meetings are required to understand operations", score: 1 },
      { label: "Very high — leadership relies heavily on meetings", score: 0 },
    ],
  },
  {
    prompt: "How clearly are workflows documented across teams?",
    options: [
      { label: "Very clearly — workflows are documented and maintained", score: 3 },
      { label: "Somewhat clearly — documentation exists but incomplete", score: 2 },
      { label: "Limited documentation — knowledge lives with individuals", score: 1 },
      { label: "No documentation — workflows are mostly informal", score: 0 },
    ],
  },
  {
    prompt: "How easily can new employees understand how work gets done?",
    options: [
      { label: "Very easily — processes are clear and structured", score: 3 },
      { label: "Mostly easily — some learning through experience", score: 2 },
      { label: "Somewhat difficult — processes vary between teams", score: 1 },
      { label: "Very difficult — knowledge is mostly informal", score: 0 },
    ],
  },
  {
    prompt: "How frequently does leadership step in to resolve operational issues?",
    options: [
      { label: "Rarely — teams resolve issues independently", score: 3 },
      { label: "Occasionally — leadership provides guidance", score: 2 },
      { label: "Often — leadership must step in", score: 1 },
      { label: "Constantly — leadership drives most operational decisions", score: 0 },
    ],
  },
  {
    prompt: "How prepared is the organization to introduce automation or AI?",
    options: [
      { label: "Very prepared — workflows and data are structured", score: 3 },
      { label: "Somewhat prepared — some refinement needed", score: 2 },
      { label: "Limited readiness — workflows inconsistent", score: 1 },
      { label: "Not prepared — processes lack clarity", score: 0 },
    ],
  },
]

export const brand = {
  slateBlue: "#3E5C76",
  softEarth: "#E6E2DD",
  deepCharcoal: "#2F2F2F",
  white: "#FFFFFF",
  accent: "#5A7C8A",
}

