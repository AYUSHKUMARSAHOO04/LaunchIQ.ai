import {
  generateLaunchInsights,
} from '@/ai'
import type {
  LaunchInsights,
  SimulationInput,
} from '@/ai'

export async function
runSimulation(
  simulationInput: SimulationInput
): Promise<LaunchInsights> {

  try {

    const aiResult =
      await generateLaunchInsights(
        simulationInput
      )

    return {

      purchaseLikelihood:
        aiResult
          .purchaseLikelihood ?? 50,

      riskScore:
        aiResult
          .riskScore ?? 50,

      sentiment:
        aiResult
          .sentiment ?? 'Mixed',

      confidence:
        aiResult
          .confidence ?? 'Medium',

      executiveSummary:
        aiResult
          .executiveSummary ??
        'No executive summary generated.',

      strategicInsights:
        aiResult
          .strategicInsights ?? [],

      marketRisks:
        aiResult
          .marketRisks ?? [],

      pricingStrategy:
        aiResult
          .pricingStrategy ??
        'No pricing strategy available.',

      competitivePositioning:
        aiResult
          .competitivePositioning ??
        'No positioning guidance available.',

      goToMarketStrategy:
        aiResult
          .goToMarketStrategy ??
        'No GTM strategy available.',

      recommendations:
        aiResult
          .recommendations ?? [],
    }
  }

  catch (
    error
  ) {

    console.error(
      'Simulation failed:',
      error
    )

    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Unknown error while generating AI insights.'

    return {

      purchaseLikelihood:
        50,

      riskScore:
        50,

      sentiment:
        'Mixed',

      confidence:
        'Low',

      executiveSummary:
        `Simulation failed to generate AI insights: ${errorMessage}`,

      strategicInsights:
        [],

      marketRisks:
        [],

      pricingStrategy:
        'No pricing strategy available.',

      competitivePositioning:
        'No positioning guidance available.',

      goToMarketStrategy:
        'No GTM strategy available.',

      recommendations:
        [
          'Please check your AI configuration and try again.',
        ],
    }
  }
}
