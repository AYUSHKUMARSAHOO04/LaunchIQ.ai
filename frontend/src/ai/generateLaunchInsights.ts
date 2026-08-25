import { aiClient } from './client'
import { AI_MODEL, AI_TEMPERATURE, isAiConfigured } from './config'
import { buildLaunchInsightsPrompt } from './prompts'
import { parseLaunchInsights } from './parser'
import type { LaunchInsights, SimulationInput } from './types'

/**
 * Calls the configured AI model to generate structured launch
 * intelligence for a product simulation.
 *
 * Throws a descriptive Error when the request cannot be completed or
 * the response cannot be parsed, so callers can surface a meaningful
 * message instead of silently producing no output.
 */
export async function generateLaunchInsights(
  simulationInput: SimulationInput
): Promise<LaunchInsights> {
  if (!isAiConfigured) {
    throw new Error(
      'AI insights are not configured. Set VITE_AI_API_KEY in your environment.'
    )
  }

  const prompt = buildLaunchInsightsPrompt(simulationInput)

  let text: string
  try {
    const completion = await aiClient.chat.completions.create({
      model: AI_MODEL,
      temperature: AI_TEMPERATURE,
      response_format: { type: 'json_object' },
      messages: [{ role: 'user', content: prompt }],
    })

    text = completion.choices?.[0]?.message?.content || ''
    console.log('AI RAW RESPONSE:', text)
  } catch (error) {
    console.error('AI request failed:', error)
    const reason = error instanceof Error ? error.message : String(error)
    throw new Error(`AI request failed: ${reason}`, { cause: error })
  }

  const insights = parseLaunchInsights(text)

  if (!insights) {
    throw new Error('AI returned a response that could not be parsed.')
  }

  return insights
}
