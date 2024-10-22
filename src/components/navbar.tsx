import {
  ArrowRight,
  CodeSquareIcon,
  MoonIcon,
  SunIcon,
  Trash,
  Undo,
} from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Session } from '@supabase/supabase-js'

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

export function NavBar({
  session,
  showLogin,
  signOut,
  onClear,
  onSocialClick,
  onUndo,
  canUndo,
  canClear,
}: {
  session: Session | null
  showLogin: () => void
  signOut: () => void
  onClear: () => void
  canClear: boolean
  onSocialClick: (target: 'github' | 'x') => void
  onUndo: () => void
  canUndo: boolean
}) {
  const { theme, setTheme } = useTheme()

  return (
    <nav className=" w-full flex bg-background py-4">
      <div className="flex flex-1 items-center">
        <Link href={'/'} className=" flex items-center gap-2">
          <CodeSquareIcon className="size-7" />
          <h1 className="whitespace-pre">Code Labs</h1>
        </Link>
      </div>
      <div className="flex items-center gap-1 md:gap-4">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant={'ghost'}
                size={'icon'}
                onClick={onUndo}
                //disabled={!canUndo}
              >
                <Undo className="size-4 md:size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant={'ghost'}
                size={'icon'}
                onClick={onClear}
                //disabled={!canClear}
              >
                <Trash className="size-4 md:size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Clear Chat</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant={'ghost'}
                size={'icon'}
                onClick={() => {
                  setTheme(theme === 'dark' ? 'light' : 'dark')
                }}
                disabled={false}
              >
                {theme === 'light' ? (
                  <SunIcon className="size-4 md:size-5" />
                ) : (
                  <MoonIcon className="size-4 md:size-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent> Toggle Theme</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {session ? (
        <DropdownMenu>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Avatar className="size-8 ml-2">
                    <AvatarImage
                      src={
                        session.user.user_metadata?.avatar_url ||
                        'https://avatar.vercel.sh/' + session.user.email
                      }
                      alt={session.user.email}
                    />
                  </Avatar>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>My Account</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DropdownMenu>
      ) : (
        <Button variant={'default'} onClick={showLogin} className="ml-2">
          Sign in
          <ArrowRight className="ml-2 size-4" />
        </Button>
      )}
    </nav>
  )
}
