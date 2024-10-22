import { CodeLabSchema } from './shema'
import { DeepPartial } from 'ai'
import { ExecutionResult } from './types'

export type MessageText = {
  type: 'text'
  text: string
}

export type MessageCode = {
  type: 'code'
  text: string
}

export type MessageImage = {
  type: 'image'
  image: string
}

export type Message = {
  role: 'assistant' | 'user'
  content: Array<MessageText | MessageCode | MessageImage>
  object?: DeepPartial<CodeLabSchema>
  result?: ExecutionResult
}
