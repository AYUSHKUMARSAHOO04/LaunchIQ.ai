import type { ComponentProps } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type GradientButtonProps = ComponentProps<typeof Button>

export function GradientButton({ className, children, ...props }: GradientButtonProps) {
  return (
    <Button
      className={cn(
        'border-0 bg-transparent text-white shadow-lg shadow-brand-purple/25 hover:opacity-95',
        'brand-gradient-bg',
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  )
}
