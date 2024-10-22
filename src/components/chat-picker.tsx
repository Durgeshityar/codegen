import { LLMModels } from '@/lib/models'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'
import { Templates } from '@/lib/templates'
import { Sparkles } from 'lucide-react'

export function ChatPicker({
  models,
  templates,
}: {
  models: LLMModels[]
  templates: Templates
}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-col">
        <Select name="template" defaultValue={''} onValueChange={() => {}}>
          <SelectTrigger className="whitespace-nowrap border-none shadow-none py-0 px-0 h-6 text-xs focus:ring-0">
            <SelectValue placeholder="Select a persona" />
            <SelectContent side="top">
              <SelectGroup>
                <SelectLabel>Persona</SelectLabel>
                <SelectItem value="auto">
                  <div className="flex items-center space-x-2">
                    <Sparkles
                      className="flex text-[#a1a1aa]"
                      width={14}
                      height={14}
                    />
                    <span>Auto</span>
                  </div>
                </SelectItem>
                {Object.entries(templates).map(([templateId, template]) => (
                  <SelectItem key={templateId} value={templateId}>
                    <div className="flex items-center space-x-2">
                      <Image
                        className="flex"
                        src={`/third-party/templates/${templateId}.svg`}
                        alt={templateId}
                        height={14}
                        width={14}
                      />
                      <span>{template.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </SelectTrigger>
        </Select>
      </div>

      <div className="flex flex-col">
        <Select name="languageModel" defaultValue={''} onValueChange={() => {}}>
          <SelectTrigger className="whitespace-nowrap border-none shadow-none py-0 px-0 h-6 text-xs focus:ring-0">
            <SelectValue placeholder="Language model" />
            <SelectContent>
              {Object.entries(
                Object.groupBy(models, ({ provider }) => provider)
              ).map(([provider, models]) => (
                <SelectGroup key={provider}>
                  <SelectLabel> {provider} </SelectLabel>
                  {models?.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      <div className=" flex items-center gap-x-2">
                        <Image
                          className="flex"
                          src={`third-party/logos/${model.providerId}.svg`}
                          alt={model.providerId}
                          width={14}
                          height={14}
                        />
                        <span>{model.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </SelectTrigger>
        </Select>
      </div>
    </div>
  )
}
