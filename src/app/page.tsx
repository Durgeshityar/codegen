'use client'

import { useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import { supabase } from '@/lib/supabase'
import { AuthViewType, useAuth } from '@/lib/auth'
import modelsList from '@/lib/models.json'

import { AuthDialog } from '@/components/auth-dialog'
import { NavBar } from '@/components/navbar'
import { Chat } from '@/components/chat'
import { ChatInput } from '@/components/chat-input'
import { ChatPicker } from '@/components/chat-picker'
import templates from '@/lib/templates'
import { ChatSettings } from '@/components/chat-settings'
import { LLMModelConfig } from '@/lib/models'
import { Message } from '@/lib/messages'
import { DeepPartial } from 'ai'
import { CodeLabSchema } from '@/lib/shema'

export default function Home() {
  const [authView, setAuthView] = useState<AuthViewType>('sign_in')

  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
  const { session } = useAuth(setIsAuthDialogOpen, setAuthView)
  const [files, setFiles] = useState<File[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<'auto'>('auto')
  const [messages, setMessages] = useState<Message[]>([])
  const [cpasule, setCapsule] = useState<DeepPartial<CodeLabSchema>>()
  const [currentTab, setCurrentTab] = useState<'code' | 'capsule'>('code')
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)

  const [chatInput, setChatInput] = useLocalStorage('chat', '')
  const [languageModel, setLanguageModel] = useLocalStorage('languageModel', {
    model: 'gpt-4o-mini',
  })

  function logout() {
    if (supabase) supabase.auth.signOut()
    else console.warn('supabase is not initialised')
  }

  function handleLanguagaeModelChange(e: LLMModelConfig) {
    setLanguageModel({ ...languageModel, ...e })
  }

  const currentModel = modelsList.models.find(
    (model) => model.id === languageModel.model
  )

  const currentTemplate =
    selectedTemplate === 'auto'
      ? templates
      : { [selectedTemplate]: templates[selectedTemplate] }

  const lastMessage = messages[messages.length - 1]

  return (
    <main className="flex min-h-screen max-h-screen">
      {supabase && (
        <AuthDialog
          open={isAuthDialogOpen}
          setOpen={setIsAuthDialogOpen}
          view={authView}
          supabase={supabase}
        />
      )}
      <div className="grid w-full md:grid-cols-2">
        <div className="flex flex-col w-full max-w-[800px] mx-auto px-4 overflow-auto col-span-2">
          <NavBar
            session={session}
            showLogin={() => setIsAuthDialogOpen(true)}
            signOut={logout}
            onClear={() => {}}
          />
          <Chat />
          <ChatInput
            isLoading={false}
            input={chatInput}
            handleInputChange={() => {}}
            handleSubmit={() => {}}
            handleFileChanges={() => {}}
            files={files}
            error={undefined}
            retry={() => {}}
            isMultiModal={false}
            stop={() => {}}
          >
            <ChatPicker models={modelsList.models} templates={templates} />
            <ChatSettings
              apiKeyConfigurable={true}
              baseURLConfigurable={true}
              languageModel={languageModel}
              onLanguageModelChnage={handleLanguagaeModelChange}
            />
          </ChatInput>
        </div>
      </div>
    </main>
  )
}
