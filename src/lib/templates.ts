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
