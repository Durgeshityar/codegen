import { ExecutionError, Result } from '@e2b/code-interpreter'
import { TemplateId } from './templates'

type ExecutionResultBase = {
  sbxId: string // sandbox Id
}

export type ExecutionResultInterpreter = ExecutionResultBase & {
  template: 'cc-nextjs-developer-v01'
  stdout: string[]
  stderr: string[]
  runtimeError?: ExecutionError
  cellResult: Result[]
}

export type ExecutionResultWeb = ExecutionResultBase & {
  template: Exclude<TemplateId, 'cc-nextjs-developer-v01'>
  url: string
}

export type ExecutionResult = ExecutionResultInterpreter | ExecutionResultWeb
