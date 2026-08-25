import type { LaunchInsights } from '@/ai'

/**
 * Raw simulation form data as read back from localStorage. Field names
 * are defensively checked against both the original form-field names
 * (e.g. `audience`, `features`, `price`) and the `SimulationInput`
 * field names (`targetAudience`, `productFeatures`), since values
 * stored under either naming convention may be present depending on
 * where they were written from.
 */
type SwotFormData = {
  category?: string
  industry?: string
  targetAudience?: string
  audience?: string
  productFeatures?: string
  features?: string
  competitors?: string
  launchGoal?: string
  price?: string
}

export function generateSWOT(
  simulationData: SwotFormData,
  simulationResult: Partial<LaunchInsights>
) {

  const strengths: string[] = []
  const weaknesses: string[] = []
  const opportunities: string[] = []
  const threats: string[] = []

  const category =
    simulationData.category?.toLowerCase() ||
    ''

  const industry =
    simulationData.industry?.toLowerCase() ||
    ''

  const audience =
    (
      simulationData.targetAudience ||
      simulationData.audience ||
      ''
    ).toLowerCase()

  const features =
    (
      simulationData.productFeatures ||
      simulationData.features ||
      ''
    ).toLowerCase()

  const competitors =
    (
      simulationData.competitors ||
      ''
    ).toLowerCase()

  const launchGoal =
    (
      simulationData.launchGoal ||
      ''
    ).toLowerCase()

  const numericPrice =
    Number(
      simulationData.price?.replace(
        /\D/g,
        ''
      )
    ) || 0

  // --------------------------
  // STRENGTHS
  // --------------------------

  if (
    features.includes(
      'premium'
    )
  ) {
    strengths.push(
      'Strong premium brand positioning'
    )
  }

  if (
    features.includes(
      'high protein'
    )
  ) {
    strengths.push(
      'Strong product differentiation through health benefits'
    )
  }

  if (
    features.includes(
      'ai'
    )
  ) {
    strengths.push(
      'Technology-driven product advantage'
    )
  }

  if (
    simulationResult.purchaseLikelihood >=
    75
  ) {
    strengths.push(
      'Strong predicted consumer demand'
    )
  }

  // --------------------------
  // WEAKNESSES
  // --------------------------

  if (
    audience.includes(
      'student'
    ) &&
    numericPrice > 500
  ) {
    weaknesses.push(
      'Price may be unaffordable for students'
    )
  }

  if (
    simulationResult.riskScore >=
    70
  ) {
    weaknesses.push(
      'Elevated launch risk detected'
    )
  }

  if (
    competitors.split(',')
      .length >= 3
  ) {
    weaknesses.push(
      'Highly competitive market segment'
    )
  }

  // --------------------------
  // OPPORTUNITIES
  // --------------------------

  if (
    category.includes(
      'fitness'
    ) ||
    category.includes(
      'protein'
    )
  ) {
    opportunities.push(
      'Growing health and wellness market'
    )
  }

  if (
    industry.includes(
      'saas'
    )
  ) {
    opportunities.push(
      'Expanding digital adoption market'
    )
  }

  if (
    launchGoal.includes(
      'adoption'
    )
  ) {
    opportunities.push(
      'Promotional pricing can accelerate adoption'
    )
  }

  opportunities.push(
    'Social media influencer marketing opportunity'
  )

  // --------------------------
  // THREATS
  // --------------------------

  if (competitors) {
    threats.push(
      'Strong competitor pressure in the market'
    )
  }

  if (
    simulationResult.sentiment ===
    'Negative'
  ) {
    threats.push(
      'Consumer perception risk'
    )
  }

  if (
    numericPrice > 1000
  ) {
    threats.push(
      'Premium pricing may reduce mass adoption'
    )
  }

  // --------------------------
  // FALLBACKS
  // --------------------------

  if (
    strengths.length === 0
  ) {
    strengths.push(
      'Potential for product differentiation'
    )
  }

  if (
    weaknesses.length === 0
  ) {
    weaknesses.push(
      'No major structural weaknesses identified'
    )
  }

  if (
    opportunities.length === 0
  ) {
    opportunities.push(
      'Market growth opportunities exist'
    )
  }

  if (
    threats.length === 0
  ) {
    threats.push(
      'General market competition'
    )
  }

  return {
    strengths,
    weaknesses,
    opportunities,
    threats,
  }
}
