import type { SimulationInput } from './types'

/**
 * Builds the launch-intelligence prompt sent to the AI model.
 *
 * The prompt asks for a strict JSON response matching the
 * `LaunchInsights` shape so the rest of the application (response
 * parsing, UI display) can rely on a consistent structure regardless
 * of which model is configured.
 */
export function buildLaunchInsightsPrompt(
  simulationInput: SimulationInput
): string {
  return `
You are a senior management consultant, product launch strategist, and market intelligence expert.

Analyze this product launch idea realistically like McKinsey, Bain, BCG, or a Fortune 500 strategy consultant.

PRODUCT DETAILS:

Product Name:
${simulationInput.productName}

Category:
${simulationInput.category}

Industry:
${simulationInput.industry}

Target Audience:
${simulationInput.targetAudience}

Price:
${simulationInput.price}

Market Region:
${simulationInput.marketRegion}

Features:
${simulationInput.productFeatures}

Competitors:
${simulationInput.competitors}

Launch Goal:
${simulationInput.launchGoal}

Return ONLY valid JSON.

FORMAT:

{
  "purchaseLikelihood": number,
  "riskScore": number,
  "sentiment": "Positive | Mixed | Negative",
  "confidence": "High | Medium | Low",

  "executiveSummary":
    "2-4 sentence strategic summary",

  "strategicInsights": [
    "insight 1",
    "insight 2",
    "insight 3"
  ],

  "marketRisks": [
    "risk 1",
    "risk 2"
  ],

  "pricingStrategy":
    "pricing recommendation",

  "competitivePositioning":
    "how product should position",

  "goToMarketStrategy":
    "launch recommendation",

  "recommendations": [
    "recommendation 1",
    "recommendation 2",
    "recommendation 3"
  ]
}

STRICT RULES:
- RETURN ONLY VALID JSON
- DO NOT use markdown
- DO NOT write explanations
- ALL arrays MUST have commas
- realistic business reasoning
- product-specific analysis
- region-specific analysis
- competitor-aware insights
- purchaseLikelihood between 1-100
- riskScore between 1-100
- concise premium consulting-quality output
`
}
