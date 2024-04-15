import { IBM_Plex_Mono, Pacifico, Space_Mono } from 'next/font/google'

export const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
})
export const spaceMono = Space_Mono({
  weight: ['400', '700'],
  variable: '--font-space-mono',
  subsets: ['latin'],
})

export const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
})
