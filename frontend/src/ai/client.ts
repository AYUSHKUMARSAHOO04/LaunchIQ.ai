import OpenAI from 'openai'
import { AI_API_KEY, AI_BASE_URL, isAiConfigured } from './config'

if (!isAiConfigured) {
  console.warn(
    'VITE_AI_API_KEY is not set. AI-powered launch insights will not work until it is configured.'
  )
}

/**
 * Shared client for LaunchIQ's AI provider.
 *
 * The `openai` SDK is used because it speaks the OpenAI-compatible
 * chat-completions protocol implemented by our provider (OpenRouter).
 *
 * SECURITY NOTE: `dangerouslyAllowBrowser` is required because this app
 * currently calls the AI provider directly from the browser — there is
 * no backend proxy. This means the AI provider API key is shipped to
 * and readable by every client. This is an accepted, documented
 * trade-off for the current architecture (see docs/backend.md); if
 * this app is deployed for wider/public use, the AI call should be
 * moved behind a server-side endpoint (e.g. a Vercel serverless
 * function) so the key never reaches the browser.
 */
export const aiClient = new OpenAI({
  apiKey: AI_API_KEY || '',
  baseURL: AI_BASE_URL,
  dangerouslyAllowBrowser: true,
})
