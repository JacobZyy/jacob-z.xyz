// uno.config.ts
import {
  defineConfig,
  presetIcons,
  presetMini,
  presetTypography,
  presetUno,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetMini(),
    presetTypography(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'height': '1.2em',
        'width': '1.2em',
        'vertical-align': 'text-bottom',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
