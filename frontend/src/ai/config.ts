/**
 * Configuration for LaunchIQ's AI integration.
 *
 * LaunchIQ generates its launch-intelligence insights through an
 * OpenAI-compatible chat-completions API. The provider, model, and
 * credentials are all controlled via environment variables so the
 * integration can be swapped without touching application code.
 *
 * Default provider: OpenRouter (https://openrouter.ai), which exposes
 * `qwen/qwen3.6-27b` behind an OpenAI-compatible `/chat/completions`
 * endpoint. Any other OpenAI-compatible provider can be used instead by
 * overriding VITE_AI_BASE_URL and VITE_AI_MODEL.
 */

/** Base URL of the OpenAI-compatible chat-completions API. */
export const AI_BASE_URL =
  import.meta.env.VITE_AI_BASE_URL || 'https://openrouter.ai/api/v1'

/** Model identifier passed to the chat-completions request. */
export const AI_MODEL =
  import.meta.env.VITE_AI_MODEL || 'qwen/qwen3.6-27b'

/** API key used to authenticate against the AI provider. */
export const AI_API_KEY = import.meta.env.VITE_AI_API_KEY as
  | string
  | undefined

/** Sampling temperature used for launch-insight generation. */
export const AI_TEMPERATURE = 0.4

export const isAiConfigured = Boolean(AI_API_KEY)
