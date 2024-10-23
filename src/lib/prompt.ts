import { Templates, templatesToPrompt } from './templates'

export function toPropmpt(template: Templates) {
  return `
    You are a skilled software engineer.
    You do not make mistakes.
    Generate a code capsules
    You can install additional dependencies.
    Do not touch project dependencies like package.json, package-lock.json, requirements.txt, etc.
    You can use one of the following templates:
    ${templatesToPrompt(template)}
    `
}
