import { NavLink } from 'react-router-dom'

import { useAuth }
  from '@/context/AuthContext'

import { Logo }
  from '@/components/common/Logo'

import { Badge }
  from '@/components/ui/badge'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

import {
  dashboardNavItems,
} from '@/config/navigation'

import { cn }
  from '@/lib/utils'

export function
DashboardSidebar() {

  const { user } =
    useAuth()

  const userEmail =
    user?.email ??
    'Guest User'

  const avatarLetter =
    userEmail
      .charAt(0)
      .toUpperCase()

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
    >

      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border px-2 py-4">

        <Logo
          variant="navbar"
          size="sm"
          className="group-data-[collapsible=icon]:hidden shrink-0"
        />

        <Logo
          variant="icon"
          size="sm"
          iconOnly
          className="hidden shrink-0 group-data-[collapsible=icon]:flex"
        />

      </SidebarHeader>

      {/* User Card */}
      <div className="px-3 pt-4 group-data-[collapsible=icon]:hidden">

        <div className="overflow-hidden rounded-[28px] border border-cyan-500/15 bg-gradient-to-br from-slate-900 to-slate-950 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">

          <div className="flex items-center gap-3">

            {/* Avatar */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 text-lg font-bold text-white shadow-lg">

              {avatarLetter}

            </div>

            {/* User Info */}
            <div className="min-w-0 flex-1">

              <h3 className="truncate font-semibold text-white">

                User

              </h3>

              <p className="truncate text-xs text-slate-400">

                {userEmail}

              </p>

              <div className="mt-2 inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-medium text-emerald-400">

                ● Active Workspace

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Navigation */}
      <SidebarContent>

        <SidebarGroup>

          <SidebarGroupLabel>
            Workspace
          </SidebarGroupLabel>

          <SidebarGroupContent>

            <SidebarMenu>

              {dashboardNavItems.map(
                (item) => (

                  <SidebarMenuItem
                    key={item.title}
                  >

                    <SidebarMenuButton
                      asChild
                      tooltip={
                        item.title
                      }
                    >

                      <NavLink
                        to={item.href}
                        className={({
                          isActive,
                        }) =>
                          cn(
                            'transition-all duration-200',

                            isActive &&
                              'bg-sidebar-accent font-medium text-sidebar-accent-foreground shadow-sm'
                          )
                        }
                      >

                        <item.icon />

                        <span>
                          {item.title}
                        </span>

                        {item.badge ? (

                          <Badge
                            variant="secondary"
                            className="ml-auto border-0 bg-brand-purple/15 text-[10px] text-brand-purple dark:text-brand-sky"
                          >

                            {item.badge}

                          </Badge>

                        ) : null}

                      </NavLink>

                    </SidebarMenuButton>

                  </SidebarMenuItem>
                )
              )}

            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-sidebar-border p-4 text-xs text-muted-foreground">

        <div className="group-data-[collapsible=icon]:hidden">

          <p className="font-medium text-white">
            LaunchIQ.ai
          </p>

          <p className="mt-1 text-xs text-slate-500">
            AI Product Intelligence
          </p>

        </div>

      </SidebarFooter>

      <SidebarRail />

    </Sidebar>
  )
}
