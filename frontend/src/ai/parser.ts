import { LaunchInsightsSchema } from './types'
import type { LaunchInsights } from './types'

/** Strips markdown code fences some models wrap JSON responses in. */
function cleanResponseText(text: string): string {
  return text.replace(/```json/g, '').replace(/```/g, '').trim()
}

/** Best-effort repair for common small JSON formatting mistakes. */
function repairJsonText(text: string): string {
  return text
    .replace(/"\s*\n\s*"/g, '",\n"') // missing commas between fields
    .replace(/,\s*}/g, '}') // trailing commas before an object close
    .replace(/,\s*]/g, ']') // trailing commas before an array close
}

/**
 * Parses and validates a single JSON attempt. Returns `null` if the
 * text isn't valid JSON, or isn't a plain object at the top level
 * (e.g. the model returned an array, a string, or `null`). Individual
 * field-level problems are handled by the schema's `.catch()` defaults
 * rather than failing the whole response.
 */
function parseAndValidate(jsonText: string): LaunchInsights | null {
  let raw: unknown
  try {
    raw = JSON.parse(jsonText)
  } catch {
    return null
  }

  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    return null
  }

  const result = LaunchInsightsSchema.safeParse(raw)
  return result.success ? result.data : null
}

/**
 * Parses the raw text returned by the AI model into a validated
 * LaunchInsights object.
 *
 * 1. Strips markdown fences and attempts JSON.parse + schema
 *    validation directly.
 * 2. If that fails, applies a small set of automatic repairs for
 *    formatting mistakes models occasionally produce (missing commas,
 *    trailing commas) and retries.
 * 3. Returns `null` only if the response is not a usable JSON object
 *    even after repair — callers treat this as a real failure rather
 *    than silently fabricating a result.
 */
export function parseLaunchInsights(rawText: string): LaunchInsights | null {
  const cleanedText = cleanResponseText(rawText)

  const direct = parseAndValidate(cleanedText)
  if (direct) return direct

  console.error(
    'AI response was not valid JSON on first attempt, trying repair.'
  )
  console.log('Raw AI response:', cleanedText)

  const repairedText = repairJsonText(cleanedText)
  const repaired = parseAndValidate(repairedText)
  if (repaired) return repaired

  console.error('AI response could not be parsed or validated after repair.')
  console.log('Repaired AI response attempt:', repairedText)
  return null
}
