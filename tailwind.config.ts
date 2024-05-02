import type { Config } from 'tailwindcss'

import { addDynamicIconSelectors } from '@iconify/tailwind'
import daisyui from 'daisyui'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-ibm-plex-sans)',
        mono: 'var(--font-space-mono)',
        pacifico: 'var(--font-pacifico)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            transform: 'translateY(1rem)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',

          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out 1 both',
      },
    },
  },
  plugins: [
    daisyui,
    addDynamicIconSelectors(),
  ],
  daisyui: {
    themes: ['retro', 'coffee'],
  },
}
export default config satisfies Config
