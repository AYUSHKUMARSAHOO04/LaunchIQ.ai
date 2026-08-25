import { Link } from 'react-router-dom'
import { BrandLogoImage, type BrandLogoVariant } from '@/components/common/BrandLogoImage'
import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  iconOnly?: boolean
  variant?: BrandLogoVariant
}

const linkPadding: Record<BrandLogoVariant, string> = {
  navbar: 'py-1',
  showcase: 'px-2 py-1',
  icon: 'py-0',
}

export function Logo({
  className,
  size = 'md',
  iconOnly = false,
  variant,
}: LogoProps) {
  const resolvedVariant: BrandLogoVariant =
    variant ?? (iconOnly ? 'icon' : size === 'lg' ? 'showcase' : 'navbar')

  return (
    <Link
      to="/"
      className={cn(
        'inline-flex max-w-full items-center justify-center overflow-visible bg-transparent',
        linkPadding[resolvedVariant],
        className,
      )}
      aria-label="LaunchIQ AI home"
    >
      <BrandLogoImage variant={resolvedVariant} iconOnly={iconOnly} />
    </Link>
  )
}
