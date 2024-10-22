import { createAnthropic } from '@ai-sdk/anthropic'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createOpenAI } from '@ai-sdk/openai'
import { createMistral } from '@ai-sdk/mistral'
import { createOllama } from 'ollama-ai-provider'

export type LLMModels = {
  id: string
  name: string
  provider: string
  providerId: string
  multiModal: boolean
}

export type LLMModelConfig = {
  model?: string
  apiKey?: string
  baseURL?: string
  temperature?: number
  topP?: number
  topK?: number
  frequencyPenalty?: number
  presencePenalty?: number
  maxTokens?: number
}

export function getModelClient(model: LLMModels, config: LLMModelConfig) {
  const { id: modelNameString, providerId } = model
  const { apiKey, baseURL } = config

  const provideConfigs = {
    anthropic: () => createAnthropic({ apiKey, baseURL })(modelNameString),
    openai: () => createOpenAI({ apiKey, baseURL })(modelNameString),
    google: () =>
      createGoogleGenerativeAI({ apiKey, baseURL })(modelNameString),
    mistral: () => createMistral({ apiKey, baseURL })(modelNameString),
    grog: () =>
      createOpenAI({
        apiKey: apiKey || process.env.GROQ_API_KEY,
        baseURL: baseURL || 'https://api/groq.com/openai/v1',
      })(modelNameString),
    togetherai: () =>
      createOpenAI({
        apiKey: apiKey || process.env.TOGETHER_AI_API_KEY,
        baseURL: baseURL || 'https://api.together.xyz/openai/v1',
      })(modelNameString),
    fireworks: () =>
      createOpenAI({
        apiKey: apiKey || process.env.FIREWORKS_AI_API_KEY,
        baseURL: baseURL || 'https://api.fireworks.ai/inference/openai/v1',
      })(modelNameString),
    ollama: () => createOllama({ baseURL })(modelNameString),
  }

  const createClient = provideConfigs[providerId as keyof typeof provideConfigs]

  if (!createClient) {
    throw new Error(`Unsupported Provider: ${providerId}`)
  }

  return createClient()
}
