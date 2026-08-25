import { z } from 'zod'

export type SimulationInput = {
  productName: string
  category: string
  industry: string
  targetAudience: string
  price: string | number
  marketRegion: string
  productFeatures: string
  competitors: string
  launchGoal: string
}

/**
 * Runtime schema for the AI model's launch-intelligence response.
 *
 * The AI provider returns free-form JSON text, so this schema is the
 * one place that validates it actually matches what the rest of the
 * app expects before it's trusted anywhere else. Each field uses
 * `.catch()` to fall back to a safe default when the model omits a
 * field, returns the wrong type, or returns a numeric score outside
 * the expected 0-100 range — this keeps a single formatting slip from
 * failing the entire response, while still ruling out structurally
 * invalid output (e.g. a non-object response) at the top level.
 */
export const LaunchInsightsSchema = z.object({
  purchaseLikelihood: z.number().min(0).max(100).catch(50),
  riskScore: z.number().min(0).max(100).catch(50),
  sentiment: z.string().min(1).catch('Mixed'),
  confidence: z.string().min(1).catch('Medium'),
  executiveSummary: z.string().min(1).catch('AI summary unavailable.'),
  strategicInsights: z.array(z.string()).catch([]),
  marketRisks: z.array(z.string()).catch([]),
  pricingStrategy: z
    .string()
    .min(1)
    .catch('No pricing strategy generated.'),
  competitivePositioning: z
    .string()
    .min(1)
    .catch('No positioning advice generated.'),
  goToMarketStrategy: z
    .string()
    .min(1)
    .catch('No GTM strategy generated.'),
  recommendations: z.array(z.string()).catch([]),
})

export type LaunchInsights = z.infer<typeof LaunchInsightsSchema>

