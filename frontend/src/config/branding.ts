export const brandColors = {
  navy: '#0D1321',
  blue: '#2563EB',
  purple: '#7C3AED',
  pink: '#EC4899',
  sky: '#38BDF8',
  slate: '#64748B',
} as const

/** Finalized brand assets — do not crop or regenerate */
export const brandAssets = {
  /** Day / light — white background, horizontal full wordmark */
  logoLight: '/brand/logo-light.png',
  /** Day / light — white background, square icon */
  logoLightIcon: '/brand/logo-light-icon.png',
  /** Night / dark — dark background, horizontal full wordmark */
  logoDark: '/brand/logo-dark.png',
  /** Night / dark — dark background, square icon */
  logoDarkIcon: '/brand/logo-dark-icon.png',
} as const

/** Width / height for layout sizing (prevents clipping) */
export const logoDimensions = {
  light: { width: 788, height: 178 },
  lightIcon: { width: 1024, height: 1000 },
  dark: { width: 1024, height: 335 },
  darkIcon: { width: 1024, height: 944 },
} as const

export function getLogoAsset(theme: 'light' | 'dark', iconOnly: boolean) {
  if (iconOnly) {
    return theme === 'dark' ? brandAssets.logoDarkIcon : brandAssets.logoLightIcon
  }
  return theme === 'dark' ? brandAssets.logoDark : brandAssets.logoLight
}

export function getLogoAspectRatio(theme: 'light' | 'dark', iconOnly: boolean) {
  const d = iconOnly
    ? theme === 'dark'
      ? logoDimensions.darkIcon
      : logoDimensions.lightIcon
    : theme === 'dark'
      ? logoDimensions.dark
      : logoDimensions.light
  return d.width / d.height
}
