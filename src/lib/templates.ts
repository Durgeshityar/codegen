import templates from './templates.json'

export default templates

export type Templates = {
  [key: string]: {
    name: string
    lib: string[]
    file: string
    instructions: string
    port: number
  }
}
export type TemplateId = keyof typeof templates
export type TemplateConfig = (typeof templates)[TemplateId]

export function templatesToPrompt(templates: Templates) {
  return `${Object.entries(templates)
    .map(
      ([id, t], index) =>
        `${index + 1}. ${id}: "${t.instructions}". File: ${
          t.file || 'none'
        }. Dependencies installed: ${t.lib.join(',')}. Port: ${
          t.port || 'none'
        }`
    )
    .join('\n')}`
}
