import type { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type StatCardProps = {
  title: string
  value: string
  change?: string
  icon: LucideIcon
  trend?: 'up' | 'down' | 'neutral'
}

export function StatCard({ title, value, change, icon: Icon, trend = 'neutral' }: StatCardProps) {
  return (
    <Card className="border-border/70 bg-card/80 shadow-sm transition-shadow hover:shadow-md hover:shadow-brand-purple/5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="flex size-9 items-center justify-center rounded-lg brand-gradient-bg text-white shadow-sm">
          <Icon className="size-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="font-display text-2xl font-semibold tracking-tight">{value}</div>
        {change ? (
          <p
            className={cn(
              'mt-1 text-xs',
              trend === 'up' && 'text-emerald-600 dark:text-emerald-400',
              trend === 'down' && 'text-destructive',
              trend === 'neutral' && 'text-muted-foreground',
            )}
          >
            {change}
          </p>
        ) : null}
      </CardContent>
    </Card>
  )
}
