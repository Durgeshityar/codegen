import { Settings2 } from 'lucide-react'

import { LLMModelConfig } from '@/lib/models'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export function ChatSettings({
  apiKeyConfigurable,
  baseURLConfigurable,
  languageModel,
  onLanguageModelChnage,
}: {
  apiKeyConfigurable: boolean
  baseURLConfigurable: boolean
  languageModel: LLMModelConfig
  onLanguageModelChnage: (model: LLMModelConfig) => void
}) {
  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant={'ghost'}
                size={'icon'}
                className="text-muted-foreground size-6 rounded-sm"
              >
                <Settings2 className="size-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>LLM settings</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align="start">
        {apiKeyConfigurable && (
          <>
            <div className="flex flex-col gap-2 px-2 py-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                name="apiKey"
                type="password"
                placeholder="Auto"
                required={true}
                defaultValue={languageModel.apiKey}
                onChange={(e) =>
                  onLanguageModelChnage({
                    apiKey:
                      e.target.value.length > 0 ? e.target.value : undefined,
                  })
                }
                className="text-xs"
              />
            </div>
            <DropdownMenuSeparator />
          </>
        )}

        {baseURLConfigurable && (
          <>
            <div className="flex flex-col gap-2 px-2 py-2">
              <Label htmlFor="baseURL">Base URL</Label>
              <Input
                name="baseURL"
                type="text"
                placeholder="Auto"
                required={true}
                defaultValue={languageModel.baseURL}
                onChange={(e) =>
                  onLanguageModelChnage({
                    baseURL:
                      e.target.value.length > 0 ? e.target.value : undefined,
                  })
                }
                className="text-xs"
              />
            </div>
            <DropdownMenuSeparator />
          </>
        )}
        <div className=" flex flex-col gap-1.5 p-2">
          <span className="text-xs font-medium">Parameters</span>
          <div className="flex space-x-4 items-center">
            <span className="text-xs flex-1 text-muted-foreground">
              Output tokens
            </span>
            <Input
              type="number"
              defaultValue={languageModel.maxTokens}
              min={50}
              max={10000}
              step={1}
              placeholder="Auto"
              className="h-6 rounded-sm w-[84px] text-xs text-center tabular-nums"
              onChange={(e) =>
                onLanguageModelChnage({
                  maxTokens: parseFloat(e.target.value) || undefined,
                })
              }
            />
          </div>

          <div className="flex space-x-4 items-center">
            <span className="text-xs flex-1 text-muted-foreground">
              Tempreature
            </span>
            <Input
              type="number"
              defaultValue={languageModel.temperature}
              min={0}
              max={5}
              step={0.01}
              placeholder="Auto"
              className="h-6 rounded-sm w-[84px] text-xs text-center tabular-nums"
              onChange={(e) =>
                onLanguageModelChnage({
                  temperature: parseFloat(e.target.value) || undefined,
                })
              }
            />
          </div>

          <div className="flex space-x-4 items-center">
            <span className="text-xs flex-1 text-muted-foreground">Top P</span>
            <Input
              type="number"
              defaultValue={languageModel.topP}
              min={0}
              max={1}
              step={0.01}
              placeholder="Auto"
              className="h-6 rounded-sm w-[84px] text-xs text-center tabular-nums"
              onChange={(e) =>
                onLanguageModelChnage({
                  topP: parseFloat(e.target.value) || undefined,
                })
              }
            />
          </div>

          <div className="flex space-x-4 items-center">
            <span className="text-xs flex-1 text-muted-foreground">Top K</span>
            <Input
              type="number"
              defaultValue={languageModel.topK}
              min={0}
              max={500}
              step={1}
              placeholder="Auto"
              className="h-6 rounded-sm w-[84px] text-xs text-center tabular-nums"
              onChange={(e) =>
                onLanguageModelChnage({
                  topK: parseFloat(e.target.value) || undefined,
                })
              }
            />
          </div>

          <div className="flex space-x-4 items-center">
            <span className="text-xs flex-1 text-muted-foreground">
              Frequence Penalty
            </span>
            <Input
              type="number"
              defaultValue={languageModel.frequencyPenalty}
              min={0}
              max={2}
              step={0.01}
              placeholder="Auto"
              className="h-6 rounded-sm w-[84px] text-xs text-center tabular-nums"
              onChange={(e) =>
                onLanguageModelChnage({
                  frequencyPenalty: parseFloat(e.target.value) || undefined,
                })
              }
            />
          </div>

          <div className="flex space-x-4 items-center">
            <span className="text-xs flex-1 text-muted-foreground">
              Presence Penalty
            </span>
            <Input
              type="number"
              defaultValue={languageModel.presencePenalty}
              min={0}
              max={2}
              step={0.01}
              placeholder="Auto"
              className="h-6 rounded-sm w-[84px] text-xs text-center tabular-nums"
              onChange={(e) =>
                onLanguageModelChnage({
                  presencePenalty: parseFloat(e.target.value) || undefined,
                })
              }
            />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
