import { ArrowUp, PaperclipIcon, SquareIcon } from 'lucide-react'
import TextareaAutosize from 'react-textarea-autosize'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

export function ChatInput({
  error,
  retry,
  isLoading,
  stop,
  input,
  handleInputChange,
  handleSubmit,
  files,
  handleFileChanges,
  children,
  isMultiModal,
}: {
  error: undefined | unknown
  retry: () => void
  isLoading: boolean
  stop: () => void
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  files: File[]
  handleFileChanges: (files: File[]) => void
  children: React.ReactNode
  isMultiModal: boolean
}) {
  return (
    <form className="mb-2 flex flex-col mt-auto bg-background">
      {error !== undefined && (
        <div>An unexpected error has occured. Please try again later</div>
      )}
      <div className="shadow-md rounded-2xl border">
        <div className="flex items-center px-3 py-2  gap-1">{children}</div>
        <TextareaAutosize
          autoFocus={true}
          minRows={1}
          maxRows={5}
          required={true}
          className="px-3 resize-none ring-0 bg-inherit w-full m-0 outline-none focus:outline-none"
          placeholder="Describe your UI imagination ✨"
          value={input}
          onChange={handleInputChange}
        />
        <div className="flex p-3 gap-2 items-center">
          <input
            type="file"
            id="multimodal"
            accept="image/*"
            multiple={true}
            className="hidden"
            onChange={() => {}}
          />
          <div className="flex items-center flex-1 gap-2">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    //disabled={!isMultiModal}
                    type="button"
                    variant={'outline'}
                    size={'icon'}
                    className="rounded-xl  size-10"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById('multimodal')?.click()
                    }}
                  >
                    <PaperclipIcon className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add attachments</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {}
          </div>
          <div>
            {!isLoading ? (
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      type="submit"
                      variant={'default'}
                      size={'icon'}
                      className="rounded-xl  size-10"
                    >
                      <ArrowUp className="size-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Send Message</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={'secondary'}
                      size={'icon'}
                      className="rounded-xl  size-10"
                      onClick={(e) => {
                        e.preventDefault()
                        stop()
                      }}
                    >
                      <SquareIcon className="size-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Stop generation</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center ">
        Code Labs is code block generator and live UI preview
      </p>
    </form>
  )
}
