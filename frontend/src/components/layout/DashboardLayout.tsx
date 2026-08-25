import {
  Link,
  Outlet,
  useNavigate,
} from 'react-router-dom'

import { useState } from 'react'

import { useAuth }
  from '@/context/AuthContext'

import { supabase }
  from '@/lib/supabase'

import {
  DashboardSidebar,
} from '@/components/layout/DashboardSidebar'

import {
  ThemeToggle,
} from '@/components/common/ThemeToggle'

import {
  GradientButton,
} from '@/components/common/GradientButton'

import {
  Button,
} from '@/components/ui/button'

import {
  Separator,
} from '@/components/ui/separator'

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

import {
  Bell,
  Plus,
  Settings,
  LogOut,
  UserCircle2,
} from 'lucide-react'

// AI Widget
import AIAdvisorWidget
  from '@/components/AIAdvisorWidget'

export function DashboardLayout() {

  const navigate =
    useNavigate()

  const { user } =
    useAuth()

  const [showMenu,
    setShowMenu,
  ] = useState(false)

  const userEmail =
    user?.email ??
    'Guest User'

  const avatarLetter =
    userEmail
      .charAt(0)
      .toUpperCase()

  async function
    handleLogout() {

    await supabase.auth
      .signOut()

    navigate('/')
  }

  return (
    <SidebarProvider>

      <DashboardSidebar />

      <SidebarInset>

        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl">

          <SidebarTrigger className="-ml-1" />

          <Separator
            orientation="vertical"
            className="mr-2 h-4"
          />

          <div className="flex flex-1 items-center justify-between gap-4">

            <p className="hidden text-sm text-muted-foreground sm:block">
              Simulate consumer reactions before you launch
            </p>

            <div className="flex items-center gap-3">

              <ThemeToggle />

              {/* Notifications */}
              <Button
                variant="outline"
                size="icon"
                aria-label="Notifications"
              >
                <Bell className="size-4" />
              </Button>

              {/* New Simulation */}
              <GradientButton
                size="sm"
                className="hidden sm:inline-flex"
                asChild
              >
                <Link to="/app/new-simulation">
                  <Plus className="size-4" />
                  New simulation
                </Link>
              </GradientButton>

              {/* User Avatar */}
              <div className="relative">

                <button
                  onClick={() =>
                    setShowMenu(
                      !showMenu
                    )
                  }
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-500/20 bg-gradient-to-br from-cyan-500 to-violet-600 text-sm font-bold text-white shadow-lg transition hover:scale-105"
                >
                  {avatarLetter}
                </button>

                {/* Dropdown */}
                {showMenu && (

                  <div className="absolute right-0 top-14 z-50 w-72 overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-[0_20px_80px_rgba(0,0,0,0.55)]">

                    {/* Profile */}
                    <div className="border-b border-white/10 p-5">

                      <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 text-lg font-bold text-white">
                          {avatarLetter}
                        </div>

                        <div>

                          <h3 className="font-semibold text-white">
                            LaunchIQ.ai User
                          </h3>

                          <p className="text-sm text-slate-400">
                            {userEmail}
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* Menu */}
                    <div className="p-3">

                    <Link
  to="/app/settings"
  onClick={() =>
    setShowMenu(false)
  }
  className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-slate-300 transition hover:bg-slate-900"
>

  <UserCircle2 className="size-5" />
  My Profile

</Link>

<Link
  to="/app/settings"
  onClick={() =>
    setShowMenu(false)
  }
  className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-slate-300 transition hover:bg-slate-900"
>

  <Settings className="size-5" />
  Account Settings

</Link>

                      <button
                        onClick={
                          handleLogout
                        }
                        className="mt-2 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-red-400 transition hover:bg-red-500/10"
                      >

                        <LogOut className="size-5" />
                        Logout

                      </button>

                    </div>

                  </div>

                )}

              </div>

            </div>

          </div>

        </header>

        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
          <Outlet />
        </div>

        <AIAdvisorWidget />

      </SidebarInset>

    </SidebarProvider>
  )
}
