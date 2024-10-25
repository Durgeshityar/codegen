import { Message } from '@/lib/messages'
import { CodeLabSchema } from '@/lib/shema'
import { ExecutionResult } from '@/lib/types'
import { DeepPartial } from 'ai'
import { LoaderIcon, TerminalIcon } from 'lucide-react'

export function Chat({
  messages,
  isLoading,
  setCurrentPreview,
}: {
  messages: Message[]
  isLoading: boolean
  setCurrentPreview: (preview: {
    capsule: DeepPartial<CodeLabSchema> | undefined
    result: ExecutionResult | undefined
  }) => void
}) {
  return (
    <div id="chat-container">
      {messages.map((message: Message, index: number) => (
        <div key={index}>
          {message.content.map((content, id) => {
            if (content.type === 'text') {
              return content.text
            }
            if (content.type === 'image') {
              return (
                // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
                <img key={id} src={content.image} alt="capsule" className="" />
              )
            }
          })}

          {message.object && (
            <div
              onClick={() =>
                setCurrentPreview({
                  capsule: message.object,
                  result: message.result,
                })
              }
            >
              <div>
                <TerminalIcon strokeWidth={2} className="" />
              </div>
              <div>
                <span> {message.object.title} </span>
                <span>Click to see code capsule</span>
              </div>
            </div>
          )}
        </div>
      ))}
      {isLoading && (
        <div>
          <LoaderIcon strokeWidth={2} className="animate-spin size-4" />
          <span>Generating</span>
        </div>
      )}
    </div>
  )
}
