import { IBM_Plex_Mono, JetBrains_Mono, Pacifico } from 'next/font/google'

export const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
})

export const pacifico = Pacifico({
  subsets: ['latin'],
  variable: '--font-pacifico',
  weight: '400',
})

export const jbMono = JetBrains_Mono({
  variable: '--font-jb-mono',
  subsets: ['latin', 'latin-ext'],
  preload: true,
  adjustFontFallback: false,
})
