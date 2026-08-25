import {
  BarChart3,
  FlaskConical,
  LayoutDashboard,
  Settings,
} from 'lucide-react'

import type { LucideIcon } from 'lucide-react'

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
  badge?: string
}

export const dashboardNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/app/dashboard',
    icon: LayoutDashboard,
  },

  {
    title: 'Simulations',
    href: '/app/simulations',
    icon: FlaskConical,
    badge: 'New',
  },

  // MODIFIED
  {
    title: 'Insights',
    href: '/app/choose-insights',
    icon: BarChart3,
  },

  {
    title: 'Settings',
    href: '/app/settings',
    icon: Settings,
  },
]
