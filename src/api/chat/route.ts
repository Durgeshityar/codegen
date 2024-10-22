import { Duration } from '@/lib/duration'
import { LLMModelConfig, LLMModels } from '@/lib/models'
import ratelimit from '@/lib/ratelimit'
import { Templates } from '@/lib/templates'
import { CoreMessage } from 'ai'

const ratelimit_max_request = process.env.RATE_LIMIT_MAX_REQUEST
  ? parseInt(process.env.RATE_LIMIT_MAX_REQUEST)
  : 100
const ratelimit_window = process.env.RATE_LIMIT_WINDOW
  ? (process.env.RATE_LIMIT_WINDOW as Duration)
  : '1d'

export async function POST(req: Request) {
  const {
    messages,
    userId,
    template,
    model,
    config,
  }: {
    messages: CoreMessage[]
    userId: string
    template: Templates
    model: LLMModels
    config: LLMModelConfig
  } = await req.json()

  const limit = !config.apiKey
    ? await ratelimit(userId, ratelimit_max_request, ratelimit_window)
    : false

  if (limit) {
    return new Response('You have reached your request limit for the day.', {
      status: 429,
      headers: {
        'X-Ratelimit-Limit': limit.amount.toString(),
        'X-Ratelimit-Remaining': limit.remaining.toString(),
        'X-Ratelimit-Reset': limit.reset.toString(),
      },
    })
  }

  const { model: modelNameString, apiKey: modelApiKey, ...modelParams } = config
}
