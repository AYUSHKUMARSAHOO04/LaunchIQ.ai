import { getLogoAsset } from '@/config/branding'
import { useTheme } from '@/hooks/use-theme'
import { cn } from '@/lib/utils'

export type BrandLogoVariant = 'navbar' | 'showcase' | 'icon'

type BrandLogoImageProps = {
  variant?: BrandLogoVariant
  className?: string
  iconOnly?: boolean
}

const variantClasses: Record<BrandLogoVariant, string> = {
  navbar:
    'h-auto w-auto max-h-[58px] max-w-[280px] object-contain object-left shrink-0',

  showcase:
    'h-auto w-auto max-h-[145px] max-w-[640px] object-contain object-center shrink-0',

  icon:
    'h-auto w-auto max-h-[50px] max-w-[50px] object-contain shrink-0',
}

export function BrandLogoImage({
  variant = 'navbar',
  className,
  iconOnly = false,
}: BrandLogoImageProps) {
  const { theme } = useTheme()

  const src = getLogoAsset(theme, iconOnly)

  const alt = iconOnly
    ? 'LaunchIQ'
    : 'LaunchIQ AI — AI-powered product launch intelligence'

  return (
    <img
      key={`${theme}-${iconOnly ? 'icon' : 'full'}-${variant}`}
      src={src}
      alt={alt}
      draggable={false}
      decoding="async"
      className={cn(
        'block shrink-0 bg-transparent object-contain object-center overflow-visible',
        variantClasses[variant],
        className,
      )}
    />
  )
}
